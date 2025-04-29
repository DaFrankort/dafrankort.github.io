import hashlib
import json
import logging
import os
import threading
from utils.content import Content
from utils.folder_watcher import FolderWatcher
from utils.paths import Paths

class IndexGenerator:
    """Generates an index.json file, used to show a quick overview of all available content"""
    
    _instance = None  # singleton storage
    _lock = threading.Lock()

    def __init__(self):
        if IndexGenerator._instance is not None:
            raise Exception("IndexGenerator is a singleton! Use IndexGenerator.get_instance().")
        self.watcher = FolderWatcher(Paths.projects(), on_update=self.generate)
        self.watcher.start()
        IndexGenerator._instance = self

    @staticmethod
    def get_instance():
        if IndexGenerator._instance is None:
            IndexGenerator()
        return IndexGenerator._instance

    @staticmethod
    def generate():
        def run():
            logging.info('Updating index.json')
            
            index_data = {}
            techstacks_dict = {}
            for get_path in Paths.listbox_commands():
                path = get_path()
                basename = os.path.basename(path)

                if basename == "hidden":
                    continue

                folder_data, folder_techstacks = IndexGenerator._gather_folder_data(path)
                
                if folder_data:
                    index_data[basename] = folder_data
                    
                for techstack in folder_techstacks:
                    # Use a hash of the lowercase name to filter out any case sensitive issues.
                    techstack_lower = techstack.lower()
                    techstack_hash = hashlib.md5(techstack_lower.encode('utf-8')).hexdigest()

                    if techstack_hash not in techstacks_dict:
                        techstacks_dict[techstack_hash] = techstack
            index_data["techstacks"] = list(techstacks_dict.values()) # Store only techstack names
            IndexGenerator._save(index_data)

        threading.Thread(target=run, daemon=True).start()

    @staticmethod
    def _gather_folder_data(path):
        """Gathers data for the given folder."""
        data = []
        techstacks = set()

        for filename in os.listdir(path):
            if filename.endswith(".json"):
                file_data = Content.load(filename, lambda fname: path / fname)
                if file_data:  # Skip files that couldn't be loaded
                    data.append({
                        'file': filename,
                        'display_name': file_data.display_name,
                        'excerpt': file_data.excerpt,
                        'techstack': file_data.techstack,
                        'private': file_data.private
                        })
                    
                    techstacks.update(file_data.techstack)
        return data, sorted(techstacks)

    @staticmethod
    def _save(data):
        path = Paths.projects() / 'index.json'
        with open(path, 'w') as file:
            logging.info(f"Saving {path}")
            json.dump(data, file, indent=4)