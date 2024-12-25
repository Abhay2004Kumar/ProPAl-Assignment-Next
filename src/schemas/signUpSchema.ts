import {z} from 'zod'

export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast two characters")
    .max(20,"Username must be less than 20 chars")
    .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special characters")

export const signUpSchema = z.object({
username: usernameValidation,
email: z.string().email({message: 'Invalid email address'}),
password: z.string().min(8, {message: "Password must be atleast 8 chars"})
})