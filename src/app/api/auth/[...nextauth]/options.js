import { User } from "@/lib/models/userModel";
import { connectToDB } from "@/lib/utils";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";



export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          }),
        LinkedInProvider({
        clientId: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        }),
        CredentialsProvider({
            async authorize(credentials, req) {

                connectToDB();

                try {

                    
                    const user = await User.findOne({

                        //Filter data from a single value
                        email: credentials.email
                    }).select("+password")

                    //Throw Error if user is not found with this Email
                    if(!user){
                         throw new Error("Invalid Credentials");
                    }

                    //Check the given password is correct or not 
                    const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
                    
                    if(isCorrectPassword){
                        return user;
                    }else{
                         throw new Error("Invalid Credentials");
                    }


                } catch (err) {
                    throw new Error(err);

                }

            }
        })
    ],
    callbacks:{

        async signIn({ user, account }){


            return true

        },
        async jwt({token, user}){

            if(user){
                token._id = user._id?.toString()
                token.user = user
            }

            return token; 

        },
        async session({session, token}){


            if(token){
                session.user._id = token._id?.toString()
                delete token.user.password
                session = token.user
            }

            return session;
        }
    },
    pages:{
        signIn: '/sign-in',
        signUp: '/sign-up',
    },
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}