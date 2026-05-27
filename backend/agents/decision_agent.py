class DecisionAgent:
    """Routes queries to the correct agent pipeline."""

    IMAGE_KEYWORDS = [
        "generate image", "create image", "draw", "visualize", "poster",
        "picture", "illustration", "design", "graphic",
    ]
    ACTION_KEYWORDS = [
        "calculate", "compute", "convert", "what is", "define",
        "explain", "how does", "summarize",
    ]

    def decide(self, query: str, mode: str = "auto") -> str:
        if mode != "auto":
            return mode

        q = query.lower()
        if any(kw in q for kw in self.IMAGE_KEYWORDS):
            return "image"
        if any(kw in q for kw in self.ACTION_KEYWORDS):
            return "action"
        return "analysis"