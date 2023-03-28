/*
  Warnings:

  - You are about to drop the `registro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "permissoes" DROP CONSTRAINT "permissoes_permissoes_id_fkey";

-- DropTable
DROP TABLE "registro";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "change_password" BOOLEAN DEFAULT true,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_nome_key" ON "user"("nome");

-- AddForeignKey
ALTER TABLE "permissoes" ADD CONSTRAINT "permissoes_permissoes_id_fkey" FOREIGN KEY ("permissoes_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
