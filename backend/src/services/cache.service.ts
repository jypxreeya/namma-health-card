import Redis from 'ioredis';

class CacheService {
  private redis: Redis | null = null;
  private memoryCache: Map<string, { value: any, expires: number }> = new Map();

  constructor() {
    if (process.env.REDIS_URL) {
      try {
        this.redis = new Redis(process.env.REDIS_URL, {
          maxRetriesPerRequest: 3,
          retryStrategy: (times) => Math.min(times * 50, 2000),
        });
        this.redis.on('error', (err) => {
          console.error('Redis Connection Error:', err);
        });
      } catch (err) {
        console.error('Failed to initialize Redis:', err);
      }
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (this.redis) {
      try {
        const data = await this.redis.get(key);
        return data ? JSON.parse(data) : null;
      } catch (err) {
        console.error('Redis Get Error:', err);
      }
    }

    const item = this.memoryCache.get(key);
    if (item && item.expires > Date.now()) {
      return item.value;
    }
    if (item) this.memoryCache.delete(key);
    return null;
  }

  async set(key: string, value: any, ttlSeconds: number = 3600): Promise<void> {
    if (this.redis) {
      try {
        await this.redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
        return;
      } catch (err) {
        console.error('Redis Set Error:', err);
      }
    }

    this.memoryCache.set(key, {
      value,
      expires: Date.now() + (ttlSeconds * 1000)
    });
  }

  async del(key: string): Promise<void> {
    if (this.redis) {
      try {
        await this.redis.del(key);
      } catch (err) {
        console.error('Redis Del Error:', err);
      }
    }
    this.memoryCache.delete(key);
  }

  async clearPrefix(prefix: string): Promise<void> {
    if (this.redis) {
       const keys = await this.redis.keys(`${prefix}*`);
       if (keys.length > 0) {
         await this.redis.del(...keys);
       }
    } else {
      for (const key of this.memoryCache.keys()) {
        if (key.startsWith(prefix)) {
          this.memoryCache.delete(key);
        }
      }
    }
  }
}

export const cacheService = new CacheService();
