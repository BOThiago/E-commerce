/*
  Warnings:

  - You are about to drop the column `Bairro` on the `registro` table. All the data in the column will be lost.
  - You are about to drop the column `Cidade` on the `registro` table. All the data in the column will be lost.
  - You are about to drop the column `Endereco` on the `registro` table. All the data in the column will be lost.
  - You are about to drop the column `Nome` on the `registro` table. All the data in the column will be lost.
  - You are about to drop the column `Numero` on the `registro` table. All the data in the column will be lost.
  - Added the required column `bairro` to the `registro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `registro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `registro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `registro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `registro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registro" DROP COLUMN "Bairro",
DROP COLUMN "Cidade",
DROP COLUMN "Endereco",
DROP COLUMN "Nome",
DROP COLUMN "Numero",
ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "endereco" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "numero" INTEGER NOT NULL;
