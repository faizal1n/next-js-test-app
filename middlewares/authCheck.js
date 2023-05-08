import { verifyToken } from "@/lib/jwt.js";

// Only requests with valid JWT token are allowed to proceed
export default async function middleware(request, response, nextHandler) {
  const authHeader = request.headers['authorization'] || '';
  if (authHeader==null || authHeader.split(' ').length<2) {
    return response.status(401).json(
      {
        'message' : 'Unauthorized',
        'error' : 'Missing request bearer token',
      }
    )
  }

  const authToken = authHeader.split(' ')[1];
  const decoded = await verifyToken(authToken);

  request.user = decoded;

  await nextHandler();
}

