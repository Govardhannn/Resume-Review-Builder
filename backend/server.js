import "dotenv/config"
import app from "./src/app.js"
import dbConnection from "./src/config/db.js";
const port = process.env.PORT || 8090;


const connectionString = async () =>{

    await dbConnection()

    app.listen(port , ()=>{
        console.log(`Server is running on port ${port}`)
    })


}

connectionString();