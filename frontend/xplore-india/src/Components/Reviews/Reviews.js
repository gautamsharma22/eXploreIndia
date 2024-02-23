import React, { useContext, useState } from "react";
import ReviewCard from "./ReviewCard";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
const Reviews = (props) => {
  const { revList, PlaceID, PlaceName } = props;
  const { userContext } = useContext(UserContext);
  const { isLoggedIn, userID } = userContext;
  const [reviewText, setReviewText] = useState("");
  const navigate = useNavigate();
  const mappedCards = revList?.map((review) => {
    const { firstName, lastName } = review.author;
    const timeAdded = new Date(review.timeAdded).toLocaleDateString();
    return (
      <ReviewCard
        firstName={firstName}
        lastName={lastName}
        timeAdded={timeAdded}
        comment={review.comment}
      />
    );
  });
  async function handleReviewSubmit() {
    try {
      const res = await fetch("http://localhost:4000/review/addReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: reviewText,
          userID,
          PlaceID,
        }),
      });
      const response = await res.json();
      if (res.status === 201) {
        setReviewText("");
        navigate(`/place/${PlaceName}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="review-card-container">
      <h1>Reviews {"(" + revList?.length + ")"}</h1>
      <div className="user-review">
        {isLoggedIn ? (
          <>
            <input
              multiple
              className="review-input"
              placeholder="Write a review about this place."
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value);
              }}
            />
            <button onClick={handleReviewSubmit} className="review-btn">
              Submit
            </button>
          </>
        ) : (
          ""
        )}
      </div>
      {mappedCards}
    </div>
  );
};

export default Reviews;
