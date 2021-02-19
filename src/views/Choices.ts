export default class Choices {
    public static getPrefix = (index: number) => {
        const choice = process.env.CHOICE_PREFIX;
        if (choice === "NUMBER") {
            return Choices.number(index) + ") ";
        } else if (choice === "LETTER") {
            return Choices.letter(index) + ") ";
        }
    };

    public static getIndex = (input: string) => {
        const choice = process.env.CHOICE_PREFIX;

        if (choice === "NUMBER") {
            return +input - 1;
        } else if (choice === "LETTER") {
            return input.charCodeAt(0) - 97;
        }
    }

    public static number = (index: number): string => {
        return (index + 1).toString();
    }

    public static letter = (index: number): string => {
        return String.fromCharCode(97 + index);
    }
}
