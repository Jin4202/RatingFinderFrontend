import React, { useContext, useState } from "react";
import useAPIService from "../../service/useAPIService";
import { getUserById } from "../../service/APIService";
import Default_pfp from "../../Default_pfp.png";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";

export default function UserReview({ userReview, handleReviewUpdate }) {
  // const [loading, data, error] = useAPIService(()=>getUserById(userReview.user_id));
  const { user } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [prevReview, setPrevReview] = useState(userReview);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPrevReview((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleOnCancel = (e) => {
    setIsEdit(false);
    setPrevReview(userReview);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/update`, prevReview)
      .then((response) => {
        console.log("response", response);
        handleReviewUpdate();
      })
      .catch((error) => console.log(error));
    setIsEdit(false);
  };

  const handleOnDelete = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:8080/delete", {data: prevReview})
      .then((response) => {
        console.log(response);
        handleReviewUpdate();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container d-flex m-2 border border-dark">
      <div className="user w-25">
        <div className="img-container ">
          <img
            src={Default_pfp}
            alt={`User - ${userReview.username}`}
            className="img-thumbnail "
          />
        </div>
        <p>{userReview.username}</p>
      </div>

      <div className="user-review">
        {isEdit ? (
          <form className="container" onSubmit={(e) => handleOnSubmit(e)}>
            <div>
              <select
                name="rating"
                onChange={(e) => handleOnChange(e)}
                value={prevReview.rating}
              >
                {[...Array(5)].map((element, index) => {
                  if (index == user.user.rating) {
                    return (
                      <option selected value={index + 1}>
                        {index + 1}
                      </option>
                    );
                  } else {
                    return <option value={index + 1}> {index + 1}</option>;
                  }
                })}
              </select>
            </div>

            <div>
              <textarea
                name="review_text"
                value={prevReview.review_text}
                onChange={(e) => handleOnChange(e)}
              ></textarea>
            </div>
            <button type="submit" onSubmit={(e) => handleOnSubmit(e)}>
              Submit
            </button>
            <button type="button" onClick={handleOnCancel}>
              Cancel
            </button>
          </form>
        ) : (
          <div className="star-rating">
            <p>{userReview.rating}/5</p>

            {userReview.productName != null && (
              <div>
                <span>{`${userReview.productName} Review`}</span>
              </div>
            )}
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

            {user != null && user.user.username == userReview.username && (
              <div className="container ">
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => {
                    setIsEdit((prev) => !prev);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleOnDelete(e)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
