import express from "express";
import { prisma } from "../functions/client";
import JSONbig from "json-bigint";

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.json());

router.get("/", async (_req, res) => {
    const findProducts = await prisma.produto.findMany({
        select: {
            nome: true,
            descricao: true,
            preco: true,
            quantidade_estoque: true,
            categoria: true,
        },
    });

    if (findProducts.length < 1) {
        return res.json({ message: "Nenhum produto cadastrado!" }).status(432);
    }

    return res.json({ select: findProducts }).status(200);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const findProducts = await prisma.produto.findMany({
        where: {
            produto_id: Number(id),
        },
        select: {
            nome: true,
            descricao: true,
            preco: true,
            quantidade_estoque: true,
            categoria: true,
        },
    });

    if (findProducts.length < 1) {
        return res.json({ message: "Produto não encontrado!" }).status(432);
    }

    return res.json({ select: findProducts }).status(200);
});

router.post("/", async (req, res) => {
    try {
        req.headers;

        const {
            nome_prod,
            desc_prod,
            preco,
            qtd_estoque,
            categoria,
            categoria_id,
        } = req.body;

        if (
            !nome_prod ||
            !desc_prod ||
            !preco ||
            !qtd_estoque ||
            !categoria ||
            !categoria_id
        ) {
            return res.json({
                message: "Parâmetros de produtos não definidos!",
            });
        }

        const createProd = await prisma.produto.create({
            data: {
                nome: nome_prod,
                descricao: desc_prod,
                preco: parseFloat(preco),
                quantidade_estoque: Number(qtd_estoque),
                categoria: {
                    connectOrCreate: {
                        where: {
                            categoria_id: Number(categoria_id),
                        },
                        create: {
                            nome: categoria,
                        },
                    },
                },
            },
            select: {
                produto_id: true,
            },
        });

        const verifyProd = await prisma.produto.findUnique({
            where: {
                produto_id: createProd.produto_id,
            },
        });

        return res
            .send(
                JSONbig.stringify({
                    message: "Produto cadastrado com sucesso!",
                    product_id: Number(JSON.stringify(verifyProd?.produto_id)),
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
