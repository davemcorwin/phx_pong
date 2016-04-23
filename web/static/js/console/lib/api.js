// import Axios from 'axios'
import { connect } from 'react-refetch'
import urlJoin from 'url-join'

const baseUrl = window.location.hostname === 'localhost' ?
  'http://localhost:4000/api' :
  'https://phx-pong.herokuapp.com/api'

// const Api = Axios.create({
//   baseURL: baseUrl,
//   timeout: 1000
// })

// export default Api

export default connect.defaults({
  buildRequest: function (mapping) {
    const options = {
      method: mapping.method,
      // cache: 'force-cache',
      // referrer: 'https://phx-pong.herokuapp.com',
      headers: mapping.headers,
      credentials: mapping.credentials,
      redirect: mapping.redirect,
      body: mapping.body
    }

    return new Request(urlJoin(baseUrl, mapping.url), options)
  }
})
