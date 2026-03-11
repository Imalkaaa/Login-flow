'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function authenticate(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');
  console.log('Login attempt:', username);

  const expectedUsername = process.env.AUTH_USERNAME;
  const expectedPassword = process.env.AUTH_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    console.error('Missing environment variables for authentication');
    return { success: false, message: 'Server configuration error' };
  }

  if (username === expectedUsername && password === expectedPassword) {
    console.log('Authentication successful');

    // Function to create the session cookie
    async function createSessionCookie(token: string) {
      console.log('Creating session cookie with token:', token);
      const cookieStore = await cookies();
      
      // Set the cookie with proper options
      cookieStore.set("auth-token", token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      
      // Verify cookie was set
      const verifyCookie = cookieStore.get('auth-token');
      console.log('Cookie verification after setting:', verifyCookie?.name, verifyCookie?.value);
    }

    createSessionCookie('authenticated'); 

    redirect('/home');

  } else {
    console.log('Authentication failed: invalid credentials');
    return { success: false, message: 'Invalid username or password.' };
  }


}
  export async function logout() {
    console.log('Logging out - deleting auth token cookie');
    (await cookies()).delete("auth-token");
  }
