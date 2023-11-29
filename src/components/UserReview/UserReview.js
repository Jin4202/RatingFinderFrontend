import React, { useContext, useState } from "react";
import useAPIService from "../../service/useAPIService";
import { getUserById } from "../../service/APIService";
import Default_pfp from "../../Default_pfp.png";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserReview({ userReview, handleReviewUpdate }) {
  // const [loading, data, error] = useAPIService(()=>getUserById(userReview.user_id));
  const { user } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [prevReview, setPrevReview] = useState(userReview);
  const [deleteStatements, setDeleteStatements] = useState([]);

  // console.log("userreview", userReview);
  console.log("prev", prevReview);
  // console.log("deleteStmt", deleteStatements);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPrevReview((prev) => {
      return {
        ...prev,
        [name]: [name] == "photos" ? [...prev[name], e.target.files] : value,
      };
    });
  };

  const handleOnCancel = (e) => {
    setIsEdit(false);
    setPrevReview(userReview);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const data_string = JSON.stringify(prevReview);
    formData.append(
      "data",
      new Blob([data_string], { type: "application/json" })
    );

    for (let i = 0; i < prevReview.photos.length; i++) {
      if (prevReview.photos[i] instanceof FileList) {
        for (let j = 0; j < prevReview.photos[i].length; j++) {
          formData.append("file", prevReview.photos[i][j]);
        }
      }
    }

    axios
      .post(`http://localhost:8080/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {console.log(response); handleReviewUpdate();})
      .catch((error) => console.log(error));

    // axios
    //   .post(`http://localhost:8080/update`, prevReview)
    //   .then((response) => {
    //     console.log("response", response);
    //     handleReviewUpdate();
    //   })
    //   .catch((error) => console.log(error));



    for (let i = 0; i < deleteStatements.length; i++) {
      console.log("delete statemenent " + i);
      axios
        .delete(deleteStatements[i])
        .then((response) => {
          console.log("delete statements: ", response);
        })
        .catch((error) => console.log(error));
    }
    setIsEdit(false);
    
  };

  const handleOnDelete = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:8080/delete", { data: prevReview })
      .then((response) => {
        console.log(response);
        handleReviewUpdate();
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteImage = (image) => {
    const index = prevReview.photos.indexOf(image);
    const photos_update = [...prevReview.photos];
    photos_update.splice(index, 1);

    setPrevReview((prev) => {
      return {
        ...prev,
        photos: photos_update,
      };
    });
    if (image.imageId) {
      setDeleteStatements((prev) => {
        const stmt = `http://localhost:8080/delete/image?id=${image.imageId}`;
        return [...prev, stmt];
      });
    }
  };

  return (
    <div className="container d-flex m-2 border border-dark">
      <div className="user w-25">
        <div className="img-container ">
          <Link to={`/profile/${userReview.user_id}`}>
            <img
              src={Default_pfp}
              alt={`User - ${userReview.username}`}
              className="img-thumbnail "
            />
          </Link>
        </div>
        <p>{userReview.username}</p>
      </div>

      <div className="user-review">
        {isEdit ? (
          <form className="container" onSubmit={(e) => handleOnSubmit(e)}>
            <div className="form-group">
              <select
                name="rating"
                onChange={(e) => handleOnChange(e)}
                value={prevReview.rating}
                className="form-control"
              >
                {[...Array(5)].map((element, index) => {
                  if (index == user.user.rating) {
                    return (
                      <option selected value={index + 1} key={index}>
                        {index + 1}
                      </option>
                    );
                  } else {
                    return <option value={index + 1}> {index + 1}</option>;
                  }
                })}
              </select>
            </div>

            <div className="form-group">
              <textarea
                name="review_text"
                value={prevReview.review_text}
                onChange={(e) => handleOnChange(e)}
                className="form-control"
              ></textarea>
            </div>

            <div className="form-group">
              {prevReview.photos.length > 0 && <p>Preview Uploaded Photos:</p>}
              <div>
                {prevReview.photos.map((element, index) =>
                  element instanceof FileList ? (
                    <div>
                      {Array.from(element).map((item) => {
                        return (
                          <div>
                            <img
                              src={URL.createObjectURL(item)}
                              key={item.name}
                              alt={item.name}
                            />
                            <button
                              onClick={() => handleDeleteImage(element)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div>
                      <img
                        src={`data:image/jpg;base64,${element.photos}`}
                        alt={"Product"}
                        className="img-thumbnail"
                        key={`userReview.username ${index}`}
                      />
                      <button
                        type="button"
                        name={element.file_name}
                        onClick={() => handleDeleteImage(element)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  )
                )}
              </div>

              <label className="form-label">Update Photos</label>
              <input
                type="file"
                className="form-control"
                multiple
                name="photos"
                onChange={(e) => handleOnChange(e)}
              />
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="submit"
                onSubmit={(e) => handleOnSubmit(e)}
                className="btn btn-primary"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleOnCancel}
                className="btn btn-warning"
              >
                Cancel
              </button>
            </div>
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
                    src={`data:image/jpg;base64,${element.photos}`}
                    alt={"Product"}
                    className="img-thumbnail"
                    key={`userReview.username ${element.file_name}`}
                  />
                ))}
              </div>
            )}

            {user != null && user.user.username == userReview.username && (
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => {
                    setIsEdit((prev) => !prev);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
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
