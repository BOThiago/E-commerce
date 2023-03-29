require("dotenv").config();

export function getPort(): any {
    const port = process.env.PORTenv;
    return port;
}
