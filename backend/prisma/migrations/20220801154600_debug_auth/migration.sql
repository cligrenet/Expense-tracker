-- CreateEnum
CREATE TYPE "category" AS ENUM ('Bills', 'Business', 'Bank Fees', 'Car', 'Education/Training', 'Entertainment', 'Food/Grocery', 'Gifts', 'House', 'Investments', 'Interest', 'Insurance', 'Kid', 'Legal Fees', 'Medical', 'Online Services', 'Other', 'Pet', 'Phone/Internet', 'Post/Shipping', 'Rental', 'Repairs/Maintenance', 'Restaurant', 'Salary', 'Saving', 'Software', 'Shopping', 'Subscriptions/Memberships', 'Taxes', 'Transport', 'Travel');

-- CreateTable
CREATE TABLE "transactions" (
    "transaction_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "text" VARCHAR(300) NOT NULL,
    "amount" DECIMAL NOT NULL,
    "category" "category" NOT NULL DEFAULT 'Other',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    "is_admin" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;
