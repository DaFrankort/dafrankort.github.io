import logging
import os
import threading
import tkinter as tk
from pathlib import Path
from typing import Callable
from utils.folder_watcher import FolderWatcher
from utils.content import Content

class _Listbox:
    get_path: Callable[[], Path]
    name: str
    listbox: tk.Listbox
    projects: list[Content]

    def __init__(self, get_path: Callable[[], Path], frame: tk.Frame):
        self.get_path = get_path
        self.name = self.get_path().name
        self.projects = []

        tk.Label(frame, text=self.name.capitalize()).pack()
        self.listbox = tk.Listbox(frame, width=40, height=20)
        self.listbox.pack(pady=10)

        self.update_list()
        self._start_watcher()
    
    def _start_watcher(self):
        self.watcher = FolderWatcher(self.get_path(), on_update=self.update_list)
        self.listbox.after(100, self.update_list)
        self.watcher.start()

    def update_list(self):
        self._load_projects()

        self.listbox.delete(0, tk.END)
        for project in self.projects:
            display_name = project.display_name
            if project.private:
                display_name = f"🔒 {display_name}"

            self.listbox.insert(tk.END, display_name)

    def _load_projects(self):
        projects = []

        for filename in os.listdir(self.get_path()):
            if filename.endswith(".json"):
                project = Content.load(filename, self.get_path)
                if project != None:
                    projects.append(project)

        logging.info(f"Found {len(projects)} files in {self.get_path()}.")
        self.projects = projects