import express from "express";
import { prisma } from "../functions/client";
import bcryptjs from "bcryptjs";

const router = express.Router();
const JSONbig = require("json-bigint");

router.use(express.urlencoded({ extended: true }));

router.use(express.json());

router.post("/", async (req, res) => {
    try {
        const {
            nome,
            email,
            telefone,
            endereco,
            numero,
            bairro,
            cidade,
            password,
        } = req.body;

        if (
            !nome ||
            !email ||
            !telefone ||
            !endereco ||
            !numero ||
            !bairro ||
            !cidade ||
            !password
        ) {
            return res.json({
                message: "Parâmetros de registros não definidos!",
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const register = await prisma.registro.create({
            data: {
                nome: nome,
                email: email,
                telefone: telefone,
                endereco: endereco,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                password: hashedPassword,
            },
        });

        const user = await prisma.registro.findMany({
            where: {
                email: email,
            },
        });

        if (user.length < 1) {
            return res
                .json({ message: "Não foi possível cadastrar o usuário!" })
                .status(432);
        }

        const verifyEmail = await prisma.registro.findMany({
            where: {
                email: email,
            },
        });

        if (verifyEmail.length > 1) {
            return res
                .send(JSONbig.stringify({ message: "E-mail já cadastrado!" }))
                .status(432);
        }

        return res
            .send(
                JSONbig.stringify({
                    message: "Usuário cadastrado com sucesso!",
                    user: user,
                })
            )
            .status(432);
    } catch (err) {
        console.log(err);
        return res.status(500).send(
            JSONbig.stringify({
                message: "Não foi possível criar o usuário!",
            })
        );
    }
});

module.exports = router;
