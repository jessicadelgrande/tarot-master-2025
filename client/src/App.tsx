import React, { useContext, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useTransition, animated } from "@react-spring/web";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styled, { keyframes } from "styled-components";
import GlobalStyle from "./components/GlobalStyles";
import SignInButton from "./components/SignInButton";
import SignOutButton from "./components/SignOutButton";
import Home from "./components/Home";
import Profile from "./components/Profile";
import mysticalEyes from "./assets/mystical-eyes.jpg";
import EyeOpen from "./assets/eye-open.png";
import EyeClosed from "./assets/eye-closed.png";
import { SignInContext } from "./components/context/SignInContext";
import { CardContext } from "./components/context/CardContext";
import { UserContext } from "./components/context/UserContext";
////

const App: React.FC = () => {
	const signInContext = useContext(SignInContext);
	const cardContext = useContext(CardContext);
	const userContext = useContext(UserContext);
	const [question, setQuestion] = useState<string>("");
	const location = useLocation();

	if (!signInContext || !cardContext || !userContext) {
		return <div>Loading...</div>;
	}

	const { signedIn, googleProfile } = signInContext;
	const { setFlipped } = cardContext;
	const { setReadingsFeed } = userContext;

	const onReturnHome = () => {
		setFlipped(false);
		setQuestion("");
	};

	const onProfileView = () => {
		setReadingsFeed(true);
	};

	const transitions = useTransition(location, {
		from: { opacity: 0, transform: "translate(100%, 0)" },
		enter: { opacity: 1, transform: "translate(0%, 0)" },
		leave: { opacity: 0, transform: "translate(-50%, 0)" },
	});

	return (
		<>
			<GlobalStyle />
			<Wrapper>
				<Header>
					{location.pathname === "/profile" && (
						<HomeIcon to="/" onClick={onReturnHome}></HomeIcon>
					)}
					{!signedIn ? (
						<SignInButton />
					) : (
						<>
							{location.pathname === "/" && (
								<ProfileButton to="/profile" onClick={onProfileView}>
									<Avatar
										alt={`avatar for ${googleProfile.givenName}`}
										src={googleProfile.imageUrl}
									/>
								</ProfileButton>
							)}
							<SignOutButton setQuestion={setQuestion} />
						</>
					)}
					<StyledTippy
						content={<span style={{ color: "white" }}>About me</span>}
						placement="bottom"
					>
						<EyeWrapper href="https://jessicadelgrande.com" target="_blank">
							<EyeOpenDiv></EyeOpenDiv>
							<EyeClosedDiv></EyeClosedDiv>
						</EyeWrapper>
					</StyledTippy>
				</Header>
				{transitions((props, item) => (
					<TransitionWrapper style={props}>
						<Routes location={item}>
							<Route path="/" element={<Home question={question} setQuestion={setQuestion} />} />
							<Route path="/profile" element={<Profile />} />
						</Routes>
					</TransitionWrapper>
				))}
				<Footer></Footer>
			</Wrapper>
		</>
	);
};

export default App;

const Wrapper = styled.div`
	padding: 32px;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const StyledTippy = styled(Tippy)`
	color: white;
	background: var(--accent-dark);
	padding: 2px 8px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const blinkOpen = keyframes`
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  27% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

const blinkClosed = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  27% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

const EyeWrapper = styled.a`
	position: relative;
	display: flex;
	justify-content: center;
	height: 40px;
	width: 100px;
	text-decoration: none;
`;

export const EyeDiv = styled.div`
	position: absolute;
	top: 0;
	height: 40px;
	width: 40px;
	background-size: 40px;
	background-repeat: no-repeat;
	background-position: center;
`;

const EyeOpenDiv = styled(EyeDiv)`
	background-image: url(${EyeOpen});
	opacity: 0;
	animation: ${blinkOpen} 6s normal forwards steps(1, end) infinite;
`;

const EyeClosedDiv = styled(EyeDiv)`
	background-image: url(${EyeClosed});
	opacity: 1;
	animation: ${blinkClosed} 6s normal forwards steps(1, end) infinite;
`;

const TransitionWrapper = styled(animated.div)`
	position: absolute;
	top: 120px;
	width: calc(100% - 64px);
`;

const HomeIcon = styled(Link)`
	height: 40px;
	width: 30px;
	border: 1px solid var(--accent-dark);
	border-radius: 4px;
	margin-right: 16px;
	background-image: url(${mysticalEyes});
	background-size: contain;
	box-shadow: var(--accent-dark) 5px 5px 0 0;
	transition: 0.2s ease;
	&:hover {
		box-shadow: var(--accent-dark) 0 0 0 0;
	}
`;

const ProfileButton = styled(Link)`
	height: 40px;
	width: 40px;
	border: 1px solid var(--accent-dark);
	border-radius: 50%;
	overflow: hidden;
	box-shadow: var(--accent-dark) 5px 5px 0 0;
	transition: 0.2s ease;
	&:hover {
		box-shadow: var(--accent-dark) 0 0 0 0;
	}
`;

const Avatar = styled.img`
	height: 40px;
	width: 40px;
`;

const Footer = styled.footer`
	display: flex;
	justify-content: center;
	margin-top: auto;
	min-height: 80px;
`;
