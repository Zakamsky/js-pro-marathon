import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';

import sprites from '../config/sprites';
import levelCfg from '../config/world.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, { cfg, });

    this.engine = this.createEngine();
    this.world = this.createWorld();
    this.initEngine();
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagID));
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      /* eslint-disable */
      this.engine.on('render', (_, time) => {
        /* eslint-enable */
        this.world.init();
      });
      this.engine.start();
    });
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
      // console.log('Game INIT!');
    }
  }
}

export default ClientGame;
