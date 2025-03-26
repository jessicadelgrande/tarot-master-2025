export interface SignInContextType {
  signedIn: boolean;
  setSignedIn: (signedIn: boolean) => void;
  googleProfile: {
    givenName: string;
    imageUrl: string;
  };
  setGoogleProfile: (profile: { givenName: string; imageUrl: string }) => void;
}

export interface CardContextType {
  flipped: boolean;
  setFlipped: (flipped: boolean) => void;
}

export interface UserContextType {
  readingsFeed: boolean;
  setReadingsFeed: (readingsFeed: boolean) => void;
} 