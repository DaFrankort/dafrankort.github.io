import tkinter as tk
from tkinter import messagebox
from utils.content import Content

class ProjectEditor:
    project: Content
    data: Content

    frame: tk.Frame
    private: tk.BooleanVar
    name: tk.Entry
    excerpt: tk.Text
    description: tk.Text
    save_btn: tk.Button

    def __init__(self, root: tk.Tk, bg_color: str):
        self.data = Content({'name': 'init', 'display_name': 'NO PROJECT SELECTED'})

        outer_frame = tk.Frame(root, bg=bg_color)
        outer_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=0, pady=0)

        self.frame = tk.Frame(outer_frame, bg=bg_color)
        self.frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)

        tk.Label(self.frame, text="Name:").pack(anchor="w")
        self.name = tk.Entry(self.frame, width=50)
        self.name.pack(pady=5, anchor="w", fill=tk.X)

        url_frame = tk.Frame(self.frame)
        url_frame.pack(anchor='w', pady=5, fill=tk.X)
        tk.Label(url_frame, text="URL:").pack(side='left')
        self.private = tk.BooleanVar(value=False)
        tk.Checkbutton(url_frame, text="Private", variable=self.private).pack(side="right", padx=10)

        self.url = tk.Entry(self.frame, width=50)
        self.url.pack(pady=5, anchor="w", fill=tk.X)

        tk.Label(self.frame, text="Excerpt:").pack(anchor="w")
        self.excerpt = tk.Text(self.frame, width=50, height=4)
        self.excerpt.pack(pady=5, anchor="w", fill=tk.X)

        description_frame = tk.Frame(self.frame)
        description_frame.pack(anchor='w', pady=5, fill=tk.X)
        tk.Label(description_frame, text="Description:").pack(side='left')
        tk.Button(description_frame, text="[AI] Generate from README.md", command=self._generate_from_readme, bg="lightblue").pack(side="right", padx=10)
        self.description = tk.Text(self.frame, width=50, height=10)
        self.description.pack(pady=5, anchor="w", fill=tk.X)

        self.save_btn = tk.Button(self.frame, text="Save Changes")
        self.save_btn.pack(pady=(0, 5), fill=tk.X)

    def _generate_from_readme(self):
        if self.data.description != '':
            confirm = messagebox.askyesno("Confirm", "This will overwrite the current description, are you sure?")
            if not confirm:
                return

        self.data.generate_description()
        self.description.delete("1.0", tk.END)
        self.description.insert("1.0", self.data.description)

    def save_changes(self):
        self.data.display_name = self.name.get()
        self.data.url = self.url.get()
        self.data.excerpt = self.excerpt.get("1.0", tk.END).strip()
        self.data.description = self.description.get("1.0", tk.END).strip()
        self.data.private = self.private.get()

        self.project = self.data
        self.project.save()

    def open_project(self, project: Content):
        self.project = project
        self.data = Content(project.to_dict(), self.project.path)

        print(self.project.to_dict())
        print(self.data.to_dict())

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