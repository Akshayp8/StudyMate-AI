'use client'

import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

interface RadarProps {
  data: { topic: string; score: number }[]
}

export default function RadarChart({ data }: RadarProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#4b5563" />
          <PolarAngleAxis dataKey="topic" tick={{ fill: '#d1d5db', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Proficiency" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  )
}
