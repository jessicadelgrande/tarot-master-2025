import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./GlobalStyles";
import { SignInContext } from "./context/SignInContext";
import { UserContext } from "./context/UserContext";
import { v4 as uuid_v4 } from "uuid";
import { SavedReading } from "../services/tarotService";

const Profile = () => {
	const signInContext = useContext(SignInContext);
	const userContext = useContext(UserContext);
	const [savedReadings, setSavedReadings] = useState<{ [key: string]: SavedReading }>({});

	useEffect(() => {
		// Load readings from localStorage
		const readings = JSON.parse(localStorage.getItem('tarot_readings') || '{}');
		setSavedReadings(readings);
	}, []);

	if (!signInContext || !userContext) {
		return <div>Loading...</div>;
	}

	const { googleProfile } = signInContext;
	const { user, setReadingsFeed } = userContext;

	const onDeleteReading = (readingId: string) => {
		// Get existing readings
		const existingReadings = JSON.parse(localStorage.getItem('tarot_readings') || '{}');
		
		// Remove the reading
		delete existingReadings[readingId];
		
		// Save back to localStorage
		localStorage.setItem('tarot_readings', JSON.stringify(existingReadings));
		
		// Update state
		setSavedReadings(existingReadings);
		setReadingsFeed(true);
	};

	const onClearAllReadings = () => {
		if (window.confirm('Are you sure you want to delete all your readings? This action cannot be undone.')) {
			// Clear localStorage
			localStorage.removeItem('tarot_readings');
			
			// Update state
			setSavedReadings({});
			setReadingsFeed(true);
		}
	};

	const readings = Object.values(savedReadings);

	return (
		<>
			<Wrapper>
				<SectionLabel>Your Profile</SectionLabel>
				<ProfileWrapper>
					<Avatar
						alt={`avatar for ${googleProfile.givenName}`}
						src={googleProfile.imageUrl}
					/>
					<ProfileDetailsWrapper>
						<ProfileDetails>{googleProfile.givenName}</ProfileDetails>
						<ProfileDetails>{googleProfile.email}</ProfileDetails>
					</ProfileDetailsWrapper>
				</ProfileWrapper>
				<SavedWrapper>
					{readings.length === 0 ? (
						<NoReadingsText>
							You don't have any saved readings yet.
						</NoReadingsText>
					) : (
						<>
							<SectionLabel>Your Saved Readings</SectionLabel>
							<ClearAllButton onClick={onClearAllReadings}>
								Clear All Readings
							</ClearAllButton>
							<ReadingsOuterUL>
								{readings.map((reading: SavedReading) => {
									return (
										<React.Fragment key={reading.id}>
											<ReadingsOuterLI>
												<ReadingsInnerUL>
													<ReadingsInnerLI>
														<ReadingDate>{reading.date}</ReadingDate>
													</ReadingsInnerLI>
													<ReadingsInnerLI>
														<ReadingNotes>{reading.notes}</ReadingNotes>
													</ReadingsInnerLI>
												</ReadingsInnerUL>
												<DeleteButton onClick={() => onDeleteReading(reading.id)}>
													Delete
												</DeleteButton>
											</ReadingsOuterLI>
										</React.Fragment>
									);
								})}
							</ReadingsOuterUL>
						</>
					)}
				</SavedWrapper>
			</Wrapper>
		</>
	);
};

export default Profile;

const Wrapper = styled.div`
	width: 100%;
	margin-top: 32px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@media screen and (max-width: 495px) {
		align-items: flex-start;
	}
`;

const ProfileWrapper = styled.div`
	display: flex;
	margin: 32px 0 48px;
	width: 800px;

	@media screen and (max-width: 864px) {
		width: 100%;
	}
`;

const Avatar = styled.img`
	height: 80px;
	width: 80px;
	border: 1px solid #111;
	border-radius: 50%;
	margin-right: 16px;

	@media screen and (max-width: 495px) {
		width: 40px;
		height: 40px;
	}
`;

const ProfileDetailsWrapper = styled.div``;

const ProfileDetails = styled.div`
	font-size: 2rem;

	@media screen and (max-width: 495px) {
		font-size: 1.5rem;
	}
`;

const SavedWrapper = styled.div`
	max-width: 800px;
	/* margin-right: auto; */
	margin: 0 auto;
`;

const SectionLabel = styled.h3`
	font-size: 2.5rem;
	width: 800px;

	@media screen and (max-width: 864px) {
		width: 100%;
	}
`;

const ReadingsOuterUL = styled.ul`
	display: flex;
	flex-direction: column-reverse;
`;

const NoReadingsText = styled.p`
	font-size: 2rem;
`;

const ReadingsOuterLI = styled.li`
	margin-top: 16px;
`;

const ReadingsInnerUL = styled.ul`
	display: flex;
	margin-bottom: 24px;

	@media screen and (max-width: 495px) {
		flex-direction: column;
	}
`;

const ReadingsInnerLIWrapper = styled.div`
	margin-left: 16px;
`;

const ReadingsInnerLI = styled.li`
	font-size: 1.2rem;
	display: flex;

	@media screen and (max-width: 720px) {
		flex-direction: column;
	}
`;

const ReadingsLabel = styled.p`
	font-size: 1.2rem;
	font-weight: 700;
	margin-right: 8px;
	white-space: nowrap;
`;

const ReadingsContent = styled.p``;

const ReadingsImg = styled.img`
	height: 296px;
	max-width: 164px;

	@media screen and (max-width: 495px) {
		margin: 8px auto;
	}
`;

const DeleteButton = styled(Button)`
	margin-top: 16px;
`;

const ReadingDate = styled.p`
	font-size: 1.2rem;
	font-weight: 700;
	margin-right: 8px;
	white-space: nowrap;
`;

const ReadingNotes = styled.p`
	font-size: 1.2rem;
`;

const ClearAllButton = styled(Button)`
	background-color: #ff4444;
	color: white;
	border-color: #cc0000;
	margin-bottom: 20px;
	
	&:hover {
		background-color: #cc0000;
	}
`;
