"use server"

import { signIn } from "next-auth/react";

export const login = async (prevState, formData) =>{

    const { email, password } = Object.fromEntries(formData);

    try {
        
        console.log(email, password);

        await signIn("credentials",{ email, password });


    } catch (err) {
        console.log(err)
    }

}