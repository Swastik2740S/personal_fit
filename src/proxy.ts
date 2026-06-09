import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute    = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)", "/api/webhooks(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // Unauthenticated on a protected route → sign-in
  if (!userId && !isPublicRoute(req)) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Always let the onboarding page through (prevents infinite redirect loop)
  if (isOnboardingRoute(req)) return NextResponse.next();

  // Authenticated but onboarding not finished → redirect to onboarding
  // Skip API routes — they handle their own auth; redirecting a POST would cause 405
  const isApiRoute = req.nextUrl.pathname.startsWith("/api/");
  
  // Fast-path: Check cookie bypass to avoid stale JWT redirect loops.
  // We check BOTH the Clerk session claim and our own user-specific cookie.
  const onboardedCookie = req.cookies.get(`sf_onboarded_${userId}`);
  const hasOnboarded     = onboardedCookie?.value === "true" || !!sessionClaims?.metadata?.onboardingComplete;

  if (userId && !hasOnboarded && !isApiRoute) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
