import mongoose from "mongoose";
export function connect(){
    mongoose.connect(process.env.MONGO_URL!,{
        tls:true,
    })
    .then(()=>console.log("Database Connected sucessfully!"))
    .catch((err)=>console.log("Hey there is some error",err));
    
}