from pathlib import Path
from typing import Callable
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import threading

class FolderEventHandler(FileSystemEventHandler):
    def __init__(self, update_callback: Callable[[], None]):
        self.update_callback = update_callback

    def on_modified(self, event):
        self.update_callback()

    def on_created(self, event):
        self.update_callback()

    def on_deleted(self, event):
        self.update_callback()

class FolderWatcher:
    def __init__(self, watch_path: Path, on_update: Callable):
        event_handler = FolderEventHandler(on_update)

        self.obs = Observer()
        self.obs.schedule(event_handler, watch_path, recursive=False)
    
    def start(self):
        self.obs_thread = threading.Thread(target=self._start_observer, daemon=True)
        self.obs_thread.start()

    def _start_observer(self):
        self.obs.start()
        self.obs.join()

    def stop(self):
        self.obs.stop()
        self.obs.join()