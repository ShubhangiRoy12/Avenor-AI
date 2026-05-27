import os
import httpx
from dotenv import load_dotenv
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = "llama3-70b-8192"

SYSTEM_PROMPT = """You are Avenor AI — an enterprise-grade multi-agent intelligence platform.
You are the Analysis Agent. Your job is to synthesize research context with the user's query
and produce clear, structured, insightful responses. Be concise, accurate, and professional.
Do not hallucinate. If context is available, use it. Always respond in a helpful, articulate way."""

class AnalysisAgent:
    """Uses an LLM to analyze and generate a final response."""

    def run(self, query: str, context: str = "") -> str:
        if not GROQ_API_KEY:
            return self._fallback(query, context)

        messages = []
        if context:
            messages.append({"role": "user", "content": f"Context:\n{context}\n\nQuery: {query}"})
        else:
            messages.append({"role": "user", "content": query})

        try:
            import httpx, asyncio
            response = httpx.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": GROQ_MODEL,
                    "messages": [
                        {"role": "system", "content": SYSTEM_PROMPT},
                        *messages,
                    ],
                    "temperature": 0.7,
                    "max_tokens": 1024,
                },
                timeout=30,
            )
            data = response.json()
            return data["choices"][0]["message"]["content"]
        except Exception as e:
            return self._fallback(query, context)

    def _fallback(self, query: str, context: str) -> str:
        base = f"Avenor AI Analysis:\n\nQuery: {query}\n\n"
        if context:
            base += f"Retrieved Context:\n{context}\n\n"
        base += (
            "Note: Live LLM inference is not configured (GROQ_API_KEY missing). "
            "Add your Groq API key to the .env file to enable full AI responses. "
            "The multi-agent pipeline (Research → Analysis → Decision → Memory) is fully operational."
        )
        return base