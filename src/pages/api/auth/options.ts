import {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions:AuthOptions = {
    providers:[
        CredentialsProvider({
            name:"Next Auth",
            credentials:{
                email:{
                    label:"Email",
                    type:"email",
                    placeholder:"Enter your email"
                },
                password:{
                    label:"password",type:"password"
                }
            },
            async authorize(credentials,req){
                const user = { id: "1", name: "J Smith", email: credentials?.email }

      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null
      }
            }
        })
    ]
}