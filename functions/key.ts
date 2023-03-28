require("dotenv").config();

export function getSecretKey(): any {
    const KEYSECRET = process.env.KEYSECRET;

    if (!KEYSECRET) {
        throw new Error("Chave secreta não definida na variável de ambiente!");
    }
    return KEYSECRET;
}
