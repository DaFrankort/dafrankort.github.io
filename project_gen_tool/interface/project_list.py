import re
import tkinter as tk
import tkinter.messagebox as messagebox

from tkinter import simpledialog
from interface.utils.listbox import _Listbox
from utils.paths import Paths
from utils.content import Content
from utils.github import GitHub

class ProjectList:
    projects: list[Content]

    frame: tk.Frame
    list_frame: tk.Frame
    listboxes: list[_Listbox]

    btn_new: tk.Button
    btn_fetch_github: tk.Button
    move_target = tk.StringVar
    move_project: tk.OptionMenu

    def __init__(self, root: tk.Tk, bg_color: str):
        self.projects = []

        self.frame = tk.Frame(root, bg=bg_color)
        self.frame.pack(side=tk.LEFT, fill=tk.Y, padx=10, pady=10)

        self.list_frame = tk.Frame(self.frame, bg=bg_color)
        self.list_frame.pack(side=tk.LEFT, fill=tk.Y, padx=10, pady=0)
        self.listboxes = []
        self.update_list() # Create listboxes

        btn_frame = tk.Frame(self.frame, bg=bg_color)
        btn_frame.pack(side=tk.RIGHT, fill=tk.BOTH, padx=0, pady=0)

        self.btn_new = tk.Button(
            self.frame, 
            text="New",
            command=lambda: self._new_project()
            )
        self.btn_new.pack(pady=(0, 5), fill=tk.X)

        self.btn_fetch_github = tk.Button(
            self.frame,
            text="Generate from Github",
            command=self._generate_from_github
        )
        self.btn_fetch_github.pack(pady=(0, 5), fill=tk.X)

        options = []
        for listbox in self.listboxes:
            options.append(listbox.name.capitalize())

        self.move_target = tk.StringVar(self.frame)
        self.move_target.set("Move Project")
        self.move_project = tk.OptionMenu(self.frame, self.move_target, *options, command=lambda _: self._move_project())
        self.move_project.pack(pady=(0, 5), fill=tk.X)

    def _move_project(self):
        for lb in self.listboxes:
            selection = lb.listbox.curselection()
            if selection:
                i = selection[0]
                project = lb.projects[i]
                
                for target_lb in self.listboxes:
                    if target_lb.name.lower() == self.move_target.get().lower():
                        project.move_to(target_lb.get_path)
                        self.update_list()
                        return

    def _new_project(self):
        user_input = simpledialog.askstring("Please provide a name for your project:", "My Project")

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
        self.update_list()

    def _generate_from_github(self):
        self.btn_fetch_github.config(text='Generating..', state=tk.DISABLED)
        self.frame.config(cursor="watch")
        self.frame.update_idletasks()

        try:
            new_projects = GitHub.generate_new_projects()
            if new_projects:
                names = ", ".join(p.name for p in new_projects)
                messagebox.showinfo("Projects generated!", f"Generated {len(new_projects)} project(s):\n{names}")

            self.update_list()
        finally:
            self.frame.config(cursor="")
            self.btn_fetch_github.config(text="Generate from Github", state=tk.NORMAL)

    def update_list(self):
        if not self.listboxes: # First time setup: create _Listbox instances
            self.listboxes = []
            for path in Paths.listbox_commands():
                listbox = _Listbox(path, self.list_frame)
                self.listboxes.append(listbox)
            return

        for listbox in self.listboxes:
            listbox.update_list()
