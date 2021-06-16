import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/macro";

import ResponsiveImage from "../components/ResponsiveImage";
import BackButton from "../components/BackButton";
import SubmitButton from "../components/SubmitButton";

import { ARTWORK_URL } from "../reusable/urls";
import artwork from "../reducers/artwork";
import { InfoBox } from "@react-google-maps/api";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 75px 0 0 0;
  margin: 0;
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
  const artworkId = useSelector((store) => store.artwork.artworkId);
  const selectedArtwork = useSelector((store) => store.artwork.selectedArtwork);
  const currentCity = useSelector((store) => store.city.currentCity.city);

  const dispatch = useDispatch();
  useEffect(() => {
    fetch(ARTWORK_URL(currentCity, artworkId))
      .then((res) => res.json())
      .then((data) => {
        dispatch(artwork.actions.setSelectedArtwork(data));
      });
  }, []);
  //Här vill vi jämföra den skickade bokstaven med det rätta svaret för frågan med det id:t. Om de matchar vill vi skicka till db att det konstverket isDone för den usern.
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (newAnswer.toLowerCase() === selectedArtwork.correctAnswer.toLowerCase()) {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: newThought })
      };

      fetch(API_URL, options)
        .then(response => response.json())
        .then(() => fetchThoughts())
      setNewThought("");
    }
  }

  const onNewAnswerChange = (event) => {
    setNewAnswer(event.target.value)
  }

  return (
    selectedArtwork && (
      <Container>
        <BackButton />
        <Info>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Info>
        {/* <ResponsiveImage imgSrcMob={selectedArtwork.imgSrcMob} imgSrcTabl={selectedArtwork.imgSrcTabl} imgSrcDesk={selectedArtwork.imgSrcDesk} /> */}
        <Text>Konstverk nr {artworkId}</Text>
        <Header>{selectedArtwork.title}</Header>
        <ArtistContainer>
          <Text>Av {selectedArtwork.artist}, </Text>
          <Span> {selectedArtwork.year}</Span>
        </ArtistContainer>
        <TextClue>{selectedArtwork.clue}</TextClue>
        <form onSubmit={onFormSubmit}>
          <label>
            {" "}
            Bokstav:
            <Input type="text" maxLength="1" value={newAnswer} onChange={onNewAnswerChange} />
          </label>
          <SubmitButton />
        </form>
      </Container>
    )
  );
};
export default SelectedArtworks;
