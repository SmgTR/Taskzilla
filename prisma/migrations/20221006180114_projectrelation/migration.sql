/*
  Warnings:

  - You are about to drop the column `projectsId` on the `Workspace` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "projectsId",
ADD COLUMN     "projectId" TEXT[];
