const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least of 6 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
});

// Creating an object schema
const signupSchema = loginSchema.extend({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at lest of 3 chars. " })
    .max(255, { message: "Name must not be more than 255 characters" }),
    
    darpan: z
    .string({ required_error: "Darpan Id is required" })
    .trim()
    .min(3, { message: "Darpan must be at lest of 3 chars. " })
    .max(255, { message: "Darpan must not be more than 255 characters" }),

    city: z
    .string({ required_error: "City is required" })
    .trim()
    .min(1, { message: "City must be at lest of 1 chars. " })
    .max(255, { message: "City must not be more than 255 characters" }),

    phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least of 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" }),
});

module.exports = { signupSchema, loginSchema };