import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the interface for the JWT payload
interface JwtPayload {
  username: string;
  id: number;
}

// Middleware function to authenticate JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  
  // Check if the authorization header is present
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract JWT
  const secretKey = process.env.JWT_SECRET_KEY || '';

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.user = decoded; // ✅ Ensure req.user is set before calling next()
    return next(); // ✅ Only proceed if token verification succeeds
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
