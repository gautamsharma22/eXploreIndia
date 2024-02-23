import React from "react";
import "./style.css";
const ReviewCard = (props) => {
  const { firstName, lastName, comment, timeAdded } = props;
  return (
    <div className="review-card-item">
      <div className="review-card-header">
        <div className="author-name">{firstName + " " + lastName}</div>
        <div className="more-options">{timeAdded}</div>
      </div>
      <div className="review-card-body">{comment}</div>
    </div>
  );
};

export default ReviewCard;
