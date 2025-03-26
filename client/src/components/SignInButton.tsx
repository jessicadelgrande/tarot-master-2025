import React from 'react';
import { useGoogleLogin, TokenResponse } from '@react-oauth/google';
import { useContext } from 'react';
import { SignInContext } from './context/SignInContext';
import { UserContext } from "./context/UserContext";
import styled from "styled-components";
import { GoogleButton } from "./GlobalStyles";
import { FcGoogle } from "react-icons/fc";

const SignInButton: React.FC = () => {
	const signInContext = useContext(SignInContext) ?? { setSignedIn: () => {}, setGoogleProfile: () => {} };
	const { setUser } = useContext(UserContext) ?? { setUser: () => {} };

	const login = useGoogleLogin({
		onSuccess: (response: TokenResponse) => {
			signInContext.setSignedIn(true);
			signInContext.setGoogleProfile({
				...response,
				givenName: '',  // These will be fetched after login
				imageUrl: '',
				email: ''
			});
			// We'll need to make a separate call to get user info
			fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
				headers: { Authorization: `Bearer ${response.access_token}` }
			})
				.then(res => res.json())
				.then(data => {
					signInContext.setGoogleProfile({
						...response,
						givenName: data.given_name,
						imageUrl: data.picture,
						email: data.email
					});
					setUser(data.email);
				});
		},
		onError: () => {
			console.log('Login Failed');
		}
	});

	return (
		<Button onClick={() => login()}>
			<FcGoogle />
			Sign in with Google
		</Button>
	);
};

export default SignInButton;

const Button = styled(GoogleButton)``;
