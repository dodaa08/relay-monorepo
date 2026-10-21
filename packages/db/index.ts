import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from "dotenv";
import path from "path";
import "dotenv/config";

config({ path: path.resolve(__dirname, ".env") });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
    connectionString : connectionString
});

export const prisma = new PrismaClient({adapter});  