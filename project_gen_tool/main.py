import tkinter as tk
from tkinter import messagebox
import json
import os
import logging

from interface.project_editor import ProjectEditor
from interface.project_list import ProjectList
from utils.repo import Repo

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Select a project to edit
def on_project_select(event, p_list: ProjectList, p_edit: ProjectEditor):
    try:
        index = p_list.listbox.curselection()[0]
        selected_project = p_list.projects[index]
        logging.info(f"Selected {selected_project.name}")

        p_edit.open_project(selected_project)
    except:
        pass  # No project selected

# Set up the main window
def main():
    accent_clr = "#aca8cc"
    gray_clr = "#f7f7f7"

    root = tk.Tk()
    root.title("Portfolio Project Gen Tool")
    root.geometry("720x480")
    root.configure(bg=accent_clr)
    
    p_list = ProjectList(root, accent_clr)
    p_list.update_list()

    p_edit = ProjectEditor(root, gray_clr)
    
    p_list.listbox.bind("<<ListboxSelect>>", lambda event: on_project_select(event, p_list, p_edit))
    p_edit.save_btn.bind("<ButtonRelease-1>", lambda e: p_list.update_list())

    root.mainloop()

if __name__ == "__main__":
    main()