import httpx
import os
from dotenv import load_dotenv
load_dotenv()

token = os.getenv("HF_API_TOKEN")
print("Token:", token[:10] + "..." if token else "NOT FOUND")

# New correct HuggingFace API URL
response = httpx.post(
    "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-2-1",
    headers={
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    },
    json={"inputs": "a futuristic robot in a lab"},
    timeout=120
)

print("Status:", response.status_code)
print("Content-Type:", response.headers.get("content-type"))
print("Size:", len(response.content), "bytes")

if response.status_code == 200 and "image" in response.headers.get("content-type", ""):
    with open("test_output.png", "wb") as f:
        f.write(response.content)
    print("SUCCESS - open test_output.png")
else:
    print("Response:", response.text[:300])