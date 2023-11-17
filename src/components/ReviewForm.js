import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function ReviewForm() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    review_text: "",
    star: 1,
    photos: [],
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    const data = {
      user_id: user.user.user_id,
      review_text: form.review_text,
      rating: form.star,
      product_id: id,
    };
    const data_string = JSON.stringify(data);

    formData.append(
      "data",
      new Blob([data_string], { type: "application/json" })
    );
    console.log(form.photos);

    formData.append("file", form.photos[0]);

    axios
      .post(`http://localhost:8080/product/${id}/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  };

  //fix and loop through the array to add
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "photos") {
      console.log("file", e.target.files);
    }
    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: [name] == "photos" ? e.target.files : value,
      };
    });
  };

  return (
    <form id="review-form" onSubmit={(e) => handleOnSubmit(e)}>
      <div className="form-group">
        <label for="text-review">Review:</label>
        <textarea
          placeholder="Make a review"
          id="text-review"
          className="form-control"
          name="review_text"
          onChange={handleOnChange}
        ></textarea>
      </div>

      <div className="form-group">
        <select className="form-control" name="star" onChange={handleOnChange}>
          {[...Array(5)].map((element, index) => {
            return (
              <option key={`star-${index}`} value={index + 1}>
                {index + 1}
              </option>
            );
          })}
        </select>
      </div>

      <div className="form-group">
        <label for="photos">Select image files:</label>
        <input
          type="file"
          name="photos"
          className="form-control-file"
          acccept="image/png, image/jpeg"
          id="photos"
          multiple
          onChange={handleOnChange}
        />
      </div>

      <button type="submit" className="btn-primary btn">
        Submit Review
      </button>
    </form>
  );
}
