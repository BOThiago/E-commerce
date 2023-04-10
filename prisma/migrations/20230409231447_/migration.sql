/*
  Warnings:

  - You are about to drop the `estoque` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produtos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "estoque" DROP CONSTRAINT "estoque_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "permissoes" DROP CONSTRAINT "permissoes_permissoes_id_fkey";

-- DropTable
DROP TABLE "estoque";

-- DropTable
DROP TABLE "permissoes";

-- DropTable
DROP TABLE "produtos";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "Cliente" (
    "cliente_id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("cliente_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "change_password" BOOLEAN DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Permissoes" (
    "permissao_id" SERIAL NOT NULL,
    "descricao_da_permissao" TEXT NOT NULL,

    CONSTRAINT "Permissoes_pkey" PRIMARY KEY ("permissao_id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "produto_id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "quantidade_estoque" INTEGER NOT NULL,
    "categoria_id" INTEGER NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("produto_id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "categoria_id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("categoria_id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "pedido_id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "data_pedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("pedido_id")
);

-- CreateTable
CREATE TABLE "Item_Pedido" (
    "item_pedido_id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Item_Pedido_pkey" PRIMARY KEY ("item_pedido_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Permissoes" ADD CONSTRAINT "Permissoes_permissao_id_fkey" FOREIGN KEY ("permissao_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("categoria_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_Pedido" ADD CONSTRAINT "Item_Pedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "Pedido"("pedido_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_Pedido" ADD CONSTRAINT "Item_Pedido_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("produto_id") ON DELETE RESTRICT ON UPDATE CASCADE;
