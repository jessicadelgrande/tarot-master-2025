import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Button } from "./GlobalStyles";
import { SignInContext } from "./context/SignInContext";
import { UserContext } from "./context/UserContext";
import { CardContext } from "./context/CardContext";
import { v4 as uuid_v4 } from "uuid";

interface CardDetailProps {
	question: string;
	setQuestion: (question: string) => void;
}

const CardDetail: React.FC<CardDetailProps> = (props) => {
	const { question, setQuestion } = props;
	const { signedIn } = useContext(SignInContext) ?? { signedIn: false };
	const { user, setReadingsFeed } = useContext(UserContext) ?? { user: "", setReadingsFeed: () => {} };
	const { cardData, setCardData, flipped, setFlipped } = useContext(CardContext) ?? { cardData: null, setCardData: () => {}, flipped: false, setFlipped: () => {} };
	const [saveReadingBtn, setSaveReadingBtn] = useState("Save my reading");
	const [disable, setDisable] = useState(false);

	const onNewQuestion = (e: React.MouseEvent) => {
		e.preventDefault();
		setFlipped(false);
		setQuestion("");
		setCardData(null);
		setSaveReadingBtn("Save my reading");
		setDisable(false);
	};

	const d = new Date();
	const readingDate = d.toString().slice(4, 15);

	const onSaveReading = () => {
		if (!cardData) return;
		
		let newReadingId = uuid_v4();
		fetch(`${process.env.REACT_APP_API_URL}/users/${user}`, {
			method: "POST",
			body: JSON.stringify({
				user: user,
				readingData: {
					readingId: newReadingId,
					question: question,
					cardName: cardData.cardName,
					cardImage: cardData.cardImage,
					description: cardData.description,
					date: readingDate,
				},
			}),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((res) => {
				res.json();
			})
			.then((json) => {
				setSaveReadingBtn("Reading saved!");
			});
		setDisable(true);
		setReadingsFeed(true);
	};

	return (
		<>
			{flipped && cardData && (
				<CardDetailWrapper>
					<CardName>{cardData.cardName}</CardName>
					<CardDescription>{cardData.description}</CardDescription>
					<ButtonWrapper>
						{signedIn && cardData.cardImage && (
							<SaveReadingButton
								onClick={onSaveReading}
								disabled={disable}
								type="button"
							>
								{saveReadingBtn}
							</SaveReadingButton>
						)}
						<NewQuestionButton onClick={onNewQuestion} type="button">
							Ask another question
						</NewQuestionButton>
					</ButtonWrapper>
				</CardDetailWrapper>
			)}
		</>
	);
};

export default CardDetail;

const CardDetailWrapper = styled.div`
	margin-top: 48px;
	max-width: 700px;
	font-size: 1rem;
	transition: 1s ease;
`;

const CardName = styled.div`
	font-size: 2rem;
	text-align: center;
	font-family: var(--font-titles);
`;

const CardDescription = styled.div`
	font-size: 1.5rem;
	line-height: 1.1;
	margin: 32px 0 48px;
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;

	@media screen and (max-width: 495px) {
		flex-direction: column;
	}
`;

const SaveReadingButton = styled(Button)`
	margin: 24px 16px;
`;

const NewQuestionButton = styled(Button)`
	margin: 24px 16px;
`;
