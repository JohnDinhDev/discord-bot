import { generateLineBreaks } from "../utils";
export default class Text {
    public static pinnedMessage = () => {
        const message = [
            "run `!ht play` to start a game session",
            "run `!ht help` to list all available commands",
        ];

        return [
            "Welcome to HellTowerRPG",
            generateLineBreaks(message, false, 2),
        ];
    };
}
