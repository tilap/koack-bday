import { Pool, Server } from 'koack';
import memoryStorage from 'koack/storages/memory';

if (!process.env.SLACK_CLIENTID) {
  throw new Error('Missing env configuration', { key: 'SLACK_CLIENTID' });
}
if (!process.env.SLACK_CLIENTSECRET) {
  throw new Error('Missing env configuration', { key: 'SLACK_CLIENTSECRET' });
}
if (!process.env.SLACK_POOL_SIZE) {
  throw new Error('Missing env configuration', { key: 'SLACK_POOL_SIZE' });
}

const pool = new Pool({
  size: Number(process.env.SLACK_POOL_SIZE),
  path: require.resolve('./bot'),
});

const server = new Server({
  pool,
  scopes: ['bot'],
  slackClient: {
    clientID: process.env.SLACK_CLIENTID,
    clientSecret: process.env.SLACK_CLIENTSECRET,
  },
  storage: memoryStorage(),
});

server.listen({ port: Number(process.env.PORT) || 3000 });
