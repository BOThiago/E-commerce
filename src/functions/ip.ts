require("dotenv").config();

export function getIP(): any {
    const IP = process.env.IPenv;
    return IP;
}
