import { verifyToken } from "@/lib/jwt.js";

// Only requests with empty authorization header or valid JWT token are allowed to proceed
export default async function middleware(request, response, nextHandler) {
  const authHeader = request.headers['authorization'] || '';
  if (authHeader==null || authHeader.split(' ').length<2) {
    return await nextHandler();
  }

  const authToken = authHeader.split(' ')[1];
  const decoded = await verifyToken(authToken);

  request.user = decoded;

  await nextHandler();
}

