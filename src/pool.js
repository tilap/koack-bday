import assert from 'assert';
import { Pool, Server } from 'koack';
import memoryStorage from 'koack/storages/memory';

['SLACK_CLIENTID', 'SLACK_CLIENTSECRET', 'SLACK_POOL_SIZE', 'SLACK_SCOPE'].map(envVar =>
  assert(process.env[envVar], `Missing env configuration ${envVar}`)
);

const pool = new Pool({
  size: Number(process.env.SLACK_POOL_SIZE),
  path: require.resolve('./bot'),
});

const server = new Server({
  pool,
  scopes: process.env.SLACK_SCOPE.split(','),
  slackClient: {
    clientID: process.env.SLACK_CLIENTID,
    clientSecret: process.env.SLACK_CLIENTSECRET,
  },
  storage: memoryStorage(),
});

server.listen({ port: Number(process.env.PORT) || 3000 });
