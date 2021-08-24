import PositionedObject from '../common/PositionedObject';
import ClientGameObject from './ClientGameObject';
import ClientPlayer from './ClientPlayer';

class ClientCell extends PositionedObject {
    constructor(cfg) {
        super();
        const {cellWidth, cellHeight} = cfg.world;

        Object.assign(
            this,
            {
                cfg,
                objects: [],
                x: cellWidth * cfg.cellCol,
                y: cellWidth * cfg.cellRow,
                width: cellWidth,
                height: cellHeight,
                col: cfg.cellCol,
                row: cfg.cellRow,
                objectClasses: {
                    player: ClientPlayer,
                },
            },
            cfg,
        );

        this.initGameObjects();
    }

    initGameObjects() {
        const {cellCfg, objectClasses} = this;

        this.objects = cellCfg.map((layer, layerId) =>
            layer.map((objCfg) => {
                let ObjectClass;

                if (objCfg.class) {
                    ObjectClass = objectClasses[objCfg.class];
                } else {
                    ObjectClass = ClientGameObject;
                }

                return new ObjectClass({
                    cell: this,
                    objCfg,
                    layerId,
                    playerName: this.world.game.cfg?.playerName,
                });
            }),
        );
    }

    render(time, layerId) {
        const {objects} = this;

        if (objects[layerId]) {
            objects[layerId].forEach((obj) => obj.render(time));
        }
    }

    addGameObject(objToAdd) {
        const {objects} = this;

        if (objToAdd.layerId === undefined) {
            objToAdd.layerId = objects.length;
        }

        if (!objects[objToAdd.layerId]) {
            objects[objToAdd.layerId] = [];
        }

        objects[objToAdd.layerId].push(objToAdd);
    }

    removeGameObject(objToRemove) {
        const {objects} = this;
        objects.forEach((layer, layerId) => (objects[layerId] = layer.filter((obj) => obj !== objToRemove)));
    }

    findObjectsByType(type) {
        let foundObjects = [];

        this.objects.forEach((layer) => (foundObjects = [...foundObjects, ...layer].filter((obj) => obj.type === type)));

        return foundObjects;
    }
}

export default ClientCell;
