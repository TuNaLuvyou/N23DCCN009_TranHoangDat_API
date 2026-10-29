import { PrismaClient } from "@prisma/client";
import { env } from "../config/env.config.js";

/**
 * Dùng chung một PrismaClient trong toàn bộ ứng dụng.
 * Khi chạy dev với nodemon, giữ instance trên globalThis để tránh
 * tạo quá nhiều connection pool mỗi lần reload.
 */
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.__bthdvPrisma ??
  new PrismaClient({
    log: env.isProduction ? ["error"] : ["warn", "error"],
  });

if (!env.isProduction) {
  globalForPrisma.__bthdvPrisma = prisma;
}
