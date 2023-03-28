import express from "express";
import { prisma } from "../functions/client";
import bcryptjs from "bcryptjs";
import { cleanCpf, verifyCpf } from "../functions/validCpf";
import { getSecretKey } from "../functions/key";

const router = express.Router();
const jwt = require("jsonwebtoken");

router.use(express.urlencoded({ extended: true }));

router.use(express.json());

router.post("/", async (req, res) => {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.json({
                message: "Parâmetros de registros não definidos!",
            });
        }

        if (verifyCpf(login) == false) {
            const verifyEmail = await prisma.user.findMany({
                where: {
                    email: login,
                },
            });

            if (verifyEmail.length < 1) {
                return res
                    .json({ message: "E-mail não cadastrado!" })
                    .status(432);
            }

            const verifyUser = await prisma.user.findMany({
                where: {
                    email: login,
                },
            });

            if (verifyUser.length < 1) {
                return res
                    .json({ message: "Usuário ou senha inválidos!! " })
                    .status(432);
            }

            let getPassword = verifyUser[0].password;

            bcryptjs.compare(password, getPassword, (err, result) => {
                if (err) {
                    console.error(err);
                    return res
                        .json({
                            message: "Algo deu errado!",
                        })
                        .status(432);
                } else if (result) {
                    const token = jwt.sign({ userID: login }, getSecretKey(), {
                        expiresIn: "1h",
                    });
                    return res
                        .json({
                            message: "Usuário autenticado com sucesso!",
                            token: token,
                            userData: verifyUser,
                        })
                        .status(200);
                } else {
                    return res
                        .json({ message: "Usuário ou senha inválidos!! " })
                        .status(432);
                }
            });
        } else {
            const verifyEmail = await prisma.user.findMany({
                where: {
                    cpf: cleanCpf(login),
                },
            });

            if (verifyEmail.length < 1) {
                return res.json({ message: "CPF não cadastrado!" }).status(432);
            }

            const verifyUser = await prisma.user.findMany({
                where: {
                    cpf: cleanCpf(login),
                },
            });

            if (verifyUser.length < 1) {
                return res
                    .json({ message: "Usuário ou senha inválidos!! " })
                    .status(432);
            }

            let getPassword = verifyUser[0].password;

            bcryptjs.compare(password, getPassword, (err, result) => {
                if (err) {
                    console.error(err);
                    return res
                        .json({
                            message: "Algo deu errado!",
                        })
                        .status(432);
                } else if (result) {
                    const token = jwt.sign({ userID: login }, getSecretKey(), {
                        expiresIn: "1h",
                    });
                    return res
                        .json({
                            message: "Usuário autenticado com sucesso!",
                            token: token,
                            userData: verifyUser,
                        })
                        .status(200);
                } else {
                    return res
                        .json({ message: "Usuário ou senha inválidos!! " })
                        .status(432);
                }
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Não foi logar!",
        });
    }
    return;
});

module.exports = router;
