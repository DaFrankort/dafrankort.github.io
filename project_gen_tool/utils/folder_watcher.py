from pathlib import Path
from typing import Callable
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import threading

class _FolderEventHandler(FileSystemEventHandler):
    def __init__(self, update_callback: Callable[[], None], debounce_delay: float = 1.0):
        self.update_callback = update_callback
        self.debounce_delay = debounce_delay
        self._debounce_timer = None
        self._lock = threading.Lock()

    def _debounced_update(self):
        with self._lock:
            if self._debounce_timer:
                self._debounce_timer.cancel()

            self._debounce_timer = threading.Timer(self.debounce_delay, self.update_callback)
            self._debounce_timer.start()

    def _should_ignore(self, event):
        return event.src_path.endswith("index.json")

    def on_modified(self, event):
        if not self._should_ignore(event):
            self._debounced_update()

    def on_created(self, event):
        if not self._should_ignore(event):
            self._debounced_update()

    def on_deleted(self, event):
        if not self._should_ignore(event):
            self._debounced_update()

class FolderWatcher:
    def __init__(self, watch_path: Path, on_update: Callable):
        event_handler = _FolderEventHandler(on_update)
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