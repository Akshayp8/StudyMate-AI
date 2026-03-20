import os
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
from hindsight_client import Hindsight

load_dotenv(".env.local")

app = FastAPI(title="StudyMate AI API")

# Initialize Groq Client
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

class QuizRequest(BaseModel):
    topic: str
    difficulty: str = "medium"

@app.get("/api/health")
def read_root():
    return {"status": "ok", "message": "StudyMate Backend is running."}

@app.post("/api/quiz/generate")
async def generate_quiz(req: QuizRequest):
    if not os.environ.get("GROQ_API_KEY"):
        raise HTTPException(status_code=500, detail="Groq API Key not configured")

    # --- ADAPTIVE LOGIC: Fetch User DNA from Hindsight ---
    hindsight_api_key = os.environ.get("HINDSIGHT_API_KEY")
    weakness_context = ""
    if hindsight_api_key:
        try:
            hs_client = Hindsight(api_key=hindsight_api_key, base_url="https://api.hindsight.vectorize.io")
            # Recall specific struggle areas for the requested topic
            result = hs_client.recall(bank_id="studymate", query=f"What are the user's specific mistakes or weaknesses in {req.topic}?")
            if result.results:
                mistakes = [m.text for m in result.results[:5]]
                weakness_context = f"\n\nCRITICAL CONTEXT (User Weaknesses detected by Hindsight Cloud):\n" + "\n".join(mistakes)
                print(f"DEBUG: Found {len(mistakes)} weakness memories to adapt quiz.")
        except Exception as e:
            print(f"DEBUG: Hindsight recall failed: {e}")

    prompt = f"""Generate 5 COMPLETELY NEW, HIGH-VARIETY multiple choice questions about {req.topic} at a {req.difficulty} level.
Avoid common/cliché questions. Focus on obscure edge cases, deep conceptual nuances, and varied difficulty sub-niches.{weakness_context}
If weaknesses are provided above, HEAVILY WEIGHT the quiz questions toward correcting those specific misunderstandings.
Reference dynamic context hash: {os.urandom(16).hex()} (MANDATORY: use this to randomize your internal seed).
Format the output EXACTLY as a JSON array of objects with keys: 'question', 'options' (array of strings), 'answer' (string matching one option), 'explanation'. Do not include markdown formatting or extra text."""
    
    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a creative and rigorous AI quiz generator. You NEVER repeat the same question twice. Output ONLY valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.8,
            max_tokens=2000,
        )
        return {"quiz": json.loads(completion.choices[0].message.content)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class CodeChallengeRequest(BaseModel):
    dna_weakness: str

@app.post("/api/code/challenge")
async def generate_code_challenge(req: CodeChallengeRequest):
    prompt = f"Generate a coding challenge targeting the user's weakness: {req.dna_weakness}. Provide problem description, starting python code, and target solution approach. Format as JSON with keys: 'title', 'description', 'starting_code'."
    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are an expert technical interviewer. Output ONLY valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5
        )
        return {"challenge": json.loads(completion.choices[0].message.content)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class MistakeLogRequest(BaseModel):
    userId: str
    topic: str
    mistake: str

class QuizHistoryRequest(BaseModel):
    userId: str
    topic: str
    score: int
    total: int
    timestamp: str

@app.post("/api/hindsight/log-history")
def log_quiz_history(req: QuizHistoryRequest):
    api_key = os.environ.get("HINDSIGHT_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Hindsight API key not found")
    try:
        hs_client = Hindsight(api_key=api_key, base_url="https://api.hindsight.vectorize.io")
        # Simplified user-friendly history string
        content = f"Quiz Session: Participated in {req.topic} quiz with score {req.score}/{req.total}"
        hs_client.retain(bank_id="studymate", content=content)
        return {"status": "success"}
    except Exception as e:
        return {"status": "error", "detail": str(e)}

@app.get("/api/hindsight/history")
def get_quiz_history():
    api_key = os.environ.get("HINDSIGHT_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Hindsight API key not found")
    try:
        hs_client = Hindsight(api_key=api_key, base_url="https://api.hindsight.vectorize.io")
        # Broad recall to catch all variations of quiz history
        result = hs_client.recall(bank_id="studymate", query="Quiz participated history completion score")
        print(f"DEBUG: Hindsight recall returned {len(result.results)} raw results")
        history = []
        for mem in result.results:
            text = mem.text
            # Inclusive check for any quiz-related logs
            if "quiz" in text.lower() or "score" in text.lower():
                import re
                # Try to extract score like 3/5
                score_match = re.search(r'(\d/\d)', text)
                score_str = score_match.group(1) if score_match else "Completed"
                
                # Force basic format as requested
                history.append({
                    "text": f"AI Quiz - Score {score_str}", 
                    "id": mem.id
                })
        
        print(f"DEBUG: Internal history list has {len(history)} items")
        return {"status": "success", "history": history}
    except Exception as e:
        return {"status": "error", "detail": str(e)}

@app.post("/api/hindsight/log")
def log_hindsight_mistake(req: MistakeLogRequest):
    api_key = os.environ.get("HINDSIGHT_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Hindsight API key not found")
        
    try:
        # Initialize official Hindsight SDK
        hs_client = Hindsight(
            base_url="https://api.hindsight.vectorize.io",
            api_key=api_key
        )
        
        # Format the memory into an English string for semantic ingestion
        memory_content = f"User {req.userId} profile DNA update: Struggled with topic '{req.topic}'. Specific mistake logged: {req.mistake}"
        
        # Store memory passing "studymate" dynamically as the bank_id
        hs_client.retain(
            bank_id="studymate",
            content=memory_content
        )
        
        return {"status": "success", "message": "Successfully retained in Hindsight memory bank 'studymate'!"}
    except Exception as e:
        return {"status": "error", "detail": str(e)}
