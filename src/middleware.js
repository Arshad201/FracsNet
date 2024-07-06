import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(request) {

    const token = await getToken({ req: request });
    const url = request.nextUrl;


    if (token &&
        (
            url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up')
        )
    ) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!token &&
        (
            url.pathname.startsWith('/network') ||
            url.pathname.startsWith('/create') ||
            url.pathname.startsWith('/group') ||
            url.pathname.startsWith('/profile') ||
            url.pathname.startsWith('/search') ||
            url.pathname.startsWith('/notification')
        )
    ) {

        return NextResponse.redirect(new URL('/sign-in', request.url));
    }


    return NextResponse.next();

} 

export const config = {
    matcher: ["/((?!static|.*\\..*|_next).*)", "/api/:path"],
}
