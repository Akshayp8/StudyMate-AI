'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const dnaData = [
  { topic: 'Arrays', proficiency: 90 },
  { topic: 'Trees', proficiency: 45 },
  { topic: 'Graphs', proficiency: 30 },
  { topic: 'DP', proficiency: 75 },
  { topic: 'Math', proficiency: 60 },
  { topic: 'Strings', proficiency: 85 },
];

export default function Profile() {
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/hindsight/history')
        const data = await res.json()
        if (data.status === 'success') {
          setHistory(data.history)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
      <header className="relative w-full flex justify-center items-center mb-10 bg-gray-900/50 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-800">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 inline-block">User DNA Profile</h1>
          <p className="text-gray-400 text-sm mt-1 font-medium italic">Your personalized learning identity across the StudyMate ecosystem</p>
        </div>
        <Link href="/" className="absolute left-6 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold transition-all border border-gray-700 shadow-lg">
          ⬅ Back
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* User Info Card */}
        <div className="bg-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-800 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">ACTIVE</span>
          </div>
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-emerald-500 rounded-full mb-4 flex items-center justify-center text-3xl font-bold shadow-lg shadow-blue-500/20">
            A
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Akshay P.</h2>
          <p className="text-gray-400 text-sm mb-6">Mastery Level: 14</p>
          
          <div className="w-full space-y-4 text-left">
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-1">Guest Token ID</p>
              <p className="text-blue-400 font-mono text-sm truncate">SM-GUEST-446-X8B2-99L</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700 text-center">
                <p className="text-gray-500 text-[10px] uppercase font-bold">Quizzes Take</p>
                <p className="text-emerald-400 font-bold text-lg">{history.length}</p>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700 text-center">
                <p className="text-gray-500 text-[10px] uppercase font-bold">Avg. Accuracy</p>
                <p className="text-blue-400 font-bold text-lg">78%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Radar Chart */}
        <div className="lg:col-span-2 bg-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">⚡</span> Concept Proficiency
            </h3>
            <span className="text-gray-500 text-xs">Updated Real-time</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dnaData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="topic" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                   name="User Progress"
                   dataKey="proficiency"
                   stroke="#3B82F6"
                   fill="#3B82F6"
                   fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
        
        <div className="space-y-8">
          <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-xl">
             <h2 className="text-2xl font-bold mb-4 text-rose-400 flex items-center gap-2">⚠️ Critical Focus Areas</h2>
             <ul className="space-y-4">
               <li className="p-4 bg-gray-950 rounded-xl border border-gray-800">
                 <span className="font-bold text-white block mb-1">Graph Traversal Algorithms</span>
                 <span className="text-gray-400 text-sm">Hindsight caught you making 4 consecutive errors in DFS recursion limits during your last 3 challenges.</span>
               </li>
               <li className="p-4 bg-gray-950 rounded-xl border border-gray-800">
                 <span className="font-bold text-white block mb-1">Binary Search Edge Cases</span>
                 <span className="text-gray-400 text-sm">You frequently hit off-by-one errors when target bounds shrink resulting in Time Limit Exceeded.</span>
               </li>
             </ul>
          </div>
          <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 p-8 rounded-3xl border border-emerald-800/30 shadow-emerald-500/5">
             <h2 className="text-2xl font-bold mb-2 text-emerald-400 flex items-center gap-2">⭐ Strongest Traits</h2>
             <p className="text-gray-300">Arrays and Dynamic Programming are your anchors. You solve them 30% faster than average across all users in the matrix.</p>
          </div>

          <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-xl">
             <h2 className="text-2xl font-bold mb-6 text-blue-400 flex items-center gap-2">📜 Quiz Participation History</h2>
             {loading ? (
               <div className="py-10 text-center text-gray-500 animate-pulse">Fetching memory history...</div>
             ) : history.length > 0 ? (
               <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                 {history.map((item, idx) => (
                   <div key={idx} className="p-4 bg-gray-950 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-colors">
                     <p className="text-gray-300 text-sm font-medium">{item.text.replace('Quiz Session: ', '')}</p>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="py-10 text-center text-gray-600 italic border border-dashed border-gray-800 rounded-xl">
                 No quiz history found in Hindsight yet.
               </div>
             )}
          </div>
        </div>
      </main>
    </div>
  )
}
