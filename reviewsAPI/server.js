import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/reviews", reviews);

//Handle error
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

export default app;
