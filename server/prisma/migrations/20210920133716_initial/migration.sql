-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
