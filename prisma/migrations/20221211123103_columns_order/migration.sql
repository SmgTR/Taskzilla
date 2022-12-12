-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "order" DROP NOT NULL;
