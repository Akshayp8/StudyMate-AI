'use client'

import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [memories, setMemories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchHindsightData = async () => {
      try {
        // Fetch securely from the Hindsight endpoint using your provided key
        const res = await fetch("https://api.hindsight.cloud/v1/memory", {
          method: "GET",
          headers: {
            "Authorization": `Bearer hsk_27e1ddd4eb7084821248dbccb387eb80_0d4b6752e6c0eaf8`,
            "Content-Type": "application/json"
          }
        })
        if (!res.ok) throw new Error("Failed to sync with Hindsight Cloud APIs")
        const data = await res.json()
        setMemories(Array.isArray(data) ? data : data.data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchHindsightData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-2">Hindsight Admin Dashboard</h1>
        <p className="text-gray-400 font-medium">Live view of all raw User DNA and Mistake Logs in real-time.</p>
      </header>

      {loading && <div className="text-center text-blue-400 mt-20 animate-pulse font-bold text-2xl flex items-center justify-center gap-3">
        <span className="w-4 h-4 bg-blue-400 rounded-full animate-ping"></span> 
        Connecting to Hindsight Cloud...
        <span className="w-4 h-4 bg-blue-400 rounded-full animate-ping delay-150"></span>
      </div>}
      
      {error && (
        <div className="max-w-2xl mx-auto bg-red-950/30 border border-red-700/50 rounded-2xl p-8 text-center shadow-lg">
          <span className="text-5xl mb-4 block animate-bounce">⚠️</span>
          <p className="text-red-400 text-2xl font-bold mb-2">{error}</p>
          <p className="text-red-300/70">The Hindsight API might require a specific project ID query parameter or the API is blocking direct front-end GET requests. Since their website is confusing, I highly recommend storing it directly to your Vercel Redis as a backup if they can't provide the data view!</p>
        </div>
      )}

      {!loading && !error && memories.length === 0 && (
        <div className="text-center text-gray-500 mt-20 text-lg border border-dashed border-gray-700 p-12 rounded-3xl max-w-xl mx-auto">
          No memory logs found yet! Go take a quiz first!
        </div>
      )}

      {!loading && memories.length > 0 && (
        <div className="overflow-x-auto bg-gray-900 rounded-3xl border border-gray-800 shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-gray-800/80 border-b border-gray-700 text-sm uppercase tracking-widest font-black text-gray-500">
              <tr>
                <th className="px-6 py-5 rounded-tl-3xl">User ID</th>
                <th className="px-6 py-5">Memory Key</th>
                <th className="px-6 py-5 rounded-tr-3xl">Raw Data Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50 text-gray-300">
              {memories.map((mem, idx) => (
                <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-5 font-mono text-sm text-purple-400 bg-purple-900/10">{mem.userId || 'Anonymous'}</td>
                  <td className="px-6 py-5 font-mono text-sm text-emerald-400 bg-emerald-900/10">{mem.memoryKey || 'mistake_log:unknown'}</td>
                  <td className="px-6 py-5">
                    <pre className="bg-gray-950 p-4 rounded-xl border border-gray-800 text-xs overflow-x-auto shadow-inner text-yellow-300/80">
                      {JSON.stringify(mem.data || mem, null, 2)}
                    </pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
