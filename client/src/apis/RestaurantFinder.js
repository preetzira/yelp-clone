import axios from "axios"


// creating and axios instance to with baseURL property
export default axios.create({
  baseURL: "/api/v1/restaurants",
})
// location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')
