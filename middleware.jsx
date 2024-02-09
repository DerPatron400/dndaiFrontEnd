import { NextResponse } from "next/server";

export default function middleware(req) {
  const url = req.nextUrl.clone(); // Clone the NextUrl object to manipulate
  const clientLogin = req.cookies.get("uid");

  // Paths that do not require authentication
  const publicPaths = ['/login', '/register', '/'];

  // Check if the current path is a public path
  const isPublicPath = publicPaths.some(path => url.pathname.startsWith(path));

  // Redirect logic for unauthenticated users trying to access protected routes
  if (!clientLogin && !isPublicPath) {
    url.pathname = '/'; // Redirect to home
    return NextResponse.redirect(url);
  }

  // Redirect logic for authenticated users trying to access login or register
  if (clientLogin && (url.pathname.includes("/login") || url.pathname.includes("/register"))) {
    url.pathname = '/'; // Redirect to home
    return NextResponse.redirect(url);
  }

  // Proceed with the request for all other cases
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude specific paths from the middleware
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|public|images|models|fonts|Audio|Logo|env|privacy|cookies|faq|imprint|instructions|terms|shop).*)",
  ],
};