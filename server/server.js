require("dotenv").config()
const express = require("express")
const router = express.Router()
const cors = require("cors")
const db = require("./db")

const morgan = require("morgan")

const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
// app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(router)

/*
  GET method to get all restaurants
  POST method create new restaurant
  @Body:{name,location,price_range}
*/
router
.get("/api/v1/restaurants", async (req, res) => {
  try {
    const restaurantRatingsData = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
    )

    res.status(200).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
      data: {
        restaurants: restaurantRatingsData.rows,
      },
    })
  } catch (err) {
    console.log(err)
  }
})
.post("/api/v1/restaurants", async (req, res) => {

  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    )
    res.status(201).json({
      status: "succes",
      data: {
        restaurant: results.rows[0],
      },
    })
  } catch (err) {
    console.log(err)
  }
})

/*
  GET method to get details of a restaurant
  PUT method to update a restaurant
  DELETE method to delete a restaurant
  @Params: {id}
  @Body: {name,location,price_range}
*/
router
.get("/api/v1/restaurants/:id", async (req, res) => {

  try {
    const restaurant = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1;",
      [req.params.id]
    )

    const reviews = await db.query(
      "select * from reviews where restaurant_id = $1;",
      [req.params.id]
    )

    res.status(200).json({
      status: "succes",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    })
  } catch (err) {
    console.log(err)
  }
})
.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *;",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    )

    res.status(200).json({
      status: "succes",
      data: {
        retaurant: results.rows[0],
      },
    })
  } catch (err) {
    console.log(err)
  }
})
.delete("/api/v1/restaurants/:id", async (req, res) => {
        try {
          const results = db.query("DELETE FROM restaurants where id = $1;", [
            req.params.id,
          ])
          res.status(204).json({
            status: "sucess",
          })
        } catch (err) {
          console.log(err)
        }
      })

/*
  POST method to add a review of a restaurant
  @Params: {id}
  @Body: {rating,name,review}
*/
router
.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    )

    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    })
  } catch (err) {
    console.log(err)
  }
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`)
})
