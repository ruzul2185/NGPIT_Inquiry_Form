import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export function verifySupabaseToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const jwtSecret = process.env.SUPABASE_JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ error: 'JWT secret not configured' });
      return;
    }
    const decoded = jwt.verify(token, jwtSecret);
    // req.user = decoded; // use this if you want to access user information in the controller
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
    return;
  }
}
