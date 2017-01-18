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
    }, 3000);
  });

  process.on('exit', code => {
    daemonWebserver.stop();
    daemonTwitter.stop();
  });
});
