export interface Msg {
    //[key: string]: any
    author: {
        bot: boolean;
        id: string;
    };
    content: string;
    reply: (content: string | EmbedInput) => void;
    channel: {
        id: string;
        type: string;
        send: (text: string | EmbedInput) => void;
    };
}

export interface Choice {
    text: string;
    callback: Function;
}

export interface EmbedInput {
    embed: Keyable;
}

export interface Keyable {
    [key: string]: any;
}

export interface Models {
    [model: string]: (sequelize: any, Sequelize: any) => Promise<any>;
}

export interface PlayerData {
    id: string;
    level: number;
    experience: number;
}

export interface OnlinePlayer {
    method: string;
    input: string;
}
