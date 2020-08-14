import React from "react"
import StarRating from "./StarRating"

const Reviews = ({ reviews }) => {
  return (
    <div className="row mb-2">
      {reviews.map((review) => {
        return (
          <div className="col-md-4 col-sm-6 col-12 mb-3">
            <div
              key={review.id}
              className="card text-white bg-primary"
              style={{maxHeight:"200px"}}
            >
              <div className="card-header d-flex justify-content-between">
                <span>{review.name}</span>
                <span>
                  <StarRating rating={review.rating} />
                </span>
              </div>
              <div className="card-body">
                <p
                  className="card-text"
                  title={review.review}
                  style={{  textOverflow: 'ellipsis', whiteSpace: "nowrap",overflow: "hidden", width:"100%" }}
                >
                  {review.review}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Reviews
