import { z } from 'zod'
export const SignUpSchema = z
    .object({
        email: z.string().email({ message: "Invalid email." }),
        password: z.string().min(5, "Minimum of 5 characters."),
        confirmPassword: z.string().min(5, "Minimum of 5 characters.")
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password doesn\'t match.',
        path: ['confirmPassword']
    })


export const SignInSchema = z
    .object({
        email: z.string().email({ message: "Invalid email." }),
        password: z.string().min(1, "Enter your password."),
    })