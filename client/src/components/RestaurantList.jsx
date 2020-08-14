import React, { useEffect, useContext } from "react"
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from "../context/RestaurantsContext"
import { useHistory } from "react-router-dom"
import StarRating from "./StarRating"

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext)
  let history = useHistory()
  useEffect(() => {
    ;(async () => {
      try {
        const response = await RestaurantFinder.get("/")
        console.log(response.data.data)
        setRestaurants(response.data.data.restaurants)
      } catch (err) {}
    })()
  }, [setRestaurants])

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    try {
      await RestaurantFinder.delete(`/${id}`)
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id
        })
      )
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdate = (e, id) => {
    e.stopPropagation()
    history.push(`/restaurants/${id}/update`)
  }

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`)
  }

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>
    }
    return (
      <>
        <StarRating rating={restaurant.id} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    )
  }

  return (
    <div style={{overflow:"hidden",borderRadius:"5px"}}>
      <div className="table-responsive">
        <table className="table table-hover table-dark mb-0">
          <thead>
            <tr className="bg-primary">
              <th scope="col">Restaurant</th>
              <th scope="col">Location</th>
              <th scope="col">Price Range</th>
              <th scope="col">Ratings</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {restaurants &&
              restaurants.map((restaurant) => {
                return (
                  <tr
                    onClick={() => handleRestaurantSelect(restaurant.id)}
                    key={restaurant.id}
                    style={{cursor:"pointer"}}
                  >
                    <td>{restaurant.name}</td>
                    <td>{restaurant.location}</td>
                    <td>{"$".repeat(restaurant.price_range)}</td>
                    <td>{renderRating(restaurant)}</td>
                    <td>
                      <button
                        onClick={(e) => handleUpdate(e, restaurant.id)}
                        className="btn btn-warning"
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={(e) => {window.confirm('Are you sure?') ? handleDelete(e, restaurant.id) : e.stopPropagation()}}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RestaurantList
