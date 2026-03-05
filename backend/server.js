import "dotenv/config"
import app from "./src/app.js"
const port = process.env.PORT || 8090;


const connectionString = async () =>{


    app.listen(port , ()=>{
        console.log(`Server is running on port ${port}`)
    })


}

connectionString();