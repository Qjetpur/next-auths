import {connect} from "@/database/mongo.config"
import { NextRequest,NextResponse } from "next/server";
import { loginSchema } from "@/validator/authSchema";
import vine,{errors} from "@vinejs/vine"
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from 'bcrypt'
import {User} from "@/model/User"

// For DB Connection
connect();

export default async function POST(request:NextRequest){
    try {
        const body=await request.json();
        const validator = vine.compile(loginSchema);
        validator.errorReporter = () => new ErrorReporter();
        const output = await validator.validate(body);
        return NextResponse.json(output)
        
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({status:400,errors:error.messages},{status:200});
          }
    }
}