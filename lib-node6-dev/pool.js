'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _koack = require('koack');

var _mongo = require('koack/storages/mongo');

var _mongo2 = _interopRequireDefault(_mongo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

['SLACK_CLIENTID', 'SLACK_CLIENTSECRET', 'SLACK_POOL_SIZE', 'SLACK_SCOPE', 'MONGO'].map(envVar => (0, _assert2.default)(process.env[envVar], `Missing env configuration ${envVar}`));

_asyncToGenerator(function* () {
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
    storage: yield (0, _mongo2.default)(process.env.MONGO)
  });

  server.listen({ port: Number(process.env.PORT) || 3000 });

  const close = (() => {
    var _ref2 = _asyncToGenerator(function* () {
      yield server.stop();
      process.exit(0);
    });

    return function close() {
      return _ref2.apply(this, arguments);
    };
  })();
  process.on('SIGINT', close);
  process.on('SIGTERM', close);
})();
//# sourceMappingURL=pool.js.map