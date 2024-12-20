import getDB from "@/util/mongodb";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"


export default NextAuth({
    session:{jwt:true},
    providers:[
        CredentialsProvider({
            name:"credentials",
            
            // credentials:{
            //     name:{},
            //     email:{},
            //     password:{},

            // },

            async authorize(credentials){
        
                const db=await getDB();

                const user=await db.collection('users').findOne({email:credentials.email})

                if(!user){
                    throw new Error("No user found with this email");
                }

                const checkPassword=await bcrypt.compare(credentials.password,user.password);
                if(!checkPassword){
                    throw new Error("Invalid credentials");
                }

                // const { password: _, ...userWithoutPassword } = user;
                // return userWithoutPassword;

                return {id:user._id}
            }


        })

        
    ],

    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id; 
          }
          return token;
        },
        
        async session({ session, token }) {
          session.user.id = token.id;  // Add the user ID to the session object
          return session;
        }
    },

    // session:{
    //     strategy:"jwt"
    // }
      


})