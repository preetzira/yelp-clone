import React, { useState } from "react"
import { Link } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import { useLocation, useParams, useHistory } from "react-router-dom"

const AddReview = () => {
  const { id } = useParams()
  const location = useLocation()
  const history = useHistory()

  const [name, setName] = useState("")
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState("")

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    try {
      await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      })
      history.push("/")
      history.push(location.pathname)
    } catch (err) {}
  }
  return (
    <div className="m-md-5 px-md-5 p-0 m-0 my-2">
      <form className="card" action="" onSubmit={handleSubmitReview}>
        <fieldset>
          <div className="mx-md-5 mx-3 p-md-5 py-3 form-row">
            <div className="form-group col-md-8 col-12">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="name"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="form-group col-md-4 col-12">
              <label htmlFor="rating">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                id="rating"
                className="custom-select"
                required
              >
                <option value="" disabled selected>Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="form-group col-12 mb-0">
              <label htmlFor="Review">Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                id="Review"
                className="form-control"
                rows="5"
                required
              ></textarea>
              <button
                type="submit"
                className="btn btn-success mt-3"
              >
                Submit
              </button>
              <Link className="btn btn-light mt-3 ml-2" to="/">Cancel</Link>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default AddReview
