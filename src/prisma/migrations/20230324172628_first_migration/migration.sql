-- CreateTable
CREATE TABLE "registro" (
    "id" SERIAL NOT NULL,
    "Nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" BIGINT NOT NULL,
    "Endereco" TEXT NOT NULL,
    "Numero" INTEGER NOT NULL,
    "Bairro" TEXT NOT NULL,
    "Cidade" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "change_password" BOOLEAN DEFAULT true,

    CONSTRAINT "registro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissoes" (
    "id" SERIAL NOT NULL,
    "permissoes_id" INTEGER NOT NULL,
    "descricao_da_permissao" TEXT NOT NULL,

    CONSTRAINT "permissoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "nome_prod" TEXT NOT NULL,
    "desc_prod" TEXT NOT NULL,
    "qtd_embalagem" INTEGER NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoque" (
    "id" SERIAL NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "qtd_estoque" INTEGER NOT NULL,

    CONSTRAINT "estoque_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "permissoes" ADD CONSTRAINT "permissoes_permissoes_id_fkey" FOREIGN KEY ("permissoes_id") REFERENCES "registro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque" ADD CONSTRAINT "estoque_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
