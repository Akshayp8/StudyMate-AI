// Core helper for Hindsight Cloud Memory Engine
export const logMistake = async (userId: string, topic: string, mistake: string) => {
  console.log(`[Hindsight Push] Firing mistake log for ${userId} in ${topic}: ${mistake}`)
  
  try {
    const res = await fetch("https://api.hindsight.vectorize.io/v1/memory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_HINDSIGHT_API_KEY || process.env.HINDSIGHT_API_KEY}`,
      },
      body: JSON.stringify({
        userId,
        memoryKey: `mistake_log:${topic}`,
        data: { mistake, timestamp: new Date().toISOString() }
      })
    })
    return await res.json()
  } catch(error) {
    console.error("Hindsight API error:", error)
  }
}

export const updateCodePattern = async (userId: string, pattern: string, scoreChange: number) => {
  console.log(`[Hindsight Mock] Updating pattern ${pattern} for ${userId} by ${scoreChange}`)
}

export const getBehaviorDna = async (userId: string) => {
  return {
    avgTimePerQ: 45,
    skipRate: 0.1,
    hintUsage: 3,
    streak: 5
  }
}
