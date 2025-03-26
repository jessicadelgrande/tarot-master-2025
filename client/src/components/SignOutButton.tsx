import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { SignInContext } from "./context/SignInContext";
import { CardContext } from "./context/CardContext";
import styled from "styled-components";
import { GoogleButton } from "./GlobalStyles";
import { FcGoogle } from "react-icons/fc";

interface SignOutButtonProps {
	setQuestion: (question: string) => void;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ setQuestion }) => {
	const { setSignedIn } = useContext(SignInContext) ?? { setSignedIn: () => {} };
	const { setFlipped } = useContext(CardContext) ?? { setFlipped: () => {} };
	const navigate = useNavigate();

	const handleSignOut = () => {
		googleLogout();
		setSignedIn(false);
		setFlipped(false);
		setQuestion("");
		localStorage.clear();
		navigate("/");
	};

	return (
		<Button onClick={handleSignOut}>
			<FcGoogle />
			sign out
		</Button>
	);
};

export default SignOutButton;

const Button = styled(GoogleButton)``;
