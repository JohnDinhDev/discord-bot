import Choices from "../views/Choices";

export const generateLineBreaks = (
    strArr: Array<string>,
    isChoice: boolean = false,
    numberOfLineBreaks: number = 1
): string => {
    let str = "";
    for (let i = 0; i < strArr.length; i++) {
        const line = strArr[i];
        if (isChoice) {
            str +=
                Choices.getPrefix(i) +
                "`" +
                line +
                "`" +
                generateLineBreak(numberOfLineBreaks);
        } else {
            str += line + generateLineBreak(numberOfLineBreaks);
        }
    }
    return str;
};

const generateLineBreak = (numberOfLineBreaks: number) => {
    let str = "";
    for (let i = 0; i < numberOfLineBreaks; i++) {
        str += "\n";
    }
    return str;
};
