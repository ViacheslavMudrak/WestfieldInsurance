import middleware from 'lib/middleware';
import { resourceItemResolver } from 'lib/resource-item-resolver';
import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';
import { smallcaseurl } from './smallcase-url';

// eslint-disable-next-line
export default async function (req: NextRequest, ev: NextFetchEvent) {
  // if of type Resource Item based on its path, then calculate rewrite
  const resolver = new resourceItemResolver();
  if (resolver.isResourceItem(req.nextUrl.pathname)) {
    const path = resolver.getResourcePath(req.nextUrl.pathname);
    return NextResponse.rewrite(new URL(path, req.url));
  }

  // Apply the existing middleware
  await middleware(req, ev);

  // Apply the smallcaseurl middleware to handle URL case-insensitivity.
  return smallcaseurl(req);
}

export const config = {
  /*
   * Match all paths except for:
   * 1. /api routes
   * 2. /_next (Next.js internals)
   * 3. /sitecore/api (Sitecore API routes)
   * 4. /- (Sitecore media)
   * 5. all root files inside /public (e.g. /favicon.ico)
   * 6. FE sample pages under /cuts
   */
  matcher: ['/', '/((?!api/|_next/|sitecore/api/|-/|[\\w-]+\\.\\w+|cuts).*)'],
};
