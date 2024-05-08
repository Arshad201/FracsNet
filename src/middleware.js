import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware ( request ){

    const token = await getToken({req:request});
    const url = request.nextUrl;


    if(token &&
    (
        url.pathname.startsWith('/login') ||
        url.pathname.startsWith('/register')
    )
    ){
         return NextResponse.redirect(new URL('/', request.url));
    }

    if(!token &&
        (
            url.pathname.startsWith('/')
        )
        ){
             return NextResponse.redirect(new URL('/login', request.url));
        }


        return NextResponse.next();

}

export const config = {
    matcher: [
        // "/login",
        "/sign-up",
        "/",
    ]
}