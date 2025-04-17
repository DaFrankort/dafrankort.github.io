from pathlib import Path
from utils.github import GitHub
import json
import os
import logging

class Repo:
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

        self.description = json.get('description', '')
        self.excerpt = json.get('excerpt', self.description)

        self.url = json.get('html_url', '')
        self.private = json.get('private', True)
        self.hidden = json.get('hidden', True)

    @classmethod
    def load(cls, filename: str):
        if not filename.endswith('.json'):
            filename += '.json'

        path = os.path.join(os.getcwd(), "public", "projects", filename)

        try:
            with open(path, 'r') as file:
                data = json.load(file)
                return cls(data)
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

    def _get_file_path(self) -> Path:
        filename = f"{self.name}.json"
        return Path(os.getcwd()) / "public" / "projects" / filename

    def save(self):
        path = self._get_file_path()
        path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(path, 'w') as file:
            logging.info(f"Saving {path}")
            print(self.to_dict())
            json.dump(self.to_dict(), file, indent=4)

    def exists(self) -> bool:
        return self._get_file_path().exists()
