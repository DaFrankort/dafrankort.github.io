from pathlib import Path
from typing import Callable
from utils.paths import Paths
from utils.github import GitHub
import json
import logging

class Content:
    path: Path
    name: str
    display_name: str
    excerpt: str
    description: str
    
    url: str
    private: bool
    hidden = bool

    def to_dict(self):
        return {
            'name': self.name,
            'display_name': self.display_name,
            'excerpt': self.excerpt,
            'description': self.description,
            'html_url': self.url,
            'private': self.private,
            'hidden': self.hidden
        }

    def __init__(self, json: dict):
        self.name = json.get('name', '')
        self.display_name = json.get('display_name', self.name if self.name != '' else 'Untitled')
        self.path = Paths.projects_hidden(self.name)

        self.description = json.get('description', '')
        self.excerpt = json.get('excerpt', self.description)

        self.url = json.get('html_url', '')
        self.private = json.get('private', True)
        self.hidden = json.get('hidden', True)

    @classmethod
    def load(cls, filename: str, path_command: Callable[[], Path]):
        path = path_command(filename)
        
        try:
            with open(path, 'r') as file:
                data = json.load(file)
                repo = cls(data)
                repo.path = path
                return repo
        except FileNotFoundError:
            logging.error(f"File not found: {filename}")
        except json.JSONDecodeError as err:
            logging.error(f"JSON decode error in {filename}: {err}")

        return None

    def generate_description(self):
        try:
            readme = GitHub.get_project_readme(self.name)
            if readme == None:
                return
            
            # TODO -> Run readme.md through ai
            self.description = readme

        except ConnectionError as err:
            logging.error(err)

    def save(self, path_command: Callable[[], Path] = Paths.projects_hidden):
        path = path_command(self.name)

        with open(path, 'w') as file:
            logging.info(f"Saving {path}")
            print(self.to_dict())
            json.dump(self.to_dict(), file, indent=4)

    def exists(self) -> bool:
        for path_cmd in Paths.listbox_commands():
            path = path_cmd(self.name)
            if path.exists():
                return True
            
        return False
