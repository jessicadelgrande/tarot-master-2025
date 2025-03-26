import React, { createContext, useEffect, useRef, useState, ReactNode } from "react";
import { SavedReading, saveReading as saveTarotReading } from "../../services/tarotService";

interface SavedReadingsObj {
	[key: string]: SavedReading;
}

interface UserContextType {
	user: string;
	setUser: (value: string) => void;
	userId: string;
	setUserId: (value: string) => void;
	savedReadings: SavedReadingsObj;
	setSavedReadings: (value: SavedReadingsObj) => void;
	readingsFeed: boolean;
	setReadingsFeed: (value: boolean) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [user, setUser] = useState<string>("");
	const [userId, setUserId] = useState<string>("");

	const defaultSavedReadingsObj: SavedReadingsObj = {
		"1": {
			id: "1",
			date: "2023-01-01",
			cards: [],
			notes: "Example reading"
		}
	};

	const [savedReadings, setSavedReadings] = useState<SavedReadingsObj>(defaultSavedReadingsObj);
	const [readingsFeed, setReadingsFeed] = useState<boolean>(false);

	const firstUpdate = useRef(true);

	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
		// Save readings to local storage whenever they change
		Object.values(savedReadings).forEach(reading => {
			saveTarotReading(reading);
		});
	}, [savedReadings]);

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				userId,
				setUserId,
				savedReadings,
				setSavedReadings,
				readingsFeed,
				setReadingsFeed,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
