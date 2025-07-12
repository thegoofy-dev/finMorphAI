import { PrismaClient } from "@prisma/client"

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
}

// globalThis.prisma : This global variable ensures that the Prisma  client instance is reused accross hot reloads during devleopment.
// Without this, each time your application reloads, a new instance of the Prisma Client would be created, potentially leading to connection issues.