import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
const PlaceCards = (props) => {
  const { name, state, info, image } = props;
  const navigate = useNavigate();
  const formattedInfo = info.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
  const handleClick = (placeID) => {
    navigate(`/place/${placeID}`);
  };
  return (
    <div className="box">
      <div className="box-top">
        <img className="box-image" src={image} alt={name} />
        <div className="title-flex">
          <h3 className="title">{name}</h3>
          <p className="user-follow-info">{state}</p>
        </div>
        <p className="description">{formattedInfo[0]}</p>
      </div>
      <a onClick={() => handleClick(props.name)} className="button">
        Know More
      </a>
    </div>
  );
};

export default PlaceCards;
