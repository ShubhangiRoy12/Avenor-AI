import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

def get_env(key: str, default: str = "") -> str:
    return os.getenv(key, default)

def ensure_dirs():
    dirs = ["data/docs", "data/faiss_index", "outputs/images"]
    for d in dirs:
        Path(d).mkdir(parents=True, exist_ok=True)

ensure_dirs()