import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'



const SelectedArtworks = () => {
    const { id } = useParams();
    const [selectedArtwork, setSelectedArtwork] = useState({});
    const ARTWORK_URL = `https://konstrundan.herokuapp.com/artworks/Karlstad`;
  
    useEffect(() => {
      fetch(`${ARTWORK_URL}`)
        .then((response) => response.json())
        .then((json) => {
          setSelectedArtwork(json);
        });
    }, [id, ARTWORK_URL]);


  return (
    <div>
      {selectedArtwork.id}
      <form>
        <label> Bokstav:
          <input
          type= "text">
            
          </input>
        </label>
      </form>
    </div>
  )
}
export default SelectedArtworks