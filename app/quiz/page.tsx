'use client'
import { useState } from 'react'

export default function QuizPage() {
  const [loading, setLoading] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const startQuiz = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: 'Data Structures and Algorithms', difficulty: 'medium' })
      })
      const data = await res.json()
      if (data.quiz) {
        setQuestions(data.quiz)
        setQuizStarted(true)
      } else {
        alert('Failed to generate quiz: ' + JSON.stringify(data))
      }
    } catch (err) {
      console.error(err)
      alert('Error fetching quiz.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-6 text-purple-400">Quiz Engine</h1>
      
      {!quizStarted ? (
        <div className="w-full max-w-xl bg-gray-800 rounded-xl p-8 border border-gray-700 text-center shadow-xl">
          <p className="text-gray-400 mb-6 font-medium">Test your knowledge and let StudyMate AI memorize your weak points to personalize your learning plan.</p>
          <button 
            onClick={startQuiz}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-purple-500/25"
          >
            {loading ? 'Generating AI Quiz...' : 'Start Personalized Quiz'}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-xl">
                <span className="text-blue-400 font-bold mb-2 block">Question {currentQuestionIdx + 1} of {questions.length}</span>
                <h2 className="text-2xl font-bold text-gray-100 mb-6">{questions[currentQuestionIdx]?.question}</h2>
                <div className="grid gap-3 mb-6">
                  {questions[currentQuestionIdx]?.options.map((option: string) => {
                    const isCorrect = option === questions[currentQuestionIdx].answer;
                    const isSelected = selectedOption === option;
                    let btnClass = "text-left w-full p-4 rounded-xl border transition-all font-medium text-gray-300 ";
                    
                    if (selectedOption) {
                      if (isCorrect) btnClass += "border-emerald-500 bg-emerald-900/20 text-emerald-300";
                      else if (isSelected) btnClass += "border-red-500 bg-red-900/20 text-red-300";
                      else btnClass += "border-gray-700 opacity-50";
                    } else {
                      btnClass += "border-gray-700 hover:border-blue-500 hover:bg-gray-700/50";
                    }

                    return (
                      <button 
                        key={option} 
                        disabled={selectedOption !== null}
                        onClick={() => setSelectedOption(option)}
                        className={btnClass}
                      >
                        {option} {selectedOption && isCorrect && " ✅"} {selectedOption && isSelected && !isCorrect && " ❌"}
                      </button>
                    );
                  })}
                </div>

                {selectedOption && (
                  <div className="p-5 bg-gray-900 rounded-xl border border-gray-700 mb-5 animate-in fade-in slide-in-from-bottom-2">
                    <p className="font-bold text-blue-400 mb-2 uppercase text-xs tracking-wider">AI Insight / Explanation</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{questions[currentQuestionIdx]?.explanation}</p>
                  </div>
                )}

                {selectedOption && (
                  <button 
                    onClick={async () => {
                      const topic = 'Data Structures and Algorithms'; // Define topic here or pass as prop
                      if (!questions[currentQuestionIdx] || selectedOption !== questions[currentQuestionIdx].answer) {
                        try {
                          await fetch('/api/hindsight/log', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                              userId: 'user_123', 
                              topic: topic || 'General Topic', 
                              mistake: `Missed conceptually: ${questions[currentQuestionIdx]?.explanation || 'Unknown reason'} (Chose: ${selectedOption})`
                            })
                          })
                        } catch(e) { console.error(e) }
                      }

                      // Update score for the current question
                      if (selectedOption === questions[currentQuestionIdx].answer) {
                        setScore(prev => prev + 1);
                      }

                      if (currentQuestionIdx < questions.length - 1) {
                        setCurrentQuestionIdx(prev => prev + 1)
                        setSelectedOption(null)
                      } else {
                        alert('Quiz Finished! All Data Synced to Hindsight. Returning to dashboard...')
                        try {
                          // Log final score and history
                          await fetch('/api/hindsight/log-history', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              userId: 'user_123',
                              topic: topic || 'General Topic',
                              score: score + (selectedOption === questions[currentQuestionIdx].answer ? 1 : 0),
                              total: questions.length,
                              timestamp: new Date().toLocaleString()
                            })
                          })
                        } catch(e) { console.error(e) }
                        window.location.href = '/'
                      }
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-500/20"
                  >
                    {currentQuestionIdx < questions.length - 1 ? 'Next Question ➡' : 'Finish Quiz 🎉'}
                  </button>
                )}
              </div>
      )}
    </div>
  )
}
