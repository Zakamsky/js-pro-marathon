import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';

import sprites from '../config/sprites';
import levelCfg from '../config/world.json';
import gameObjects from '../config/gameObjects.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects,
      player: null,
    });

    this.engine = this.createEngine();
    this.world = this.createWorld();
    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagID));
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.world.init();
      this.engine.on('render', (_, time) => {
        this.world.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => {
        if (keydown) {
          this.player.moveByCellCoord(-1, 0, (cell) => {
            const isGrass = cell.findObjectsByType('grass').length;
            return cell.x > 0 ? isGrass : false;
          });
        }
      },
      ArrowRight: (keydown) => {
        if (keydown) {
          this.player.moveByCellCoord(1, 0, (cell) => {
            const isGrass = cell.findObjectsByType('grass').length;
            return cell.x < this.engine.camera.width ? isGrass : false;
          });
        }
      },
      ArrowUp: (keydown) => {
        if (keydown) {
          this.player.moveByCellCoord(0, -1, (cell) => {
            const isGrass = cell.findObjectsByType('grass').length;
            return cell.y > 0 ? isGrass : false;
          });
        }
      },
      ArrowDown: (keydown) => {
        if (keydown) {
          this.player.moveByCellCoord(0, 1, (cell) => {
            const isGrass = cell.findObjectsByType('grass').length;
            return cell.y < this.engine.camera.height ? isGrass : false;
          });
        }
      },
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
