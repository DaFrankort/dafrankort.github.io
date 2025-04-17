from pathlib import Path

class Paths:
    @staticmethod
    def listbox_commands():
        """Define the commands tied to a listbox here."""
        return [
            Paths.projects_repos,
            Paths.projects_hidden
        ]
    
    @staticmethod
    def _format_filename(filename: str) -> str:
        if not filename.endswith('.json'):
            filename += '.json'
        return filename

    @staticmethod
    def env() -> Path:
        return Path.cwd() / '.env'

    @staticmethod
    def projects() -> Path:
        path = Path.cwd() / 'public' / 'content'
        path.mkdir(parents=True, exist_ok=True)
        return path

    @staticmethod
    def projects_hidden(filename: str | None = None) -> Path:
        base = Paths.projects() / 'hidden'
        base.mkdir(parents=True, exist_ok=True)
        if filename:
            filename = Paths._format_filename(filename)
            return base / filename
        return base

    @staticmethod
    def projects_repos(filename: str | None = None) -> Path:
        base = Paths.projects() / 'repos'
        base.mkdir(parents=True, exist_ok=True)
        if filename:
            filename = Paths._format_filename(filename)
            return base / filename
        return base