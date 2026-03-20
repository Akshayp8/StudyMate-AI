'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import MonacoEditor from '@/components/MonacoEditor'

export default function CodeArenaPage() {
  const [code, setCode] = useState('function twoSum(nums, target) {\n  // your code here\n}')
  const [loading, setLoading] = useState(false)
  const [challenge, setChallenge] = useState<any>(null)

  const fetchChallenge = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/code/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dna_weakness: 'Dynamic Programming base cases and edge cases.' })
      })
      const data = await res.json()
      if (data.challenge) {
        setChallenge(data.challenge)
        setCode(data.challenge.starting_code || '// write code')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 flex flex-col">
      <header className="relative flex justify-center items-center mb-6 bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 inline-block">Code Arena</h1>
          <p className="text-gray-400 text-sm mt-1 font-medium">Solve AI-Generated Challenges to Evolve your DNA</p>
        </div>
        <Link href="/" className="absolute left-6 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold transition-all border border-gray-700">
          ⬅ Back
        </Link>
      </header>
      
      {/* Buttons moved outside the header to maintain functionality based on the instruction's context */}
      <div className="flex gap-4 mb-6 justify-end"> {/* Added a div to contain buttons and apply margin-bottom */}
          <button onClick={fetchChallenge} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-purple-500/25">
            {loading ? 'AI Generating...' : 'Generate AI Challenge'}
          </button>
          <button className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-green-500/25">
            Submit Code
          </button>
        </div>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        {/* Left pane: Problem & Hints */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 flex flex-col shadow-xl">
          {challenge ? (
            <>
              <div className="flex justify-between items-start mb-6">
                 <h2 className="text-2xl font-bold">{challenge.title}</h2>
                 <span className="text-xs px-3 py-1 bg-yellow-900/50 text-yellow-400 rounded-full border border-yellow-700/50 font-semibold tracking-wide uppercase">AI Adaptive</span>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed whitespace-pre-wrap">
                {challenge.description}
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-between items-start mb-6">
                 <h2 className="text-2xl font-bold">Waiting for AI...</h2>
              </div>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed italic">
                Click "Generate AI Challenge" to get a customized coding problem based on your Hindsight DNA profile.
              </p>
            </>
          )}
          
          <div className="mt-auto bg-blue-950/30 rounded-xl p-5 border border-blue-900/50">
            <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
              <span className="text-xl">🤖</span> Personalized Hint
            </h3>
            <p className="text-blue-100/70 leading-relaxed">
              I noticed you often forget to account for elements combining with themselves. Remember that you may not use the same element twice.
            </p>
          </div>
        </div>

        {/* Right pane: Monaco Editor */}
        <div className="flex flex-col h-[600px] lg:h-auto rounded-xl overflow-hidden border border-gray-700 shadow-xl shadow-black/50">
           <div className="bg-gray-950 px-5 py-3 text-sm text-gray-400 font-medium flex items-center justify-between border-b border-gray-800">
              <span>main.js</span>
              <span className="text-xs text-gray-600">JavaScript</span>
           </div>
           <div className="flex-1 bg-[#1e1e1e]">
             <MonacoEditor language="javascript" initialCode={code} onChange={(val) => setCode(val || '')} />
           </div>
        </div>
      </div>
    </div>
  )
}
