require("dotenv").config();

const SIGNIN_ROUTE = process.env.SIGNIN_ROUTE;
export const signinRoutes = require(`${SIGNIN_ROUTE}`);

const REGISTER_ROUTE = process.env.REGISTER_ROUTE;
export const registerRoutes = require(`${REGISTER_ROUTE}`);
