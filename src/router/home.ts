import express from "express";
import JSONbig from "json-bigint";

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(express.json());

router.get("/", async (req, res) => {
    req.headers;

    try {
        return res.json({ message: "Logado com sucesso!" }).status(200);
    } catch (error) {
        return res.status(500).send(
            JSONbig.stringify({
                message: "Não foi possível criar o usuário!",
            })
        );
    }
});

module.exports = router;
