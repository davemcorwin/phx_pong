import Axios from 'axios'

const baseURL = window.location.hostname === 'localhost' ?
  'http://localhost:4000/api/' :
  'https://phx-pong.herokuapp.com/api/'

const Api = Axios.create({
  baseURL: baseURL,
  timeout: 1000
})

export default Api
