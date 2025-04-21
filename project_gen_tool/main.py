import tkinter as tk
import logging
from interface.project_editor import ProjectEditor
from interface.project_list import ProjectList
from interface.widgets.listbox import _Listbox

logging.basicConfig(
    level=logging.ERROR,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def on_project_select(event, lb: _Listbox, p_edit: ProjectEditor):
    try:
        index = lb.listbox.curselection()[0]
        selected_project = lb.projects[index]
        logging.info(f"Selected {selected_project.name}")

        p_edit.open_project(selected_project)
    except:
        pass # No project selected

def main():
    accent_clr = "#aca8cc"
    gray_clr = "#f7f7f7"

    root = tk.Tk()
    root.title("Portfolio Project Gen Tool")
    root.geometry("1280x720")
    root.configure(bg=accent_clr)
    
    p_list = ProjectList(root, accent_clr)
    p_edit = ProjectEditor(root, gray_clr)
    
    for lb in p_list.listboxes:
        lb.listbox.bind("<<ListboxSelect>>", lambda e, lb=lb: on_project_select(e, lb, p_edit))

    root.mainloop()

if __name__ == "__main__":
    main()