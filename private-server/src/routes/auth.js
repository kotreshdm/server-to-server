import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import applications from '../config/applications.js';
dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

router.post('/token', (req, res) => {
  const { appId, appSecret } = req.body;
  const application = applications[appId];
  if (!application || application.secret !== appSecret) {
    return res.status(403).json({ error: 'Invalid client credentials' });
  }
  const payload = {
    appId,
    permissions: application.allowedEndpoints
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  res.json({ token });
});

export default router;
