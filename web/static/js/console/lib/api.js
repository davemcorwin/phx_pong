import Axios from 'axios'

const Api = Axios.create({
  baseURL: 'http://localhost:4000/api/',
  timeout: 1000
})

export default Api
