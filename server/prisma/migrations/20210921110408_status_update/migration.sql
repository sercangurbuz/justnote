/*
  Warnings:

  - You are about to drop the column `done` on the `Note` table. All the data in the column will be lost.
  - Added the required column `status` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NoteStatus" AS ENUM ('DONE', 'PENDING');

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "done",
ADD COLUMN     "status" "NoteStatus" NOT NULL;
