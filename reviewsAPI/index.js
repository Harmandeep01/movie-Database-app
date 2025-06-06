import dotenv from 'dotenv'
dotenv.config()
import mongodb from "mongodb";
import app from "./server.js";
import ReviewsDAO from "./dao/ReviewsDAO.js";
const mongoClient = mongodb.MongoClient;
const uri = process.env.MONGO_URI
const port = process.env.PORT || 8000;

mongoClient
  .connect(uri, {
    maxPoolSize: 50,
    timeoutMS: 2500,
  })
  .then(async client => {
    await ReviewsDAO.InjectDB(client)
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
