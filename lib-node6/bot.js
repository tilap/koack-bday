'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bot = require('koack/bot');

var _messageRouter = require('koack/message-router');

var _messageRouter2 = _interopRequireDefault(_messageRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const loggerMiddleware = ({ event }) => console.log(event);

exports.default = bot => {
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
//# sourceMappingURL=bot.js.map