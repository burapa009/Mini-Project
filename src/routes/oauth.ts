import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    // ตรวจสอบ username และ password
    const accessToken = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(200).json({
      access_token: accessToken,
      refresh_token: refreshToken
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/refresh', async (req, res) => {
  try {
    const { refresh_token } = req.body;
    const user = jwt.verify(refresh_token, JWT_SECRET);
    const accessToken = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(200).json({
      access_token: accessToken,
      refresh_token: refreshToken
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 