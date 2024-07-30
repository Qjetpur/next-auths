import mongoose,{Schema} from "mongoose";
const userSchema=new Schema({
    name:{
        required:[true,"Full Name field is required"],
        type:Schema.Types.String,
    },
    email:{
        required:[true,"Email field is required"],
        type:Schema.Types.String,
        unique:true,
        trim:true
    },
    phone_no:{
        required:[true,"Phone no is required"],
        type:Schema.Types.String,

    },
    dob:{
        required:[true,"Date Of Birth is required"],
        type:Schema.Types.String,

    },
    password:{
        required:[true,"Password field is required"],
        type:Schema.Types.String,

    }

});

export const User = mongoose.models.User ||mongoose.model("User",userSchema);