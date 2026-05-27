from agents.research_agent import ResearchAgent
from agents.analysis_agent import AnalysisAgent
from agents.decision_agent import DecisionAgent
from agents.memory_agent import MemoryAgent
from agents.action_agent import ActionAgent
from agents.image_agent import ImageAgent

class Orchestrator:
    def __init__(self):
        self.research = ResearchAgent()
        self.analysis = AnalysisAgent()
        self.decision = DecisionAgent()
        self.memory = MemoryAgent()
        self.action = ActionAgent()
        self.image = ImageAgent()

    def list_agents(self):
        return [
            "OrchestratorAgent",
            "ResearchAgent",
            "AnalysisAgent",
            "DecisionAgent",
            "MemoryAgent",
            "ActionAgent",
            "ImageAgent",
        ]

    async def run(self, query: str, mode: str = "auto"):
        steps = []
        image_url = None

        # Step 1: Store query in memory
        self.memory.store(query)
        steps.append("MemoryAgent: Query stored")

        # Step 2: Retrieve RAG context
        context = self.research.run(query)
        steps.append(f"ResearchAgent: Retrieved context ({len(context)} chars)")

        # Step 3: Decide routing
        route = self.decision.decide(query, mode)
        steps.append(f"DecisionAgent: Routing to → {route}")

        # Step 4: Route to appropriate agent
        if route == "image":
            result = self.image.run(query)
            image_url = result.get("image_url")
            final = result.get("message", "Image generated.")
            agent_used = "ImageAgent"

        elif route == "action":
            final = self.action.run(query, context)
            agent_used = "ActionAgent"

        else:
            analyzed = self.analysis.run(query, context)
            steps.append("AnalysisAgent: Context analyzed")
            final = analyzed
            agent_used = "AnalysisAgent"

        steps.append(f"{agent_used}: Response generated")
        return {
            "result": final,
            "agent_used": agent_used,
            "steps": steps,
            "image_url": image_url,
        }