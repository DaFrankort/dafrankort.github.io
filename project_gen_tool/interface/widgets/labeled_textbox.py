import tkinter as tk
from tkinter import simpledialog
from tkinter import messagebox

from interface.widgets.button import _Button
from utils.openai import ChatGPT

class LabeledTextBox:
    _frame: tk.Frame
    _button_frame: tk.Frame
    textbox: tk.Text

    def __init__(self, parent: tk.Frame, label: str, width: int = 50, height: int = 10):
        self._frame = tk.Frame(parent, bg=parent.cget("bg"))
        self._frame.pack(anchor='w', pady=5, fill=tk.X)

        tk.Label(self._frame, text=label).pack(anchor="w")
        self.textbox = tk.Text(self._frame, width= width, height= height)
        self.textbox.pack(pady=5, anchor="w", fill=tk.X)

        self.add_buttons(_Button(self._frame, "Prompt AI", busy_text="Prompting...", command=lambda: self._prompt_through_ai()))

    def add_buttons(self, buttons: _Button | list[_Button]):
        if isinstance(buttons, _Button):
            buttons = [buttons]

        for button in buttons:
            button.set_frame(self._frame)
            button.btn.pack(side="right", padx=10)

    def set_text(self, text: str):
        self.textbox.delete("1.0", tk.END)
        self.textbox.insert(tk.END, text)

    def get_text(self) -> str:
        return self.textbox.get("1.0", tk.END).strip()
    
    def _prompt_through_ai(self):
        prompt = simpledialog.askstring('Specify prompt for AI', 'Prompt')

        if not prompt or prompt.strip() == '':
            messagebox.showerror('Invalid prompt', 'Prompt cannot be empty!')
            return

        result = ChatGPT.prompt_ai(prompt, self.get_text())
    
        if result:
            self.set_text(result)