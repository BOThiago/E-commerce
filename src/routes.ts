require("dotenv").config();

const SIGNIN_ROUTE = process.env.SIGNIN_ROUTE;
export const signinRoutes = require(`${SIGNIN_ROUTE}`);

const REGISTER_ROUTE = process.env.REGISTER_ROUTE;
export const registerRoutes = require(`${REGISTER_ROUTE}`);

const HOME_ROUTE = process.env.HOME_ROUTE;
export const homeRoutes = require(`${HOME_ROUTE}`);

const PROD_ROUTE = process.env.PROD_ROUTE;
export const prodRoutes = require(`${PROD_ROUTE}`);
