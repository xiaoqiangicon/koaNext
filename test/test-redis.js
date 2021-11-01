async function test() {
  const Redis = require('ioredis');

  const redis = new Redis({
    port: 6379,
  })
  await redis.set('c', 123);
  await redis.setex('a', 100, 'lee');
  console.log(await redis.get('abc'));
}

test();