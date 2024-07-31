import { connect } from "@/database/mongo.config";
import { registerSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from "bcrypt";
import { User } from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    connect();

    const body = req.body; // req.body is already parsed by Next.js
    const validator = vine.compile(registerSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    // Check if email already exists
    const user = await User.findOne({ email: output.email });
    if (user) {
      return res.status(400).json({
        errors: {
          email: "Email is already taken. Please use another email",
        },
      });
    } else {
      // Encrypt the password
      const salt = bcrypt.genSaltSync(10);
      output.password = bcrypt.hashSync(output.password, salt);
      await User.create(output);
      return res.status(200).json({ message: "User created successfully" });
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({ errors: error.messages });
    } else {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
