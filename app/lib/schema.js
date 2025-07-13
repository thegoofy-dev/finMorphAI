import { z } from "zod";

export const accountScehma = z.object({
    name: z.string().min(1, "Name is required"),
    type: z.enum(["CURRENT", "SAVINGS"], {
        required_error: "Account type is required",
    }),
    balance: z.coerce.number().nonnegative("Balance must be a positive number"),
    isDefault: z.boolean().default(false),
});
