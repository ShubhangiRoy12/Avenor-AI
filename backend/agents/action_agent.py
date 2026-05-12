class ActionAgent:
    """Handles direct factual or action-based queries using context."""

    def run(self, query: str, context: str = "") -> str:
        response = f"**Avenor AI — Action Agent Response**\n\n"
        response += f"**Query:** {query}\n\n"

        if context and context != "No specific context found. Using general knowledge.":
            response += f"**Retrieved Knowledge:**\n{context}\n\n"

        response += (
            "The Action Agent has processed your request. "
            "For full LLM-powered responses, connect your Groq API key in the `.env` file. "
            "The agent pipeline (Orchestrator → Research → Decision → Action) is running successfully."
        )
        return response