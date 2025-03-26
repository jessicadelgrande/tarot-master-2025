import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { getCard, addReading, getReadings, deleteReading } from './handlers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(cors({ origin: "https://ask-the-tarot.netlify.app" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Routes
app.get("/getCard/:randomNum", cors(), getCard);
app.post("/users/:user", addReading);
app.get("/users/:user", getReadings);
app.patch("/users/:user/:readingId", deleteReading);

// 404 handler
app.get("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 