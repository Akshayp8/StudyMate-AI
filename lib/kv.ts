import Redis from 'ioredis'

// Standard robust Redis connection using the connection string
export const redis = new Redis(process.env.REDIS_URL || '')

export const getStreak = async (userId: string) => {
  return await redis.get(`streak:${userId}`)
}

export const incrementStreak = async (userId: string) => {
  return await redis.incr(`streak:${userId}`)
}
