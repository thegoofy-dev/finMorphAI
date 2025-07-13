"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";

const serializeTransaction = (obj) => {
    const serialized = { ...obj };
    if (obj.balance && typeof obj.balance.toNumber === 'function') {
        serialized.balance = obj.balance.toNumber();
    }
    if (obj.amount && typeof obj.amount.toNumber === 'function') {
        serialized.amount = obj.amount.toNumber();
    }
    return serialized;
};

export async function createAccount(data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user) throw new Error("User not found");

        // Convert balance to float before saving
        const balanceFloat = parseFloat(data.balance);
        if (isNaN(balanceFloat)) throw new Error("Invalid balance amount");

        const existingAccounts = await db.account.findMany({
            where: { userId: user.id },
        });

        // If this is the first account, make it default regardless of data.isDefault
        const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault;

        if (shouldBeDefault) {
            await db.account.updateMany({
                where: { userId: user.id, isDefault: true },
                data: { isDefault: false },
            });
        }

        const account = await db.account.create({
            data: {
                ...data,
                balance: balanceFloat,
                userId: user.id,
                isDefault: shouldBeDefault
            }
        });

        const serializedAccount = serializeTransaction(account);

        revalidatePath("/dashboard");

        return { success: true, data: serializedAccount };
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getUserAccounts() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const accounts = await db.account.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { transactions: true } } }
    });

    // Serialize each account
    const serializedAccounts = accounts.map(serializeTransaction);

    return { success: true, data: serializedAccounts };
}