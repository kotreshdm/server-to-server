import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

export default function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const clientId = decoded.appId;
    const allowedEndpoints = decoded.permissions || [];

    
    console.log('Verifying token...',allowedEndpoints,req.path);
    if (!allowedEndpoints.includes(req.path)) {
        return res.status(403).json('Access denied to this endpoint');
    }
    req.client = { clientId, allowedEndpoints };
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};