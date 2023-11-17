-- AlterTable
ALTER TABLE "expence" ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "income" ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expence" ADD CONSTRAINT "expence_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
