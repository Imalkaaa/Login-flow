# Login Application

A secure Next.js authentication system with cookie-based session management.
<video controls src="Screen Recording 2026-03-11 102739.mp4" title="Title"></video>

## Features

- Secure user authentication with username/password
- Cookie-based session management
- Protected routes with authentication checks
- Automatic redirect for authenticated/unauthenticated users
- Responsive design with Tailwind CSS
- Client-side authentication state management

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Custom implementation with HTTP-only cookies
- **State Management**: React hooks (useState, useEffect)

## Project Structure

```
src/app/
├── api/
│   ├── auth/
│   │   ├── check/
│   │   │   └── route.ts          # Authentication check endpoint
│   │   └── logout/
│   │       └── route.ts          # Logout endpoint
│   └── login.ts                  # Login API endpoint
├── action/
│   └── auth.ts                   # Server actions for authentication
├── home/
│   └── page.tsx                  # Protected home page
└── page.tsx                      # Login page
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
AUTH_USERNAME=your_username
AUTH_PASSWORD=your_password
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 
### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-app
```

2. Install dependencies:
```bash
npm install

```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. Run the development server:
```bash
npm run dev

```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Authentication Flow

1. **Login**: Users enter credentials on the login page (`/`)
2. **Verification**: Credentials are validated against environment variables
3. **Session Creation**: Upon successful login, an HTTP-only cookie is set
4. **Protected Access**: Authenticated users can access the home page (`/home`)
5. **Automatic Redirects**:
   - Authenticated users trying to access login page → redirected to `/home`
   - Unauthenticated users trying to access protected pages → redirected to `/`


## API Endpoints

### POST `/api/auth/login`
Authenticates user and sets session cookie.

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful"
}
```

### GET `/api/auth/check`
Checks if user is authenticated.

**Response:**
```json
{
  "authenticated": true
}
```

### POST `/api/auth/logout`
Clears authentication cookie and logs out user.

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}


## Deployment

### Environment Setup

Ensure the following environment variables are set in your hosting environment:

- `AUTH_USERNAME`
- `AUTH_PASSWORD`
- `NODE_ENV=production`

### Build Commands

```bash
npm run build
npm start
```
## License

This project is licensed under the MIT License.
