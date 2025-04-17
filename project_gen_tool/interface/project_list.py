import logging
import os
import tkinter as tk
from utils.repo import Repo
import time
from utils.github import GitHub


class ProjectList:
    projects: list[Repo]
    selected_index: int

    frame: tk.Frame
    listbox: tk.Listbox
    btn_new: tk.Button
    btn_fetch_github: tk.Button

    def __init__(self, root: tk.Tk, bg_color: str):
        self.selected_index = -1

        self.frame = tk.Frame(root, bg=bg_color)
        self.frame.pack(side=tk.LEFT, fill=tk.Y, padx=10, pady=10)

        self.listbox = tk.Listbox(self.frame, width=40, height=20)
        self.listbox.pack(pady=10)

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
        Repo({'name': int(time.time()), 'display_name': 'New Project'}).save()
        self.update_list()

    def _generate_from_github(self):
        self.btn_fetch_github.config(text='Generating..', state=tk.DISABLED)
        self.frame.config(cursor="watch")
        self.frame.update_idletasks()

        try:
            GitHub.get_projects()
            self.update_list()
        finally:
            self.frame.config(cursor="")
            self.btn_fetch_github.config(text="Generate from Github", state=tk.NORMAL)

    def _load_projects(self) -> list[Repo]:
        PROJECTS_FOLDER = os.path.join(os.getcwd(), "public", "projects")
        os.makedirs(PROJECTS_FOLDER, exist_ok=True)

        projects = []
        logging.info(f"Loading project JSON files from {PROJECTS_FOLDER}...")

        for filename in os.listdir(PROJECTS_FOLDER):
            if filename.startswith('index'):
                continue

            if filename.endswith(".json"):
                print(f"- {filename}")
                repo = Repo.load(filename)

                if repo == None:
                    continue

                projects.append(repo)

        logging.info(f"Found {len(projects)} files.")
        self.projects = projects

    def update_list(self):
        self._load_projects()

        self.listbox.delete(0, tk.END)
        for i, project in enumerate(self.projects):
            display_name = project.name
            if project.private:
                display_name = f"🔒 {display_name}"

            self.listbox.insert(tk.END, display_name)
            if project.hidden:
                self.listbox.itemconfig(i, {'fg': 'darkred'})