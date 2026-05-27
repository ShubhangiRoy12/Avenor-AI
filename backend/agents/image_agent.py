import os
import httpx
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()

HF_TOKEN = os.getenv("HF_API_TOKEN", "")
OUTPUT_DIR = Path("outputs/images")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

class ImageAgent:
    """Generates images using Hugging Face Stable Diffusion API."""

    MODEL_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1"

    def run(self, query: str) -> dict:
        if not HF_TOKEN:
            return {
                "message": (
                    "Image generation requires a Hugging Face API token. "
                    "Add HF_API_TOKEN to your .env file. "
                    "The ImageAgent pipeline is active and ready."
                ),
                "image_url": None,
            }

        try:
            response = httpx.post(
                self.MODEL_URL,
                headers={"Authorization": f"Bearer {HF_TOKEN}"},
                json={"inputs": query},
                timeout=60,
            )
            if response.status_code == 200:
                filename = f"output_{len(list(OUTPUT_DIR.iterdir()))}.png"
                filepath = OUTPUT_DIR / filename
                filepath.write_bytes(response.content)
                return {
                    "message": f"Image generated successfully.",
                    "image_url": f"/outputs/images/{filename}",
                }
            else:
                return {
                    "message": f"Image generation failed: {response.text}",
                    "image_url": None,
                }
        except Exception as e:
            return {"message": f"ImageAgent error: {str(e)}", "image_url": None}