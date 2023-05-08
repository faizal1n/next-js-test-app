import jwt from 'jsonwebtoken';

export function generateAccessToken(email, fullName, userId) {
  return jwt.sign(
    { fullName: fullName, email: email, userId: userId },
    process.env.SECRET_TOKEN,
    {
      expiresIn: '1h',
    }
  );
}

export function generateRefreshToken(email, fullName, userId) {
  return jwt.sign(
    { fullName: fullName, email: email, userId: userId },
    process.env.SECRET_RTOKEN,
    {
      expiresIn: '30d',
    }
  );
}

export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    return decoded;
  } catch (err) {
    throw err
  }
}
