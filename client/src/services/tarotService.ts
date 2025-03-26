import tarotData from '../data/tarot.json';

export interface TarotCard {
  cardNum: number;
  name: string;
  description: string;
  image: string;
  cardName?: string;  // Alias for name
  cardImage?: string; // Alias for image
}

export interface SavedReading {
  id: string;
  date: string;
  cards: TarotCard[];
  notes: string;
}

const STORAGE_KEY = 'tarot_readings';

export const getCard = (randomNum: number): TarotCard | undefined => {
  const cards = tarotData.cards;
  const card = cards.find(card => card.cardNum === String(randomNum));
  if (!card) return undefined;
  
  return {
    cardNum: parseInt(card.cardNum),
    name: card.cardName || '',
    description: card.description,
    image: card.cardImage || '',
    cardName: card.cardName,
    cardImage: card.cardImage
  };
};

export const saveReading = (reading: SavedReading): void => {
  const savedReadings = getSavedReadings();
  savedReadings[reading.id] = reading;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedReadings));
};

export const getSavedReadings = (): { [key: string]: SavedReading } => {
  const savedReadings = localStorage.getItem(STORAGE_KEY);
  return savedReadings ? JSON.parse(savedReadings) : {};
};

export const deleteReading = (readingId: string): void => {
  const savedReadings = getSavedReadings();
  delete savedReadings[readingId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedReadings));
}; 