from datetime import datetime

class MemoryAgent:
    """Maintains a short-term in-memory conversation store."""

    def __init__(self):
        self.memory = []

    def store(self, query: str):
        self.memory.append({
            "query": query,
            "timestamp": datetime.now().isoformat(),
        })
        # Keep last 20 queries
        if len(self.memory) > 20:
            self.memory.pop(0)

    def retrieve_all(self):
        return self.memory

    def get_last(self, n: int = 5):
        return self.memory[-n:]