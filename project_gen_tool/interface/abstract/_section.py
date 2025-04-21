import tkinter as tk
from abc import ABC, abstractmethod

class _Section(ABC):
    parent_frame: tk.Frame
    frame: tk.Frame

    def __init__(self, parent_frame: tk.Frame):
        self.parent_frame = parent_frame
        self.frame = tk.Frame(
            parent_frame,
            bg=parent_frame.cget("bg")
        )

    # TODO => Children within box (?)