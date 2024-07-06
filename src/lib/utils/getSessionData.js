// import { User } from "@/lib/models/userModel";
import { connectToDB } from "@/lib/utils";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export const GetSession = async() =>{
  const loggedInData = await getServerSession(authOptions)

  if(!loggedInData){
    return null;
  }

  return loggedInData
}