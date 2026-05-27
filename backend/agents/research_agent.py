from rag.retrieve import retrieve_context

class ResearchAgent:
    """Retrieves relevant context from the RAG knowledge base."""

    def run(self, query: str) -> str:
        try:
            context = retrieve_context(query)
            return context if context else "No specific context found. Using general knowledge."
        except Exception as e:
            return f"Research fallback active. Error: {str(e)}"