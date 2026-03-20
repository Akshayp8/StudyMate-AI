'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Temporarily redirect to dashboard for visual layout flow
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 text-center mb-8">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">Welcome Back</h1>
          <p className="text-gray-400 font-medium">Log in to resume your learning streak</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-bold text-gray-300">Password</label>
              <a href="#" className="text-sm font-medium text-purple-400 hover:text-purple-300">Forgot password?</a>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-900/40"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-400 mt-8 font-medium">
          Don't have an account? <Link href="/register" className="text-purple-400 hover:text-purple-300 font-bold">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
