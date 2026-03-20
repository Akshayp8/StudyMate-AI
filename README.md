# StudyMate AI 🧠⚡
### *Your Infinite Memory ADAPTIVE Learning Companion*

StudyMate AI is a state-of-the-art educational assistant that uses **Long-Term Semantic Memory** (powered by Hindsight Cloud) and **Llama-3 (Groq)** to build a personalized "Learning DNA" for every student.

Unlike traditional quiz apps, StudyMate remembers exactly where you struggle and automatically adapts future challenges to focus on those specific weaknesses—making your study sessions **100% efficient**.

---

## 🚀 Key Features

- **🧠 Adaptive AI Quiz Engine**: Uses Hindsight memory recall to identify your weak concepts (e.g., Array bounds, Recursion depth) and generates targeted questions to help you improve.
- **💻 Code Arena**: A full-featured Monaco editor environment for solving AI-generated algorithmic challenges.
- **📊 User DNA Profile**: A comprehensive dashboard featuring a **Skill Radar Map** and a simplified **Quiz Participation History** pulled directly from the cloud.
- **✨ Instant Feedback**: Get real-time ✅/❌ results with deep AI conceptual explanations for every answer.
- **🔴 Hindsight Cloud Powered**: Advanced semantic storage that ensures your learning progress is never forgotten across sessions.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Lucide Icons, Recharts.
- **Backend**: FastAPI (Python 3.10+), Uvicorn.
- **Intelligence**: Groq API (Llama-3.3-70b-versatile).
- **Memory Layer**: Hindsight Cloud (Official Vectorize SDK).
- **Persistence**: Vercel KV / Redis.

---

## 📦 Local Setup

### 1. Requirements
Ensure you have **Node.js 18+** and **Python 3.10+** installed.

### 2. Environment Variables
Create a `.env.local` file in the root directory:
```env
GROQ_API_KEY=your_groq_key
HINDSIGHT_API_KEY=your_hindsight_key
# Optional: KV_URL, KV_REST_API_URL for streaks
```

### 3. Install Dependencies
```bash
# Frontend
npm install

# Backend
pip install -r api/requirements.txt
```

### 4. Run the Project
Open two terminals:

**Terminal 1 (Backend):**
```bash
python -m uvicorn api.index:app --port 8000
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 🛡️ Hindsight Integration
StudyMate uses the official `hindsight-client` to `retain` and `recall` user struggle patterns. This allows the AI to stay "context-aware" of your entire learning journey without manual prompting.

---

*Built for the Hackathon community to revolutionize the way we master complex technical concepts.* 🚀
