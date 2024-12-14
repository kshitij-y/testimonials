import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(req: NextRequest) {
  const hasToken = req.cookies.has("token");
  const hasAuth_tokon = req.cookies.has("auth_token");
    if (hasToken || hasAuth_tokon) {
      return NextResponse.next();
    }
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);

}
 
export const config = {
  matcher: ['/dashboard', '/createspaces'],
};