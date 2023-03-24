import express from "express";
import { signinRoutes, registerRoutes } from "./routes";
//import { verifyJWT } from "../middlewares/verifyJWT";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.listen(4335, () => console.log("Server is running in port 4335!"));

app.use("/register", registerRoutes);

app.use("/signin", signinRoutes);
