import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth-token');
    console.log('Auth check - cookie store keys:', Array.from(cookieStore.getAll()).map(c => c.name));
    console.log('Auth check - auth token found:', authToken?.name, authToken?.value);
    
    if (authToken?.value === 'authenticated') {
      console.log('Auth check successful - user is authenticated');
      return NextResponse.json({ authenticated: true });
    } else {
      console.log('Auth check failed - token not found or invalid');
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
