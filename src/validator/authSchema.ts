import vine from '@vinejs/vine'
export const registerSchema=vine.object({
    name:vine.string().trim().minLength(2).maxLength(30)
    .regex(/^[a-zA-Z0-9]+$/),
    email:vine.string().email(),
    phone_no: vine.string()
    .trim()
    .regex(/^\+?[1-9]\d{1,14}$/),
    dob: vine.date().before( Date()),
    password:vine.string().minLength(6).maxLength(14).regex(/^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/).confirmed()
});

export const loginSchema=vine.object({
    email:vine.string().email(),
    password:vine.string().minLength(6).maxLength(14).regex(/^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/)
})