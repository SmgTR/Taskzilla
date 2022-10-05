/*
  Warnings:

  - You are about to drop the column `users` on the `Workspace` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "users",
ADD COLUMN     "members" TEXT[];

-- CreateTable
CREATE TABLE "WorkspaceMember" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "member" TEXT,
    "workspace" TEXT NOT NULL,

    CONSTRAINT "WorkspaceMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_member_fkey" FOREIGN KEY ("member") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
