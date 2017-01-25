const pobBabelLogger = require('pob-babel/lib/logger');
pobBabelLogger.configure(pobBabelLogger.levels.INFO);

const pobBabel = require('pob-babel');
pobBabel.registerPlugin(require('pob-babel/plugins/yml-to-json'));
const nodeDaemon = require('springbokjs-daemon').node;

pobBabel.watch().then(emitter => {
  const daemonBot = nodeDaemon(['--es_staging', './index']);
  daemonBot.start();

  let _restartTimeout;
  emitter.on('changed', () => {
    if (_restartTimeout) clearTimeout(_restartTimeout);
    _restartTimeout = setTimeout(() => {
      daemonBot.restart();
    }, 300);
  });

  const close = async () => {
    await daemonBot.stop();
    process.exit(0);
  };
  process.on('SIGINT', close);
  process.on('SIGTERM', close);
});
