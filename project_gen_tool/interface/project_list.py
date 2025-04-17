import logging
import os
from pathlib import Path
import re
import tkinter as tk
import tkinter.messagebox as messagebox
from tkinter import simpledialog
from typing import Callable
from utils.paths import Paths
from utils.repo import Repo
from utils.github import GitHub

class _Listbox:
    get_path: Callable[[], Path]
    name: str
    listbox: tk.Listbox
    projects: list[Repo]

    def __init__(self, get_path: Callable[[], Path], frame: tk.Frame):
        self.get_path = get_path
        self.name = self.get_path().name
        self.projects = []

        tk.Label(frame, text=self.name.capitalize()).pack()
        self.listbox = tk.Listbox(frame, width=40, height=20)
        self.listbox.pack(pady=10)

        self.update_list()
    
    def update_list(self):
        self._load_projects()

        self.listbox.delete(0, tk.END)
        for i, project in enumerate(self.projects):
            display_name = project.display_name
            if project.private:
                display_name = f"🔒 {display_name}"

            self.listbox.insert(tk.END, display_name)

    def _load_projects(self):
        projects = []

        for filename in os.listdir(self.get_path()):
            if filename.endswith(".json"):
                project = Repo.load(filename, self.get_path)
                if project != None:
                    projects.append(project)

        logging.info(f"Found {len(projects)} files in {self.get_path()}.")
        self.projects = projects
class ProjectList:
    projects: list[Repo]

    frame: tk.Frame
    list_frame: tk.Frame
    listboxes: list[_Listbox]
    btn_new: tk.Button
    btn_fetch_github: tk.Button

    def __init__(self, root: tk.Tk, bg_color: str):
        self.projects = []

        self.frame = tk.Frame(root, bg=bg_color)
        self.frame.pack(side=tk.LEFT, fill=tk.Y, padx=10, pady=10)

        self.list_frame = tk.Frame(self.frame, bg=bg_color)
        self.list_frame.pack(side=tk.LEFT, fill=tk.Y, padx=0, pady=0)
        self.listboxes = []
        self.update_list() # Create listboxes

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

        Repo({'name': safe_name, 'display_name': display_name}).save()
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
        paths = [
            Paths.projects_repos,
            Paths.projects_hidden
        ]

        if not self.listboxes: # First time setup: create _Listbox instances
            self.listboxes = []
            for path in paths:
                listbox = _Listbox(path, self.list_frame)
                self.listboxes.append(listbox)
            return

        for listbox in self.listboxes:
            listbox.update_list()
