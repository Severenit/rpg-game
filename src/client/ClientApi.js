import { io } from 'socket.io-client';

class ClientApi {
  constructor(cfg) {
    Object.assign(this, {
      ...cfg,
      game: cfg.game,
    });
  }

  connect() {
    const { url, path } = this;

    this.io = io(url, {
      path
    });

    this.io.on('welcome', this.onWelcome);
    this.io.on('join', this.onJoin.bind(this));
  }

  onWelcome(serverStatus) {
    console.log('Server is online ', serverStatus);
  }

  onJoin(player) {
    this.game.createCurrentPlayer(player.player);
    console.log('JOINED A GAME!', player);
  }

  join(playerName) {
    this.io.emit('join', playerName);
  }
}

export default ClientApi;
