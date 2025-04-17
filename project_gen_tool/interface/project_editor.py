import tkinter as tk
from utils.repo import Repo

class ProjectEditor:
    project: Repo
    data: Repo

    frame: tk.Frame
    private: tk.BooleanVar
    hidden: tk.BooleanVar
    name: tk.Entry
    excerpt: tk.Text
    description: tk.Text
    save_btn: tk.Button

    def __init__(self, root: tk.Tk, bg_color: str):
        self.data = Repo({'name': 'init', 'display_name': 'NO PROJECT SELECTED'})

        outer_frame = tk.Frame(root, bg=bg_color)
        outer_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=0, pady=0)

        self.frame = tk.Frame(outer_frame, bg=bg_color)
        self.frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)

        self.private = tk.BooleanVar(value=False)
        tk.Checkbutton(self.frame, text="Private", variable=self.private).pack(anchor="w")

        self.hidden = tk.BooleanVar(value=False)
        tk.Checkbutton(self.frame, text="Hidden", variable=self.hidden).pack(anchor="w")

        tk.Label(self.frame, text="Name:").pack(anchor="w")
        self.name = tk.Entry(self.frame, width=50)
        self.name.pack(pady=5, anchor="w")

        tk.Label(self.frame, text="URL:").pack(anchor="w")
        self.url = tk.Entry(self.frame, width=50)
        self.url.pack(pady=5, anchor="w")

        tk.Label(self.frame, text="Excerpt:").pack(anchor="w")
        self.excerpt = tk.Text(self.frame, width=50, height=4)
        self.excerpt.pack(pady=5, anchor="w")

        tk.Label(self.frame, text="Description:").pack(anchor="w")
        self.description = tk.Text(self.frame, width=50, height=10)
        self.description.pack(pady=5, anchor="w")

        self.save_btn = tk.Button(self.frame, text="Save Changes")
        self.save_btn.pack(pady=(0, 5), fill=tk.X)

    def save_changes(self):
        self.data.display_name = self.name.get()
        self.data.url = self.url.get()
        self.data.excerpt = self.excerpt.get("1.0", tk.END).strip()
        self.data.description = self.description.get("1.0", tk.END).strip()
        self.data.private = self.private.get()
        self.data.hidden = self.hidden.get()

        self.project = self.data
        self.project.save()

    def open_project(self, project: Repo):
        self.project = project
        self.data = Repo(project.to_dict())

        self.name.delete(0, tk.END)
        self.name.insert(0, project.display_name)

        self.url.delete(0, tk.END)
        self.url.insert(0, project.url)

        self.excerpt.delete("1.0", tk.END)
        self.excerpt.insert("1.0", project.excerpt)

        self.description.delete("1.0", tk.END)
        self.description.insert("1.0", project.description)

        self.private.set(project.private)
        self.hidden.set(project.hidden)