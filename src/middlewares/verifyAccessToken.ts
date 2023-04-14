import { getAccessToken } from "../functions/key";

export function verifyAccessToken(req: any, res: any, next: any) {
    const token = req.headers["x-access-token"];

    if (token != getAccessToken()) {
        return res.status(401).end();
    }

    res.locals.checked = true;
    next();
}
