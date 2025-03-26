import React, { useContext, useRef } from "react";
import styled from "styled-components";
import Card from "./Card";
import { CardContext } from "./context/CardContext";
import { getCard } from "../services/tarotService";

interface HomeProps {
	question: string;
	setQuestion: (question: string) => void;
}

const Home: React.FC<HomeProps> = (props) => {
	const { question, setQuestion } = props;
	const context = useContext(CardContext);
	const domTarget = useRef<HTMLDivElement>(null);

	if (!context) {
		return <div>Loading...</div>;
	}

	const { setCardData, setFlipped, setRandomNum } = context;

	const onGetCard = () => {
		if (!question.trim()) return;
		
		const randomNumber = Math.floor(Math.random() * 22);
		const card = getCard(randomNumber);
		if (card) {
			setCardData(card);
			setRandomNum(randomNumber);
			setTimeout(() => {
				setFlipped(true);
			}, 100);
		}
	};

	const handleQuestion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setQuestion(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent form submission
	};

	return (
		<>
			<Wrapper>
				<InnerContentWrapper>
					<Title>Ask The Tarot</Title>
					<QuestionForm onSubmit={handleSubmit}>
						<QuestionLabel>
							Ask a question, then tap the card to see what the tarot says.
              <QuestionInput 
                id="question-input"
                name="question"
                value={question} 
                onChange={handleQuestion}
                placeholder="Enter your question here..."
              />
						</QuestionLabel >
					</QuestionForm>
					<Card
						onGetCard={onGetCard}
						domTarget={domTarget}
						question={question}
						setQuestion={setQuestion}
					/>
				</InnerContentWrapper>
			</Wrapper>
		</>
	);
};

export default Home;

const Wrapper = styled.div`
	padding: 32px;
	margin-bottom: 64px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const InnerContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Title = styled.h1`
	font-family: var(--font-titles);
	color: var(--text-color);
	text-align: center;
	font-size: 6rem;
	font-weight: 400;
`;

const QuestionForm = styled.form`
	min-height: 108px;
	text-align: center;
`;

const QuestionLabel = styled.label`
	font-size: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 32px 32px 16px 32px;
	color: var(--text-color);
`;

const QuestionInput = styled.textarea`
	min-width: 450px;
	max-width: 450px;
	min-height: 60px;
  margin-top: 16px;
	font-size: 1.5rem;
	border-radius: 0;

	@media screen and (max-width: 495px) {
		min-width: 80vw;
	}
`;
