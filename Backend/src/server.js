import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import connectDb from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies to be sent with requests
}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes );
app.use('/api/users', userRoutes );
app.use('/api/chat', chatRoutes);

if(process.env.NODE_ENV === 'production') {
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, '../Frontend/dist')));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT} `);
    connectDb();
});