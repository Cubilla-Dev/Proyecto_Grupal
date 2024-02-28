'use server'
import { NextResponse } from 'next/server'


export async function middleware(request) {
    console.log("INTERCEPTED", request.nextUrl.pathname);
    // Obtiene el token de usuario de las cookies
    const userToken = request.cookies.get('userToken');
    const info=request.cookies.get('info')
    const response = NextResponse.next();
    if (userToken) {
        response.cookies.set("userToken", userToken?.value);
        response.cookies.set("info", info?.value);
    }
    else {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return response;

}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|register|passwordReset).*)'],
}