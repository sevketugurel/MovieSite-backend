import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";
import ReviewsDAO from "./dao/reviewsDAO.js";

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env.REVIEWS_DB_USERNAME;
const mongo_password = process.env.REVIEWS_DB_PASSWORD;
const uri = `mongodb+srv://${mongo_username}:<${mongo_password}>@cluster0.ptecbiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const port = 8000;

MongoClient.connect(
  uri, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
     app.listen(port,()=>{
         console.log(`Listening on port ${port}`)
     })
    })