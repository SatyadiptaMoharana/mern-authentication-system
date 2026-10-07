import "dotenv/config";
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';
// dotenv.config();
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";

const app = express();
let port = process.env.PORT || 6700;
await connectDB();  

//you can have multiple frontend urls in this
const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

//API ENDPOINTS
app.get('/', (req, res) => res.send("This is the Server :)"))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)


app.listen(port, () => console.log(`Server is running at localhost:${port}`))