import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sequencerSecret = request.headers.get('x-sequencer-secret');
  if (request.nextUrl.pathname.startsWith('/api/notes') && !sequencerSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/notes/:path*',
};