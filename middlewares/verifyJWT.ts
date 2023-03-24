import jwt from "jsonwebtoken";
import { getSecretKey } from "../functions/key";

export function verifyJWT(req: any, res: any, next: any) {
    const token = req.headers["x-access-token"];
    const tokenString = Array.isArray(token) ? token.join(",") : token || "";

    jwt.verify(tokenString, getSecretKey(), (err: any, decoded: any) => {
        if (err) return res.status(401).end();

        req.userID = decoded.userID;
        next();
    });
}
