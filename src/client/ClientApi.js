import { io } from 'socket.io-client';

class ClientApi {
    constructor(cfg) {
        Object.assign(this, {
            ...cfg,
            game: cfg.game,
        });
    }

    connect() {
        const {url, path} = this;

        this.io = io(url, {
            path,
        });

        this.io.on('welcome', this.onWelcome);
        this.io.on('join', this.onJoin.bind(this));
        this.io.on('newPlayer', this.onNewPlayer.bind(this));
        this.io.on('playerMove', this.onPlayerMove.bind(this));
        this.io.on('playerDisconnect', this.onPlayerDisconnect.bind(this));
    }

    onWelcome(serverStatus) {
        console.log('Server is online', serverStatus);
    }

    onJoin(player) {
        this.game.createCurrentPlayer(player.player);
        this.game.setPlayers(player.playersList);
        console.log('JOINED A GAME!', player);
    }

    onNewPlayer(player) {
        this.game.createPlayer(player);
    }

    onPlayerMove(moveCfg) {
        const {game} = this;
        const {col, row, id} = moveCfg;
        const player = game.getPlayerById(id);

        if (player) {
            player.moveToCellCoord(col, row);
        }
    }

    onPlayerDisconnect(id) {
        const {game} = this;
        game.removePlayerById(id);
    }

    join(playerName) {
        this.io.emit('join', playerName);
    }

    move(dir) {
        this.io.emit('move', dir);
    }
}

export default ClientApi;
