import "dotenv/config";
import app from "./src/app.js";
import dbConnection from "./src/config/db.js";

const port = process.env.PORT || 8090;

const startServer = async () => {

   try {

      await dbConnection();

      app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
      });

   } catch (error) {

      console.log("Database connection failed:", error);

   }

};

startServer();