import express from "express"
import route from "./routes/user.router.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Routes 
app.use('/api/v1', route)


export default app;