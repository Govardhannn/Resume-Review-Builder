import express from "express"
import route from "./routes/user.router.js";

import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes 
app.use('/api/v1', route)


export default app;