import tkinter as tk
from tkinter import messagebox
from typing import Callable

class _Button:
    _frame: tk.Frame
    btn: tk.Button
    _text: str
    _busy_text: str
    command: Callable

    def __init__(self, frame: tk.Frame, text: str, command: Callable = None, busy_text: str = "Generating..."):
        self._frame = frame
        self._text = text
        self._busy_text = busy_text
        self.command = command

        self.btn = tk.Button(self._frame, text=self._text, command=self._on_press)

    def _on_press(self):
        if not self.command:
            return # no-op if command isn't set

        try:
            self._mark_busy()
            self.command()
        except Exception as e:
            messagebox.showerror("Error", str(e))
        finally:
            self._mark_normal()

    def _mark_busy(self):
        self._frame.config(cursor="wait")
        self.btn.config(
            relief="sunken",
            text=self._busy_text, 
            state="disabled")
        self._frame.update_idletasks()

    def _mark_normal(self):
        self._frame.config(cursor="")
        self.btn.config(
            relief="raised",
            text=self._text, 
            state="normal")
        self._frame.update_idletasks()