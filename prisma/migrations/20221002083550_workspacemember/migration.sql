/*
  Warnings:

  - You are about to drop the column `member` on the `WorkspaceMember` table. All the data in the column will be lost.
  - You are about to drop the column `workspace` on the `WorkspaceMember` table. All the data in the column will be lost.
  - Added the required column `workspaceId` to the `WorkspaceMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_member_fkey";

-- DropForeignKey
ALTER TABLE "WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_workspace_fkey";

-- AlterTable
ALTER TABLE "WorkspaceMember" DROP COLUMN "member",
DROP COLUMN "workspace",
ADD COLUMN     "memberId" TEXT,
ADD COLUMN     "workspaceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
