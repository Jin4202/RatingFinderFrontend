import React from "react";
import useAPIService from "../../service/useAPIService";
import { getUserById } from "../../service/APIService";
import Default_pfp from "../../Default_pfp.png";

export default function UserReview({ userReview }) {
  // const [loading, data, error] = useAPIService(()=>getUserById(userReview.user_id));
  console.log("user data", userReview);
  return (
    <div className="container d-flex m-2">
      <div className="user w-25">
        <div className="img-container ">
          <img
            src={Default_pfp}
            alt={`User - ${userReview.username}`}
            className="img-thumbnail"
          />
        </div>
        <p>{userReview.username}</p>
      </div>

      <div className="user-review">
        <div className="star-rating">
          <p>{userReview.rating}/5</p>
        </div>

        {userReview.productName != null && <div>
          <span>{`${userReview.productName} Review`}</span>
          </div>}
        <div className="date-posted">
          <p>{userReview.date}</p>
        </div>
        <div className="user-review-text">
          <p>{userReview.review_text}</p>
        </div>

        {userReview.photos.length > 0 && (
          <div className="user-review-image container">
            {userReview.photos.map((element, index) => (
              <img
                src={`data:image/jpg;base64,${element}`}
                alt={"Product"}
                className="img-thumbnail"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
