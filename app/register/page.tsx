'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Temporarily redirect to dashboard for visual layout flow
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 mb-8">
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Create Account</h1>
          <p className="text-gray-400 font-medium">Join StudyMate AI and build your memory DNA.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 relative z-10">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-1.5">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="Elon Musk"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-1.5">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="elon@mars.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-1.5">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="Create a strong password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-900/40 tracking-wide"
          >
            Create My AI Brain
          </button>
        </form>

        <p className="text-center text-gray-400 mt-8 font-medium">
          Already have an account? <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-bold">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
