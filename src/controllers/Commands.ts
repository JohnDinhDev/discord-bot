// Definitions
import { Msg, Keyable } from "../definitions/interfaces";

// Views
import Message from "../views/Message";
import Embed from "../views/Embed";

export default class Commands {
    // TODO: make env type for prefix, and make tests for empty env config
    private readonly prefix: string = process.env.PREFIX!;
    private args: Array<string>;
    private command: string | undefined;
    private msg: Message;

    constructor(msg: Msg) {
        // Set properties
        this.msg = new Message(msg);

        // Parses message content for a command and arguments
        this.args = msg.content.slice(this.prefix.length).trim().split(" ");
        this.command = this.args.shift()?.toLowerCase();

        if (!msg.content.startsWith(this.prefix) || !this.command) return;

        // Run method if input command exists, else run help
        if (this.command in this) {
            (this as Keyable)[this.command]();
        } else {
            this.help();
        }
    }

    private help = async (): Promise<void> => {
        // If user input command is invalid
        if ((this.command || "") in this === false) {
            this.msg.reply(
                "`" + this.command + "`" + " is not a valid command"
            );
        }

        // Generate help embed
        const embed = Embed.help();

        // Send embed message
        this.msg.send(embed);
    };
}
