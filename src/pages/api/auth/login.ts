import { connect } from "@/database/mongo.config";
import { loginSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from "bcrypt";
import { User } from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connect();

    const body = req.body;
    console.log('Request body:', body);

    const validator = vine.compile(loginSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);
    console.log('Validation output:', output);

    const user = await User.findOne({ email: output.email });
    if (user) {
      const checkPassword = bcrypt.compareSync(output.password!, user.password);
      if (checkPassword) {
        return res.status(200).json({ status: 200, message: "User Logged in" });
      }
      return res.status(400).json({ status: 400, message: "Please Check your Credentials" });
    }

    return res.status(400).json({ status: 400, errors: { email: "No Account was found with this email" } });

  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({ errors: error.messages });
    } else {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
