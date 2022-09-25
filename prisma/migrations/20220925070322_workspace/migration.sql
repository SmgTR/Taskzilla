-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "users" TEXT[],
    "name" TEXT NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
