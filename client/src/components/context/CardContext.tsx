import React, { createContext, useEffect, useRef, useState, ReactNode } from "react";
import { TarotCard, getCard } from "../../services/tarotService";

interface CardContextType {
	flipped: boolean;
	setFlipped: (value: boolean) => void;
	randomNum: number | null;
	setRandomNum: (value: number | null) => void;
	cardData: TarotCard | null;
	setCardData: (value: TarotCard | null) => void;
}

export const CardContext = createContext<CardContextType | null>(null);

interface CardProviderProps {
	children: ReactNode;
}

export const CardProvider: React.FC<CardProviderProps> = ({ children }) => {
	const [flipped, setFlipped] = useState<boolean>(false);
	const [randomNum, setRandomNum] = useState<number | null>(null);
	const [cardData, setCardData] = useState<TarotCard | null>(null);

	const firstUpdate = useRef(true);
	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
		if (randomNum !== null) {
			const card = getCard(randomNum);
			if (card) {
				setCardData(card);
			}
		}
	}, [randomNum]);

	return (
		<CardContext.Provider
			value={{
				cardData,
				setCardData,
				flipped,
				setFlipped,
				randomNum,
				setRandomNum,
			}}
		>
			{children}
		</CardContext.Provider>
	);
};
