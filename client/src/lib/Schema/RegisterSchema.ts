import z from "zod";

export const RegisterSchema=z.object(
    {
        email:z.string().email(),
        displayName: z.string().min(1,{message:"DisplayName is required"}),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),

    }
)
export type RegisterSchema=z.infer<typeof RegisterSchema>