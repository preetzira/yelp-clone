import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useParams, useHistory } from "react-router-dom"
import RestaurantFinder from '../apis/RestaurantFinder'

const UpdateRestaurant = (props) => {
  const { id } = useParams()
  let history = useHistory()
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("")

  useEffect(() => {
    RestaurantFinder.get(`/${id}`).then(response=>{
      setName(response.data.data.restaurant.name)
      setLocation(response.data.data.restaurant.location)
      setPriceRange(response.data.data.restaurant.price_range)
    })
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    })
    history.push("/")
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 col-12">
          <form onSubmit={handleSubmit} className="card p-5 my-5" action="">
            <fieldset>
              <div className="form-row">
                <div className="col-12 form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    className="col form-control"
                    type="text"
                    required
                  />
                </div>
                <div className="col-12 form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    id="location"
                    className="form-control"
                    type="text"
                    required
                  />
                </div>
                <div className="col-12 form-group">
                  <label htmlFor="price_range">Price Range</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="custom-select my-1 mr-sm-2"
                    required
                  >
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                  </select>
                </div>
                <div className="form-group col-12">
                  <button
                    type="submit"
                    className="btn btn-success"
                  >
                    Submit
                  </button>
                  <Link to="/" className="btn btn-light ml-2">Cancel</Link>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateRestaurant
