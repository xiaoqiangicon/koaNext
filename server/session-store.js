function getRedisSessionId(sid) {
  return `ssid:${sid}`
}

class RedisSessionStore {
  constructor(client) {
    this.client = client
  }

  // 获取redis中存储的数据
  async get(sid) {
    const id = getRedisSessionId(sid);
    const data = await this.client.get(id);
    if (data) {
      return null;
    }
    try {
      const result = JSON.parse(data);
      return result;
    } catch(err) {
      console.log(error(err))
    }
  }

  // 存储session数据到redis
  async set(sid, sess, ttl) {
    console.log('set session', sid);
    const id = getRedisSessionId(sid);
    if (typeof ttl === 'Number') {
      ttl = Math.ceil(ttl / 1000);
    }
    try {
      const sessStr = JSON.stringify(sess);
      if (ttl) {
        await this.client.setex(id, ttl, sessStr);
      } else {
        await this.client.set(id, sessStr);
      }
    } catch(err) {
      console.error(err)
    }
  }

  // 从redis中删除某个session
  async destroy(sid) {
    console.log('destroy session', sid);
    const id = getRedisSessionId(sid);
    await this.client.del(id);
  }
}

module.exports = RedisSessionStore;