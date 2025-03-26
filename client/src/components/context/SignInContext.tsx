import React, { createContext, useState, ReactNode } from "react";

interface GoogleProfile {
	givenName: string;
	imageUrl: string;
	email: string;
}

interface SignInContextType {
	signedIn: boolean;
	setSignedIn: (value: boolean) => void;
	googleProfile: GoogleProfile;
	setGoogleProfile: (profile: GoogleProfile) => void;
}

export const SignInContext = createContext<SignInContextType | null>(null);

interface SignInProviderProps {
	children: ReactNode;
}

export const SignInProvider: React.FC<SignInProviderProps> = ({ children }) => {
	const [signedIn, setSignedIn] = useState<boolean>(false);
	const [googleProfile, setGoogleProfile] = useState<GoogleProfile>({
		givenName: "",
		imageUrl: "",
		email: ""
	});

	return (
		<SignInContext.Provider
			value={{ signedIn, setSignedIn, googleProfile, setGoogleProfile }}
		>
			{children}
		</SignInContext.Provider>
	);
};
