import express from "express";
import { prisma } from "../functions/client";
import bcryptjs from "bcryptjs";
import { cleanCpf, verifyCpf } from "../functions/validCpf";

const router = express.Router();
import JSONbig from "json-bigint";

router.use(express.urlencoded({ extended: true }));

router.use(express.json());

router.post("/", async (req, res) => {
    try {
        const { nome, cpf, email, password } = req.body;

        if (!nome || !cpf || !email || !password) {
            return res.json({
                message: "Parâmetros de registros não definidos!",
            });
        }

        if (verifyCpf(cpf) == false) {
            return res.json({ message: "CPF inválido!" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = await prisma.user.findMany({
            where: {
                cpf: cleanCpf(cpf),
            },
        });

        if (user.length > 0) {
            return res.json({ message: "CPF já cadastrado!" }).status(432);
        }

        const verifyEmail = await prisma.user.findMany({
            where: {
                email: email,
            },
        });

        if (verifyEmail.length > 0) {
            return res
                .send(JSONbig.stringify({ message: "E-mail já cadastrado!" }))
                .status(432);
        }

        await prisma.user.create({
            data: {
                nome: nome,
                email: email,
                cpf: cleanCpf(cpf),
                password: hashedPassword,
            },
        });

        return res
            .send(
                JSONbig.stringify({
                    message: "Usuário cadastrado com sucesso!",
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
