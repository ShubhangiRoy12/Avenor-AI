import httpx
import os
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("GROQ_API_KEY")
print("Key found:", key[:10] + "..." if key else "NOT FOUND")

r = httpx.post(
    "https://api.groq.com/openai/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json"
    },
    json={
        "model": "llama-3.3-70b-versatile",
        "messages": [{"role": "user", "content": "Say hello in one sentence"}],
        "max_tokens": 50
    }
)

print("Status:", r.status_code)
print("Response:", r.json())