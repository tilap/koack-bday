'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _bot = require('koack/bot');

var _messageRouter = require('koack/message-router');

var _messageRouter2 = _interopRequireDefault(_messageRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const loggerMiddleware = ({ event }) => console.log(event);

exports.default = function bot(bot) {
  _assert(bot, _bot.Bot, 'bot');

  bot.on(_bot.RTM_EVENTS.CHANNEL_JOINED, loggerMiddleware, ctx => console.log(ctx), (() => {
    var _ref = _asyncToGenerator(function* (ctx) {
      return Promise.resolve(console.log(ctx));
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })());

  bot.on(_bot.RTM_EVENTS.MESSAGE, (0, _messageRouter2.default)([{
    regexp: /hello/,
    handler: ctx => {
      ctx.startConversation((() => {
        var _ref2 = _asyncToGenerator(function* (say, waitResponse) {
          say('What is your first name ?');
          const firstName = yield waitResponse();
          say('And your last name ?');
          const lastName = yield waitResponse();
          say(`Hello ${firstName} ${lastName}`);
        });

        return function (_x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      })());
    }
  }, {
    handler: ctx => ctx.reply('Sorry, I didn\'t understood you')
  }]));
};

function _assert(x, type, name) {
  if (false) {
    _tcombForked2.default.fail = function (message) {
      console.warn(message);
    };
  }

  if (_tcombForked2.default.isType(type) && type.meta.kind !== 'struct') {
    if (!type.is(x)) {
      type(x, [name + ': ' + _tcombForked2.default.getTypeName(type)]);
    }
  } else if (!(x instanceof type)) {
    _tcombForked2.default.fail('Invalid value ' + _tcombForked2.default.stringify(x) + ' supplied to ' + name + ' (expected a ' + _tcombForked2.default.getTypeName(type) + ')');
  }

  return x;
}
//# sourceMappingURL=bot.js.map