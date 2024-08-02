import vine from '@vinejs/vine'
export const registerSchema = vine.object({
    name:vine.string().trim().minLength(2).maxLength(30).regex(/^[A-Za-z\s]+$/),
    email:vine.string().email().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    phone_no: vine.string()
    .trim()
    .regex(/^\+?[1-9]\d{1,14}$/),
    dob: vine.date(),
    password:vine.string().minLength(6).maxLength(14).confirmed().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).+$/)
});

export const loginSchema=vine.object({
    email:vine.string().email().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password:vine.string().minLength(6).maxLength(14).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).+$/)
});