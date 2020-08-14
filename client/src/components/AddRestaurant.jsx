import React, { useState, useContext } from "react"
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from "../context/RestaurantsContext"

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext)
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      })
      console.log(response.data.data)
      addRestaurants(response.data.data.restaurant)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="mx-md-5 mx-0 px-0 px-md-5 mb-4">
      <form action="" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-sm col-12 mb-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
              required
            />
          </div>
          <div className="col-sm col-12 mb-2">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              type="text"
              placeholder="location"
              required
            />
          </div>
          <div className="col-sm col-12 mb-2">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="custom-select"
              required
            >
              <option value="" selected disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="mb-2 mx-1">
            <button
              type="submit"
              className="form-control btn btn-success"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant
