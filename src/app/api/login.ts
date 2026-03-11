// // pages/api/login.js
// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     const { username, password } = req.body;

//     // Retrieve credentials from environment variables
//     const expectedUsername = process.env.AUTH_USERNAME;
//     const expectedPassword = process.env.AUTH_PASSWORD;

//     if (username === expectedUsername && password === expectedPassword) {
//       // Handle success (e.g., create a session cookie)
//       res.status(200).json({ success: true, message: 'Authentication successful' });
//     } else {
//       res.status(401).json({ success: false, message: 'Invalid credentials.' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
