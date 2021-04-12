const redis = require('redis');
let client;

if (process.env.REDISTOGO_URL) {
	var rtg = require('url').parse(process.env.REDISTOGO_URL);
	console.log(rtg);
	client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(':')[1]);
} else {
	client = redis.createClient(6379, process.env.REDIS_HOST);
}

const RedisConfig = {
	client: client,
	ttl: 604800,
};

module.exports = (session) => {
	const redisStore = require('connect-redis')(session);
	return new redisStore(RedisConfig);
};
