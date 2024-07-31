import mongoose from "mongoose";
export function connect() {
  mongoose
    .connect("mongodb+srv://youtube:ab12345@cluster0.da756wk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {})
    .then(() => console.log("Database Connected sucessfully!"))
    .catch((err) => console.log("Hey there is some error", err));
}
