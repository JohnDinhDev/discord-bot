import { Msg, EmbedInput } from "../definitions/interfaces";
export default class Message {
    public channelId: string;
    public userId: string;

    constructor(private msg: Msg) {
        this.channelId = msg.channel.id;
        this.userId = msg.author.id;
    }

    public send = (message: string | EmbedInput): void => {
        this.msg.channel.send(message);
    };

    public sendBlock = (message: string): void => {
        this.msg.channel.send("```" + message + "```");
    };

    public sendSingleBlock = (message: string): void => {
        this.msg.channel.send("`" + message + "`");
    };

    public reply = (message: string | EmbedInput): void => {
        this.msg.reply(message);
    };
}

