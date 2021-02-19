import Player from "./Player";
import OnlinePlayers from "./OnlinePlayers";
import AllowedChannels from "./AllowedChannels";
import { Models, Keyable } from "../definitions/interfaces";

const models: Models = {
    Player,
    OnlinePlayers,
    AllowedChannels,
};

export default (sequelize: any, Sequelize: any) => {
    const modelsExport = {};

    for (let model in models) {
        (modelsExport as Keyable)[model] = models[model](sequelize, Sequelize);
    }

    return modelsExport;
};
