from openai import OpenAI
from dotenv import get_key, load_dotenv
import openai
from utils.paths import Paths

load_dotenv(Paths.env())

class ChatGPT:
    _client = OpenAI(
        api_key=get_key(Paths.env(), "OPENAI_API_KEY")
    )
    _model = "gpt-3.5-turbo"

    @staticmethod
    def _get_response(instructions: str, input_text: str):
        return ChatGPT._client.responses.create(
            model=ChatGPT._model,
            instructions=instructions,
            input=input_text
        )

    @staticmethod
    def create_description_from_readme(readme_text: str) -> str:
        return ChatGPT._get_response(
            "You will be fed README.MD content from GitHub repositories, transform any markdown notation to HTML, using <strong> instead of **, <i> instead of *, and <a> instead of [link](url)",
            readme_text
        ).output_text

    @staticmethod
    def create_excerpt_from_description(description: str) -> str:
        return ChatGPT._get_response(
            "You will be given a description of a project, make a concise text to use in an excerpt. Avoid any sort of HTML, formatting or links. Keep it short, roughly 2 lines.",
            description
        ).output_text
    
    @staticmethod
    def prompt_ai(prompt: str, text_to_alter: str) -> str:
        return ChatGPT._get_response(
            f"Alter the user's text to the following specifications: {prompt}",
            text_to_alter
        ).output_text