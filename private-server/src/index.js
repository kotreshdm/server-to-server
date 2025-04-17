import express from 'express';
import authRoutes from './routes/auth.js';
import appOneRoutes from './routes/appOneRoute.js';
import verifyToken from './middleware/verifyToken.js';


const app = express();
const allowedIPs = ['127.0.0.1', '192.168.1.100']; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
// app.use((req, res, next) => {
//     let clientIP = req.ip
//     if (clientIP.startsWith('::ffff:')) {
//         clientIP = clientIP.split('::ffff:')[1];
//     }
//     if (allowedIPs.includes(clientIP)) {
//         console.log(`Access granted to IP: ${clientIP}`); // Log the allowed IP for debugging
//         next();
//     } else {
//         res.status(403).send('Access denied: Your IP is not whitelisted.');
//     }
// });

app.use('/api', verifyToken);

app.use('/api/app1', appOneRoutes);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
}
);



