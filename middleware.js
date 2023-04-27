import NextCors from 'nextjs-cors';
import { NextResponse } from 'next/server';
// import DB from '@/models/index.js';
// import { QueryTypes } from 'sequelize';


// This function can be marked `async` if using `await` inside
// const legacyPrefixes = ["/api/:path*"]

export async function middleware(request) {

  if (request.method=='OPTIONS') {
    // Respond with JSON indicating an error message
    return new NextResponse(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*'
        }
      }
    )
  }






  const response = NextResponse.next({
    request: {
      // New request headers
      headers: new Headers(request.headers),
    },
  });


  response.headers.set('Access-Control-Allow-Origin', '*');

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}
