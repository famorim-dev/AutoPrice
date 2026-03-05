-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "PAPEL_CATEGORIA";

-- CreateTable
CREATE TABLE "PAPEL_CATEGORIA"."con" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cod" TEXT NOT NULL,

    CONSTRAINT "con_pkey" PRIMARY KEY ("id")
);
