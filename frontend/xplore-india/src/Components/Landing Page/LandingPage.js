import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Reviews from "../Reviews/Reviews";
import "./style.css";
const LandingPage = () => {
  const params = useParams();
  const placeID = params.placeID;
  const [filPlaces, setFilPlaces] = useState([]);
  useEffect(() => {
    async function getDetailedPage() {
      try {
        const res = await fetch("http://localhost:4000/places/getSingle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            placeID,
          }),
        });
        const places = await res.json();
        setFilPlaces(places);
      } catch (error) {
        console.log(error);
      }
    }
    getDetailedPage();
  }, [params]);
  return (
    <div className="parent-container">
      <div className="image-info">
        <div className="image-cont">
          <img src={filPlaces.image} className="place-image" />
        </div>
        <div className="mini-des">
          <p className="place-title">About Place</p>
          <>
            <p>
              <span className="des-head">Name: </span>
              <span className="des-body">{filPlaces.name}</span>
            </p>
            <p>
              <span className="des-head">City: </span>
              <span className="des-body">{filPlaces.city}</span>
            </p>
            <p>
              <span className="des-head">State: </span>
              <span className="des-body">{filPlaces.state}</span>
            </p>
            <p>
              <span className="des-head">Weather: </span>
              <span className="des-body">{filPlaces.weather}</span>
            </p>
          </>
        </div>
      </div>
      <div className="content">
        <p className="place-title">{filPlaces.name}</p>
        <p className="place-info">{filPlaces.info}</p>
      </div>
      <Reviews
        revList={filPlaces.reviews}
        PlaceID={filPlaces._id}
        PlaceName={filPlaces.name}
      />
    </div>
  );
};

export default LandingPage;
