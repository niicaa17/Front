import { z } from "zod"

const registerSchema = z.object({
    nama: z.string().min(1, "Nama harus diisi"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Kata sandi minimal 8 karakter"),
})

export default registerSchema