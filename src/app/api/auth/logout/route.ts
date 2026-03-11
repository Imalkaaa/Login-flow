import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    console.log('Logout API endpoint called');
    
    const cookieStore = await cookies();
    cookieStore.delete("auth-token");
    
    console.log('Logout successful - auth token cookie deleted');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Logout successful',
      redirect: '/'
    });

  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { success: false, message: 'Logout failed' },
      { status: 500 }
    );
  }
}
