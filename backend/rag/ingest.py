"""
Ingests documents from data/docs/ into a local FAISS vector store.
Run once: python rag/ingest.py
"""

import os
from pathlib import Path

DOCS_DIR = Path("data/docs")
INDEX_PATH = Path("data/faiss_index")

def ingest():
    try:
        from langchain_community.document_loaders import DirectoryLoader, TextLoader
        from langchain.text_splitter import RecursiveCharacterTextSplitter
        from langchain_community.embeddings import HuggingFaceEmbeddings
        from langchain_community.vectorstores import FAISS

        print("📂 Loading documents...")
        loader = DirectoryLoader(str(DOCS_DIR), glob="**/*.txt", loader_cls=TextLoader)
        docs = loader.load()

        if not docs:
            print("⚠️  No documents found in data/docs/. Add .txt files and re-run.")
            return

        print(f"✅ Loaded {len(docs)} document(s)")

        splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        chunks = splitter.split_documents(docs)
        print(f"🔪 Split into {len(chunks)} chunks")

        print("🔢 Creating embeddings...")
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        vectorstore = FAISS.from_documents(chunks, embeddings)

        INDEX_PATH.mkdir(parents=True, exist_ok=True)
        vectorstore.save_local(str(INDEX_PATH))
        print(f"💾 Index saved to {INDEX_PATH}")

    except ImportError:
        print("⚠️  RAG dependencies not installed. Run: pip install langchain langchain-community faiss-cpu sentence-transformers")

if __name__ == "__main__":
    ingest()