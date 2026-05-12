from pathlib import Path

INDEX_PATH = Path("data/faiss_index")

def retrieve_context(query: str, k: int = 3) -> str:
    if not INDEX_PATH.exists():
        return ""

    try:
        from langchain_community.embeddings import HuggingFaceEmbeddings
        from langchain_community.vectorstores import FAISS

        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        vectorstore = FAISS.load_local(
            str(INDEX_PATH), embeddings, allow_dangerous_deserialization=True
        )
        docs = vectorstore.similarity_search(query, k=k)
        return "\n\n".join([d.page_content for d in docs])
    except Exception as e:
        return ""