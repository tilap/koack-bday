'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _koack = require('koack');

var _memory = require('koack/storages/memory');

var _memory2 = _interopRequireDefault(_memory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

['SLACK_CLIENTID', 'SLACK_CLIENTSECRET', 'SLACK_POOL_SIZE', 'SLACK_SCOPE'].map(envVar => (0, _assert2.default)(process.env[envVar], `Missing env configuration ${envVar}`));

const pool = new _koack.Pool({
  size: Number(process.env.SLACK_POOL_SIZE),
  path: require.resolve('./bot')
});

const server = new _koack.Server({
  pool,
  scopes: process.env.SLACK_SCOPE.split(','),
  slackClient: {
    clientID: process.env.SLACK_CLIENTID,
    clientSecret: process.env.SLACK_CLIENTSECRET
  },
  storage: (0, _memory2.default)()
});

server.listen({ port: Number(process.env.PORT) || 3000 });
//# sourceMappingURL=pool.js.map