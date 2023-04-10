import express from "express";
import { prisma } from "../functions/client";

const router = express.Router();
const JSONbig = require("json-bigint");

router.use(express.urlencoded({ extended: true }));

router.use(express.json());

router.post("/", async (req, res) => {
    try {
        req.headers;

        const { nome_prod, desc_prod, qtd_embalagem, qtd_estoque } = req.body;

        if (!nome_prod || !desc_prod || !qtd_embalagem || !qtd_estoque) {
            return res.json({
                message: "Parâmetros de produtos não definidos!",
            });
        }

        const createProd = await prisma.produtos.create({
            data: {
                nome_prod: nome_prod,
                desc_prod: desc_prod,
                qtd_embalagem: parseInt(qtd_embalagem),
                qtd_estoque: {
                    create: {
                        qtd_estoque: parseInt(qtd_estoque),
                    },
                },
            },
            select: {
                id: true,
            },
        });

        const verifyProd = await prisma.produtos.findUnique({
            where: {
                id: createProd.id,
            },
        });

        return res
            .send(
                JSONbig.stringify({
                    message: "Produto cadastrado com sucesso!",
                    product_id: Number(JSON.stringify(verifyProd?.id)),
                })
            )
            .status(200);
    } catch {
        return res.status(500).send(
            JSONbig.stringify({
                message: "Não foi possível cadastrar um produto!",
            })
        );
    }
});

module.exports = router;
