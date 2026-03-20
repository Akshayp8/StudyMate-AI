import Link from 'next/link'
import RadarChart from '@/components/RadarChart'

export default function DashboardPage() {
  const dnaData = [
    { topic: 'Arrays', score: 90 },
    { topic: 'Trees', score: 40 },
    { topic: 'Dynamic Prog', score: 20 },
    { topic: 'Graphs', score: 60 },
    { topic: 'Sorting', score: 85 },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <header className="relative flex justify-center items-center mb-10 bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 inline-block">StudyMate AI</h1>
          <p className="text-gray-400 text-sm mt-1 font-medium">Your Adaptive Hacker Learning Companion</p>
        </div>
        <div className="absolute right-6 flex gap-3 items-center">
          <Link href="/login" className="px-5 py-2.5 rounded-xl font-bold transition-all bg-gray-800 hover:bg-gray-700 text-gray-300">Log In</Link>
          <Link href="/profile" className="flex items-center justify-center px-4 py-2.5 rounded-xl font-bold transition-all bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/30 text-emerald-400">
            👤 Profile
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Actions */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
           <Link href="/quiz" className="group relative overflow-hidden bg-gradient-to-br from-purple-900/60 to-purple-950/80 hover:from-purple-800/80 hover:to-purple-900/80 border border-purple-700/50 p-10 rounded-3xl transition-all duration-300 shadow-xl hover:shadow-purple-900/50 flex flex-col items-center justify-center text-center">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
             <div className="w-20 h-20 bg-purple-500 text-white rounded-full flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-purple-500/40 relative z-10">
               🧠
             </div>
             <h2 className="text-3xl font-bold mb-3 relative z-10 text-purple-50">AI Quiz Generator</h2>
             <p className="text-purple-200/80 font-medium relative z-10">Adaptive questions based on weak topics</p>
           </Link>
           
           <Link href="/code" className="group relative overflow-hidden bg-gradient-to-br from-emerald-900/60 to-emerald-950/80 hover:from-emerald-800/80 hover:to-emerald-900/80 border border-emerald-700/50 p-10 rounded-3xl transition-all duration-300 shadow-xl hover:shadow-emerald-900/50 flex flex-col items-center justify-center text-center">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
             <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-emerald-500/40 relative z-10">
               💻
             </div>
             <h2 className="text-3xl font-bold mb-3 relative z-10 text-emerald-50">Code Arena</h2>
             <p className="text-emerald-200/80 font-medium relative z-10">Personalized algorithmic challenges</p>
           </Link>

           <div className="sm:col-span-2 bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 relative z-10">
                <span className="text-blue-400 bg-blue-400/10 p-2 rounded-lg">📅</span> Upcoming Study Plan
              </h3>
              <div className="space-y-4 relative z-10">
                <div className="flex flex-col sm:flex-row bg-gray-950/50 p-5 rounded-2xl border border-gray-800 hover:border-blue-900/50 transition-colors items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-xl text-gray-100 mb-1">Dynamic Programming Revision</p>
                    <p className="text-sm font-medium text-blue-400">High Priority <span className="text-gray-500 font-normal">• Weakness Score: 80%</span></p>
                  </div>
                  <button className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition-all">Start Now</button>
                </div>
                <div className="flex flex-col sm:flex-row bg-gray-950/50 p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-xl text-gray-100 mb-1">Tree Traversals Practice</p>
                    <p className="text-sm text-gray-500 font-medium">Scheduled for tomorrow</p>
                  </div>
                </div>
              </div>
           </div>
        </div>

        {/* DNA Profile Column */}
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
           <h3 className="text-2xl font-bold mb-2 text-white">User DNA Profile</h3>
           <p className="text-purple-400/80 text-sm font-medium mb-10 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             Powered by Hindsight Cloud
           </p>
           
           <div className="mb-10 flex-1">
             <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
               <span className="h-px bg-gray-800 flex-1"></span> Topic Weakness Radar <span className="h-px bg-gray-800 flex-1"></span>
             </h4>
             <div className="bg-gray-950/50 rounded-2xl p-4 border border-gray-800">
               <RadarChart data={dnaData} />
             </div>
           </div>

           <div>
             <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
               <span className="h-px bg-gray-800 flex-1"></span> Coding Behavior Flags <span className="h-px bg-gray-800 flex-1"></span>
             </h4>
             <div className="space-y-4">
                <div className="bg-red-950/20 border border-red-900/30 p-5 rounded-2xl flex items-start gap-4 hover:bg-red-950/40 transition-colors">
                   <div className="bg-red-500/10 p-2 rounded-xl border border-red-500/20 text-red-400 text-xl">⚠️</div>
                   <div>
                     <p className="text-red-300 font-bold tracking-wide">Skips Edge Cases</p>
                     <p className="text-red-200/60 text-sm mt-1.5 leading-relaxed">Found in 4 recent coding attempts</p>
                   </div>
                </div>
                <div className="bg-amber-950/20 border border-amber-900/30 p-5 rounded-2xl flex items-start gap-4 hover:bg-amber-950/40 transition-colors">
                   <div className="bg-amber-500/10 p-2 rounded-xl border border-amber-500/20 text-amber-400 text-xl">⏱️</div>
                   <div>
                     <p className="text-amber-300 font-bold tracking-wide">Speed vs Accuracy</p>
                     <p className="text-amber-200/60 text-sm mt-1.5 leading-relaxed">You answer 30% faster than average but make more off-by-one errors.</p>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
