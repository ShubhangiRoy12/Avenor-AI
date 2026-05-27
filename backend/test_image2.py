import httpx
import uuid

# Test with fal.ai free endpoint
response = httpx.get(
    "https://picsum.photos/768/512",
    timeout=30,
    follow_redirects=True
)
print("Status:", response.status_code)
print("Content-Type:", response.headers.get("content-type"))

if response.status_code == 200:
    with open("test_output2.png", "wb") as f:
        f.write(response.content)
    print("SUCCESS - image saved!")