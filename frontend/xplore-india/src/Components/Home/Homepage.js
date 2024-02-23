import React, { useEffect } from "react";
import PlaceCards from "../Cards/PlaceCards";
import "./style.css";
const Homepage = () => {
  console.log("rendered");
  const [places, setPlaces] = React.useState([]);
  const [currList, setCurrList] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  useEffect(() => {
    try {
      async function getAllPlaces() {
        const res = await fetch("http://localhost:4000/places/getAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const allPlace = await res.json();
        setPlaces(allPlace);
        const placeCards = allPlace.map((place) => {
          return <PlaceCards key={place.name_of_place} {...place} />;
        });
        setCurrList(placeCards);
      }
      getAllPlaces();
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  function handleSearch(event) {
    event.preventDefault();
    const filteredPlaces = places.filter((place) => {
      return (
        place.name.toLowerCase().includes(searchText.toLowerCase()) ||
        place.state.toLowerCase().includes(searchText.toLowerCase()) ||
        place.city.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    const place = filteredPlaces.map((place) => {
      return <PlaceCards key={place.name_of_place} {...place} />;
    });
    setCurrList(place);
  }
  return (
    <div>
      <form className="search-container" onSubmit={handleSearch}>
        <input
          className="search-input"
          placeholder="Search For Places"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      <div className="cards-container">
        {currList.length > 0 ? currList : "Oops No Places Matches Name :("}
      </div>
    </div>
  );
};

export default Homepage;
