import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

interface TarotCard {
  cardNum: number;
  name: string;
  description: string;
  image: string;
}

interface Reading {
  id: string;
  userId: string;
  cards: TarotCard[];
  notes: string;
  date: string;
}

interface ApiResponse<T = any> {
  status: number;
  message: string;
  data?: T;
}

const tarotDataPath = path.join(__dirname, "data", "tarot.json");

// GET: retrieves card image and description from tarot.json
const getCard = (req: Request<{ randomNum: string }>, res: Response<ApiResponse<TarotCard>>) => {
  console.log(req.params);
  const randomNum = parseInt(req.params.randomNum, 10);
  fs.readFile(tarotDataPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
    const cards = JSON.parse(data) as TarotCard[];
    const card = cards.find(card => card.cardNum === randomNum);
    if (card) {
      res.status(200).json({ status: 200, message: `card ${randomNum} found`, data: card });
    } else {
      res.status(404).json({ status: 404, message: `card ${randomNum} not found` });
    }
  });
};

// POST: adds current reading to tarot.json
const addReading = (req: Request, res: Response<ApiResponse>) => {
  // Implement addReading logic using tarot.json
  res.status(501).json({ status: 501, message: "Not Implemented" });
};

// GET: retrieves readings belonging to current user from tarot.json
const getReadings = (req: Request<{ user: string }>, res: Response<ApiResponse<Reading[]>>) => {
  // Implement getReadings logic using tarot.json
  res.status(501).json({ status: 501, message: "Not Implemented" });
};

// PATCH: deletes the reading selected by the user
const deleteReading = (req: Request<{ user: string; readingId: string }>, res: Response<ApiResponse>) => {
  // Implement deleteReading logic using tarot.json
  res.status(501).json({ status: 501, message: "Not Implemented" });
};

export {
  getCard,
  addReading,
  getReadings,
  deleteReading,
  TarotCard,
  Reading,
  ApiResponse
}; 