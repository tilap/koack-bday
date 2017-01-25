import assert from 'assert';
import { Pool, Server } from 'koack';
import mongoStorage from 'koack/storages/mongo';

['SLACK_CLIENTID', 'SLACK_CLIENTSECRET', 'SLACK_POOL_SIZE', 'SLACK_SCOPE', 'MONGO'].map(envVar =>
  assert(process.env[envVar], `Missing env configuration ${envVar}`)
);

(async () => {
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
    storage: await mongoStorage(process.env.MONGO),
  });

  server.listen({ port: Number(process.env.PORT) || 3000 });

  const close = async () => {
    await server.stop();
    process.exit(0);
  };
  process.on('SIGINT', close);
  process.on('SIGTERM', close);
})();
