import React, { useContext, useEffect } from "react";
import { useSpring, animated, to } from "@react-spring/web";
import { useDrag } from '@use-gesture/react';
import styled, { keyframes } from "styled-components";
import CardDetail from "./CardDetail";
import { CardContext } from "./context/CardContext";
import { SignInContext } from "./context/SignInContext";
import mysticalEyesDark from "../assets/mystical-eyes-dark.jpg";

// for card hover effect
const calcX = (y: number, ly: number): number => -(y - ly - window.innerHeight / 2) / 20;
const calcY = (x: number, lx: number): number => (x - lx - window.innerWidth / 2) / 20;

interface CardProps {
	onGetCard: () => void;
	domTarget: React.RefObject<HTMLDivElement>;
	question: string;
	setQuestion: (question: string) => void;
}

const Card: React.FC<CardProps> = (props) => {
	const { onGetCard, domTarget, question, setQuestion } = props;
	const context = useContext(CardContext);
	const { flipped = false, cardData = null, setFlipped } = context || {};
	const { signedIn = false } = useContext(SignInContext) || {};

	const { transform, opacity } = useSpring({
		opacity: flipped ? 1 : 0,
		transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
		config: { mass: 5, tension: 300, friction: 100 },
	});

	useEffect(() => {
		const preventDefault = (e: Event) => e.preventDefault();
		document.addEventListener("gesturestart", preventDefault);
		document.addEventListener("gesturechange", preventDefault);
		return () => {
			document.removeEventListener("gesturestart", preventDefault);
			document.removeEventListener("gesturechange", preventDefault);
		};
	}, []);

	const handleCardClick = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!question.trim() || flipped) return;
		onGetCard();
	};

	const isDisabled = !question.trim() || flipped;

	return (
		<>
			<CardContainer
				disabled={isDisabled}
				onClick={handleCardClick}
				style={{ 
					cursor: isDisabled ? 'not-allowed' : 'pointer'
				}}
			>
				<CardFrame 
					ref={domTarget}
					style={{
						transform: transform as unknown as string
					}}
				>
					<CardBack style={{ opacity: opacity.to(o => 1 - o) as unknown as number }}></CardBack>
					{cardData?.cardImage ? (
						<>
							<CardFront
								src={cardData.cardImage}
								style={{
									opacity: opacity.to(o => o) as unknown as number,
									transform: 'rotateX(180deg)'
								}}
							/>
						</>
					) : (
						<>
							<CardFront
								src={mysticalEyesDark}
								style={{
									opacity: opacity.to(o => o) as unknown as number,
									transform: 'rotateX(180deg)'
								}}
							/>
							{flipped && (
								<CardUnavailableMessage>
									Reply hazy, please try again.
								</CardUnavailableMessage>
							)}
						</>
					)}
				</CardFrame>
			</CardContainer>
			<CardDetail question={question} setQuestion={setQuestion} />
			{!signedIn && (
				<SignInPrompt>
					Sign in at the top of the page to save your reading.
				</SignInPrompt>
			)}
		</>
	);
};

const CardContainer = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 48px;
	width: 350px;
	height: 550px;
	border: none;
	background-color: transparent;
	padding: 0;
	perspective: 600px;
	transform-style: preserve-3d;
	will-change: transform, opacity;
	&:disabled {
		cursor: not-allowed;
		& * {
			cursor: not-allowed;
		}
	}
`;

const CardFrame = styled(animated.div)`
	position: relative;
	width: 320px;
	height: 515px;
	border-radius: 5px;
	box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
	transition: box-shadow 0.9s;
	border: 10px solid white;
	overflow: hidden;
	touch-action: none;
	transform-style: preserve-3d;
	&:hover {
		box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
	}
`;

const CardBack = styled(animated.div)`
	background-image: url(${mysticalEyesDark});
	filter: invert(1);
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	position: absolute;
	max-width: 320px;
	max-height: 515px;
	width: 320px;
	height: 515px;
	backface-visibility: hidden;
	will-change: opacity;
`;

const CardFront = styled(animated.img)`
	max-width: 300px;
	max-height: 515px;
	width: 300px;
	height: 515px;
	transform: rotateX(180deg);
	backface-visibility: ${props => props.style?.transform === 'rotateX(180deg)' ? 'visible' : 'hidden'};
	will-change: opacity;
`;

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;

const CardUnavailableMessage = styled.p`
	max-width: 200px;
	font-size: 3rem;
	font-weight: 600;
	color: #000;
	position: absolute;
	top: 159px;
	left: 51px;
	animation: ${fadeIn} 2s ease-in-out;
	transform: rotateX(180deg);
	background-color: #fff;
	border-radius: 40%;
	padding: 24px 8px;
	box-shadow: 0 0 16px 24px #fff;
`;

const SignInPrompt = styled.p`
	margin: 64px auto;
	font-size: 1.5rem;
	font-style: italic;
`;

export default Card;