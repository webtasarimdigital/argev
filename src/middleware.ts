import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    // Admin authentication check (protect all /admin pages except /admin/login)
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
      const adminSession = request.cookies.get('argev_admin_session')?.value;
      if (!adminSession) {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    }

    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  } catch (error) {
    // Fail open safely — never crash entire website with 500
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)",
  ],
};
