import { connect } from "@/database/mongo.config";
import { loginSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { User } from "@/model/User";

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
    const validator = vine.compile(loginSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    const user=await User.findOne({email:output.email})
    if(user){
       const checkPassword=bcrypt.compareSync(output.password!,user.password);
       if(checkPassword){
        return res.json({status:200,
            message:"User Logged in"
        });
       }
       return res.json({status:400,
        message:"Please Check your Credentials"
    });
    }

    return res.json({
        status:400,
        errors:{
          email:"No Account was found with this email"
        }
    });

} catch(error){
    if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
}
}