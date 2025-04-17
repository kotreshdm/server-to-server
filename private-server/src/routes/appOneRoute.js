import express from 'express';

const router = express.Router();

router.get('/data1', (req, res) => {
    console.log('Received data for app1/data1:', req.body);
    res.json({ message: 'response from app1/data1' });
    }
)

export default router;