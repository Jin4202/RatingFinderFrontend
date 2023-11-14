import React from "react";

export default function Review({ review }) {
  return (
    <div className="professional-review">
      <section className="category">
        <h4>{review.category}</h4>
        <p>{review.summary}</p>
      </section>
    </div>
  );
}
