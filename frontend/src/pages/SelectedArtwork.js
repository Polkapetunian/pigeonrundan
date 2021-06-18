import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/macro";

import BackButton from "../components/BackButton";
import SubmitButton from "../components/SubmitButton";

import { ARTWORK_URL, ANSWER_URL } from "../reusable/urls";
import artwork from "../reducers/artwork";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 75px 0 0 0;
  margin: 0;
  font-family: 'Lora', serif;
`;
const ArtistContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text = styled.p`
  margin: 10px 0 0 0;
`;
const TextClue = styled.p`
  margin: 10px 30px;
`;
const Info = styled.p`
  margin: 10px 30px;
`;

const Span = styled.span`
  margin: 10px 0 0 0;
`;
const Header = styled.h2`
  font-weight: 700px;
  margin: 3px;
`;
const Input = styled.input`
  width: 40px;
  height: 20px;
  background-color: #f1dbb3;
  border: 1px solid #4b3d2d;
`;

const SelectedArtworks = () => {
  const [newAnswer, setNewAnswer] = useState('')
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false)
  const [answerIsSubmitted, setAnswerIsSubmitted] = useState(false)
  const artworkId = useSelector((store) => store.artwork.artworkId);
  const selectedArtwork = useSelector((store) => store.artwork.selectedArtwork);
  const userId = useSelector((store) => store.user.userId);
  const currentCity = useSelector((store) => store.city.currentCity.city);
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch();
  useEffect(() => {
    fetch(ARTWORK_URL(currentCity, artworkId))
      .then((res) => res.json())
      .then((data) => {
        dispatch(artwork.actions.setSelectedArtwork(data));
      });
  }, []);

  const onFormSubmit = (event) => {
    event.preventDefault();
    setAnswerIsSubmitted(true);
    if (newAnswer.toLowerCase() === selectedArtwork.correctAnswer.toLowerCase()) {
      setAnswerIsCorrect(true)
      const options = {
        method: 'POST',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json'
        },
        //We haven't prepared the endpoint cause we don't know what the schema should look like =(, so we don't know what to send
        body: JSON.stringify({ artworkId, userId })
      };
      fetch(ANSWER_URL(currentCity), options)
      .then(res => res.json())
      .then(data =>{
        if (data.success === true) {
          console.log(data)
        } else {
          console.log("Det gick åt skogen")
        }
      } )
    } else { 
      console.log("Fel Svar!")
      setAnswerIsCorrect(false)}
  }

  const onNewAnswerChange = (event) => {
    setNewAnswer(event.target.value)
  }

  console.log(newAnswer)

  return (
    selectedArtwork && (
      <Container>
        <BackButton />
        <Info>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          
        </Info>
        <Header>{selectedArtwork.title}</Header>
        <ArtistContainer>
          <Text>Av {selectedArtwork.artist}, {selectedArtwork.year}</Text>
        </ArtistContainer>
        <TextClue>{selectedArtwork.clue}</TextClue>
        <form 
        onSubmit={onFormSubmit}
        >
          <label>
            {" "}
            Bokstav:
            <Input 
            type="text"
            value={newAnswer}
            onChange={onNewAnswerChange}
            maxLength = "1"
             />
          </label>
          <SubmitButton />
        </form>

        {answerIsCorrect && 
        <p>Rätt svar! Nu kan du ta nästa konstverk.</p>}
        {!answerIsCorrect && answerIsSubmitted &&
        <p>Fel! Försök igen!</p>}
      
      </Container>
    )
  );
};
export default SelectedArtworks;
