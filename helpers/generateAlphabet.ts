function generateAlphabet(isLowercase: boolean = true): Array<string> {
    const alphabet: Array<string> = [];
    const start: number = isLowercase ? 97 : 65;
    const end: number = isLowercase ? 122 : 90;
    for (let i = start; i <= end; i++) {
        alphabet.push(String.fromCharCode(i));
    }
    return alphabet;
}

export default generateAlphabet;