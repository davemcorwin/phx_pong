import Axios from 'axios'

const Api = Axios.create({
  baseURL: 'htp://localhost:8080/api/',
  timeout: 1000
})

export default Api
