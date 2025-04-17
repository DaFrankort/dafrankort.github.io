import requests
import dotenv

dotenv.load_dotenv()

class GitHub:
    @staticmethod
    def get_headers() -> object:
        token = dotenv.get_key(dotenv_path=None, key_to_get="GH_TOKEN")
        return {
            'Authorization': f'token {token}'
        }
    
    @staticmethod
    def get_username() -> str:
        return dotenv.get_key(dotenv_path=None, key_to_get="GH_USERNAME")
    
    @staticmethod
    def get_projects() -> object:
        username = GitHub.get_username()
        url = f"https://api.github.com/users/{username}/repos"
        headers = GitHub.get_headers()
        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            raise ConnectionError(f"Request \'{url}\' failed with status code {response.status_code}")

        return response.json()
    
    @staticmethod
    def get_project_readme(project_name: str) -> str:
        username = GitHub.get_username()
        headers = GitHub.get_headers()

        # Get all contents of a project
        url = f"https://api.github.com/repos/{username}/{project_name}/contents/"
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            raise ConnectionError(f"Request \'{url}\' failed with status code {response.status_code}")

        # Look for file called readme.md and return
        contents = response.json()
        for content in contents:
            filename = content.get('name', '')

            if 'readme' not in filename.lower():
                continue
            
            # Get readme.md contents
            readme_url = content.get('download_url')
            readme_response = requests.get(readme_url, headers=headers)
            if readme_response.status_code != 200:
                raise ConnectionError(f"Request \'{url}\' failed with status code {response.status_code}")

            return readme_response.text
        
        return None
