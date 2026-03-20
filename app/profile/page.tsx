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
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-12">
      <header className="flex justify-between items-center mb-10 bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">User DNA Profile</h1>
          <p className="text-gray-400 text-sm mt-1">Holistic view of all your learning vectors mapped by Hindsight Cloud</p>
        </div>
        <Link href="/" className="px-5 py-2.5 rounded-xl font-bold transition-all bg-gray-800 hover:bg-gray-700 text-gray-300">⬅ Back to Dashboard</Link>
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-xl min-h-[500px] flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-gray-200">Skill Radar Map</h2>
          <div className="flex-grow min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dnaData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="topic" tick={{ fill: '#9CA3AF', fontSize: 13 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Proficiency" dataKey="proficiency" stroke="#60A5FA" fill="#3B82F6" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
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
