import tkinter as tk
from tkinter import messagebox
from tkinter import simpledialog
from interface.widgets.button import _Button
from utils.openai import ChatGPT
from utils.content import Content

class ProjectEditor:
    project: Content
    data: Content

    frame: tk.Frame
    private: tk.BooleanVar
    name: tk.Entry
    excerpt: tk.Text
    description: tk.Text
    save_btn: _Button

    def __init__(self, root: tk.Tk, bg_color: str):
        self.data = Content({'name': 'init', 'display_name': 'NO PROJECT SELECTED'})

        outer_frame = tk.Frame(root, bg=bg_color)
        outer_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=0, pady=0)

        self.frame = tk.Frame(outer_frame, bg=bg_color)
        self.frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)

        # NAME
        tk.Label(self.frame, text="Name:").pack(anchor="w")
        self.name = tk.Entry(self.frame, width=50)
        self.name.pack(pady=5, anchor="w", fill=tk.X)

        # URL
        url_frame = tk.Frame(self.frame)
        url_frame.pack(anchor='w', pady=5, fill=tk.X)
        tk.Label(url_frame, text="URL:").pack(side='left')
        self.private = tk.BooleanVar(value=False)
        tk.Checkbutton(url_frame, text="Private", variable=self.private, command=self._toggle_url_state).pack(side="right", padx=10)

        self.url = tk.Entry(self.frame, width=50)
        self.url.pack(pady=5, anchor="w", fill=tk.X)

        # EXCERPT
        excerpt_frame = tk.Frame(self.frame)
        excerpt_frame.pack(anchor='w', pady=5, fill=tk.X)

        tk.Label(excerpt_frame, text="Excerpt:").pack(anchor='w')
        self.excerpt = tk.Text(excerpt_frame, width=50, height=4)
        self.excerpt.pack(pady=5, anchor="w", fill=tk.X)
        
        btn_excerpt_gen = _Button(excerpt_frame, "AI-Generate from Description", command=lambda: self._generate_excerpt_from_description())
        btn_excerpt_gen.btn.pack(side="right", padx=10)
        btn_excerpt_prompt = _Button(excerpt_frame, "Prompt AI", busy_text="Prompting...", command=lambda: self._prompt_through_ai(self.excerpt))
        btn_excerpt_prompt.btn.pack(side="right", padx=10)

        # DESCRIPTION
        description_frame = tk.Frame(self.frame)
        description_frame.pack(anchor='w', pady=5, fill=tk.X)

        tk.Label(description_frame, text="Description:").pack(anchor='w')
        self.description = tk.Text(description_frame, width=50, height=10)
        self.description.pack(pady=5, anchor="w", fill=tk.X)

        btn_desc_readme = _Button(description_frame, "AI-Generate from README.md", command=lambda: self._generate_description_from_readme())
        btn_desc_readme.btn.pack(side="right", padx=10)
        btn_desc_prompt = _Button(description_frame, "Prompt AI", busy_text="Prompting...", command=lambda: self._prompt_through_ai(self.description))
        btn_desc_prompt.btn.pack(side="right", padx=10)

        # SAVE BUTTON
        self.save_btn = _Button(self.frame, "Save Changes", busy_text="Saving...", command=lambda: self._save_changes())
        self.save_btn.btn.pack(pady=(0, 5), fill=tk.X)

    def _prompt_through_ai(self, text_widget: tk.Text):
        prompt = simpledialog.askstring('Specify prompt for AI', 'Prompt')

        if not prompt or prompt.strip() == '':
            messagebox.showerror('Invalid prompt', 'Prompt cannot be empty!')
            return

        text = text_widget.get("1.0", tk.END).strip()
        result = ChatGPT.prompt_ai(prompt, text)
    
        if result:
            text_widget.delete("1.0", tk.END)
            text_widget.insert(tk.END, result)

    def _generate_excerpt_from_description(self):
        if self.data.excerpt != '':
            confirm = messagebox.askyesno("Confirm", "This will overwrite the current excerpt, are you sure?")
            if not confirm:
                return
        
        if self.data.description == '':
            confirm = messagebox.showinfo("No description provided", "Sorry! We can't generate an excerpt without a description...")
            return

        ai_excerpt = ChatGPT.create_excerpt_from_description(self.description.get("1.0", tk.END).strip())
        if not ai_excerpt:
            return

        self.data.excerpt = ai_excerpt
        self.excerpt.delete("1.0", tk.END)
        self.excerpt.insert("1.0", ai_excerpt)


    def _generate_description_from_readme(self):
        if self.data.description != '':
            confirm = messagebox.askyesno("Confirm", "This will overwrite the current description, are you sure?")
            if not confirm:
                return

        self.data.generate_description()
        self.project.description = self.data.description
        self.description.delete("1.0", tk.END)
        self.description.insert("1.0", self.data.description)

    def _save_changes(self):
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

        self.private.set(project.private)
        self.url.delete(0, tk.END)
        self.url.insert(0, project.url)
        self._toggle_url_state()

        self.excerpt.delete("1.0", tk.END)
        self.excerpt.insert("1.0", project.excerpt)

        self.description.delete("1.0", tk.END)
        self.description.insert("1.0", project.description)

        self.private.set(project.private)
        self._toggle_url_state()

    def _toggle_url_state(self):
        if self.private.get():
            self.url.config(state='disabled')
        else:
            self.url.config(state='normal')