import generateAlphabet from "./generateAlphabet";

export default (): string => {
    const characters: string = [...generateAlphabet(true), ...generateAlphabet(false)].join("");
    let username: string = "";

    for (let i = 0; i < 8; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return username;
}