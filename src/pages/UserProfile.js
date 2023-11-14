import React, { useEffect, useState } from "react";
import useAPIService from "../service/useAPIService";
import { getUserReviewById } from "../service/APIService";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserReview from "../components/UserReview/UserReview";

export default function UserProfile() {
  const { id } = useParams();
  const [loading, data, error] = useAPIService(() => getUserReviewById(id));
  console.log("data", data);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8080/user/${id}/userReview`)
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  // }, []);
  return (
    <div>
      <div className="profile">
        <h3>Username</h3>
      </div>

      <div className="user-reviews-container container">
        {loading ? (
          <p>LOADING USER REVIEWS...</p>
        ) : error ? (
          <p>ERROR IN LOADING USER REVIEWS</p>
        ) : data.length > 0 ? (
          <div>
            {data.map((element) => {
              return <UserReview userReview={element} />;
            })}
          </div>
        ) : (
          <div>
            <h2>User has made no reviews</h2>
          </div>
        )}
      </div>
    </div>
  );
}
