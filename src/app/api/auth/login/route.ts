import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    console.log('Login API endpoint called');
    
    const body = await request.json();
    const { username, password } = body;
    
    console.log('Login attempt for username:', username);

    const expectedUsername = process.env.AUTH_USERNAME;
    const expectedPassword = process.env.AUTH_PASSWORD;

    if (!expectedUsername || !expectedPassword) {
      console.error('Missing environment variables for authentication');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (username === expectedUsername && password === expectedPassword) {
      console.log('Authentication successful');
      
      const cookieStore = await cookies();
      
      // Set the auth token cookie
      cookieStore.set("auth-token", "authenticated", { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      
      // Verify cookie was set
      const verifyCookie = cookieStore.get('auth-token');
      console.log('Cookie verification after setting:', verifyCookie?.name, verifyCookie?.value);

      return NextResponse.json({ 
        success: true, 
        message: 'Authentication successful',
        redirect: '/home'
      });

    } else {
      console.log('Authentication failed: invalid credentials');
      return NextResponse.json(
        { success: false, message: 'Invalid username or password.' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
