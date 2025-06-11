import re
import threading
import tkinter as tk
import tkinter.messagebox as messagebox

from tkinter import simpledialog
from interface.widgets.listbox import _Listbox
from interface.widgets.button import _Button
from utils.paths import Paths
from utils.content import Content
from utils.github import GitHub

class ProjectList:
    projects: list[Content]

    frame: tk.Frame
    list_frame: tk.Frame
    listboxes: list[_Listbox]

    move_target = tk.StringVar
    move_project: tk.OptionMenu

    def __init__(self, root: tk.Tk, bg_color: str):
        self.projects = []

        self.frame = tk.Frame(root, bg=bg_color)
        self.frame.pack(side=tk.LEFT, fill=tk.Y, padx=10, pady=10)

        self.list_frame = tk.Frame(self.frame, bg=bg_color)
        self.list_frame.pack(side=tk.LEFT, fill=tk.Y, padx=10, pady=0)
        self.listboxes = []
        for path in Paths.listbox_commands():
            listbox = _Listbox(path, self.list_frame)
            self.listboxes.append(listbox)

        btn_frame = tk.Frame(self.frame, bg=bg_color)
        btn_frame.pack(side=tk.RIGHT, fill=tk.BOTH, padx=0, pady=0)

        top_buttons = [
            _Button(self.frame, "New", busy_text="Creating...", command=lambda: self._new_project()),
            _Button(self.frame, "Generate from GitHub", command=self._generate_from_github)
        ]
        for btn in top_buttons:
            btn.btn.pack(pady=(0, 5), fill=tk.X)

        # Move OptionMenu
        options = []
        for listbox in self.listboxes:
            options.append(listbox.name.capitalize())
        self.move_target = tk.StringVar(self.frame)
        self.move_target.set("Move Project")
        self.move_project = tk.OptionMenu(self.frame, self.move_target, *options)
        self.move_project.pack(pady=10, fill=tk.X)

    def move_project_to_target_folder(self) -> Content:
        for lb in self.listboxes:
            selection = lb.listbox.curselection()
            if selection:
                i = selection[0]
                project = lb.projects[i]

                for target_lb in self.listboxes:
                    if target_lb.name.lower() == self.move_target.get().lower():
                        project.move_to(target_lb.get_path)
                        return project

    def _new_project(self):
        user_input = simpledialog.askstring("Please provide a name for your project:", "My Project")

        if not user_input:
            return

        safe_name = user_input.strip().replace(" ", "_").lower()
        safe_name = re.sub(r'[^a-z0-9_-]', '', safe_name)

        if safe_name == '':
            if user_input.strip() == '':
                messagebox.showerror('Invalid Name', 'Sorry! That project name is invalid.\nName cannot be empty!')
            else:
                messagebox.showerror('Invalid Name', 'Sorry! That project name is invalid.\nPlease avoid using special characters.')
            return

        display_name = user_input.strip()

        Content({'name': safe_name, 'display_name': display_name}).save()

    def _generate_from_github(self):
        new_projects = GitHub.generate_new_projects()
        if new_projects:
            names = ", ".join(p.name for p in new_projects)
            messagebox.showinfo("Projects generated!", f"Generated {len(new_projects)} project(s):\n{names}")
