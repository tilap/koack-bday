import { RTM_EVENTS } from 'koack/src/bot';
import type { Bot } from 'koack/src/bot';
import messageRouter from 'koack/src/message-router';

const loggerMiddleware = ({ event }) => console.log(event);

export default (bot: Bot) => {
  bot.on(
    RTM_EVENTS.CHANNEL_JOINED,
    loggerMiddleware,
    (ctx) => console.log(ctx),
    async (ctx) => Promise.resolve(console.log(ctx)),
  );

  bot.on(
    RTM_EVENTS.MESSAGE,
    messageRouter([
      {
        regexp: /hello/,
        handler: (ctx) => {
          ctx.startConversation(async (say, waitResponse) => {
            say('What is your first name ?');
            const firstName = await waitResponse();
            say('And your last name ?');
            const lastName = await waitResponse();
            say(`Hello ${firstName} ${lastName}`);
          });
        },
      },
      {
        handler: (ctx) => ctx.reply('Sorry, I didn\'t understood you'),
      },
    ]),
  );
};
