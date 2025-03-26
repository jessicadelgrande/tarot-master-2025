import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import { SignInProvider } from "./components/context/SignInContext";
import { UserProvider } from "./components/context/UserContext";
import { CardProvider } from "./components/context/CardContext";

const container = document.getElementById("root");
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<SignInProvider>
				<UserProvider>
					<CardProvider>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</CardProvider>
				</UserProvider>
			</SignInProvider>
		</GoogleOAuthProvider>
	</React.StrictMode>
);
