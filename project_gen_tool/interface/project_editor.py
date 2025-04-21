import logging
import tkinter as tk
from tkinter import messagebox
from tkinter import simpledialog
from interface.widgets.button import _Button
from interface.widgets.labeled_textbox import LabeledTextBox
from utils.openai import ChatGPT
from utils.content import Content

class ProjectEditor:
    project: Content
    data: Content

    frame: tk.Frame
    private: tk.BooleanVar
    name: tk.Entry
    excerpt: LabeledTextBox
    description: LabeledTextBox
    save_btn: _Button

    def __init__(self, root: tk.Tk, bg_color: str):
        self.data = Content({'name': 'init', 'display_name': 'NO PROJECT SELECTED'})
        self.project = None

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

        self.excerpt = LabeledTextBox(self.frame, "Excerpt")
        self.excerpt.add_buttons([
            _Button(None, "AI-Generate from Description", command=lambda: self._generate_excerpt_from_description()),
            _Button(None, "Prompt AI", busy_text="Prompting...", command=lambda: self._prompt_through_ai(self.excerpt))
        ])

        self.description = LabeledTextBox(self.frame, "Description")
        self.description.add_buttons([
            _Button(None, "AI-Generate from README.md", command=lambda: self._generate_description_from_readme()),
            _Button(None, "Prompt AI", busy_text="Prompting...", command=lambda: self._prompt_through_ai(self.description))
        ])

        # SAVE BUTTON
        self.save_btn = _Button(self.frame, "Save Changes", busy_text="Saving...", command=lambda: self._save_changes())
        self.save_btn.btn.pack(anchor="w", pady=(10, 5), fill=tk.X)

    def _prompt_through_ai(self, textbox: LabeledTextBox):
        prompt = simpledialog.askstring('Specify prompt for AI', 'Prompt')

        if not prompt or prompt.strip() == '':
            messagebox.showerror('Invalid prompt', 'Prompt cannot be empty!')
            return

        result = ChatGPT.prompt_ai(prompt, textbox.get_text())
    
        if result:
            textbox.set_text(result)

    def _generate_excerpt_from_description(self):
        if self.excerpt.get_text() != '':
            confirm = messagebox.askyesno("Confirm", "This will overwrite the current excerpt, are you sure?")
            if not confirm:
                return
        
        if self.description.get_text() == '':
            confirm = messagebox.showinfo("No description provided", "Sorry! We can't generate an excerpt without a description...")
            return

        ai_excerpt = ChatGPT.create_excerpt_from_description(self.description.get_text())
        if not ai_excerpt:
            return

        self.excerpt.set_text(ai_excerpt)


    def _generate_description_from_readme(self):
        if self.description.get_text() != '':
            confirm = messagebox.askyesno("Confirm", "This will overwrite the current description, are you sure?")
            if not confirm:
                return

        self.data.generate_description()
        self.project.description = self.data.description
        self.description.set_text(self.data.description)

    def _save_changes(self):
        self.data.display_name = self.name.get()
        self.data.url = self.url.get()
        self.data.excerpt = self.excerpt.get_text()
        self.data.description = self.description.get_text()
        self.data.private = self.private.get()

        self.project = self.data
        self.project.save()

    def open_project(self, project: Content):
        self.project = project
        self.data = Content(project.to_dict(), self.project.path)

        self.name.delete(0, tk.END)
        self.name.insert(0, project.display_name)

        self.private.set(project.private)
        self.url.delete(0, tk.END)
        self.url.insert(0, project.url)
        self._toggle_url_state()

        self.excerpt.set_text(project.excerpt)
        self.description.set_text(project.description)

        self.private.set(project.private)
        self._toggle_url_state()

        logging.info(f"Opened {self.project.name}")
        
    def _toggle_url_state(self):
        if self.private.get():
            self.url.config(state='disabled')
        else:
            self.url.config(state='normal')