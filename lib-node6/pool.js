'use strict';

var _koack = require('koack');

var _memory = require('koack/storages/memory');

var _memory2 = _interopRequireDefault(_memory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!process.env.SLACK_CLIENTID) {
  throw new Error('Missing env configuration', { key: 'SLACK_CLIENTID' });
}
if (!process.env.SLACK_CLIENTSECRET) {
  throw new Error('Missing env configuration', { key: 'SLACK_CLIENTSECRET' });
}
if (!process.env.SLACK_POOL_SIZE) {
  throw new Error('Missing env configuration', { key: 'SLACK_POOL_SIZE' });
}

const pool = new _koack.Pool({
  size: Number(process.env.SLACK_POOL_SIZE),
  path: require.resolve('./bot')
});

const server = new _koack.Server({
  pool,
  scopes: ['bot'],
  slackClient: {
    clientID: process.env.SLACK_CLIENTID,
    clientSecret: process.env.SLACK_CLIENTSECRET
  },
  storage: (0, _memory2.default)()
});

server.listen({ port: Number(process.env.PORT) || 3000 });
//# sourceMappingURL=pool.js.map