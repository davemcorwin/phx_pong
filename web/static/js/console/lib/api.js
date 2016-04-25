import { connect } from 'react-refetch'
import urlJoin from 'url-join'

const host = window.location.hostname === 'localhost' ?
  'http://localhost:4000' :
  'https://phx-pong.herokuapp.com'

const baseUrl = 'api/'

export default connect.defaults({

  handleResponse: response => {

    const json = response.json()

    if (response.ok)
      return json.then(({data}) => Promise.resolve(data))
    else
      return json.then(({data, errors}) => Promise.reject({
        message: `${response.status}: ${response.statusText}`,
        data,
        errors
      }))
  },

  buildRequest: mapping => new Request(
    urlJoin(host, baseUrl, mapping.url),
    {
      method: mapping.method,
      headers: mapping.headers,
      credentials: mapping.credentials,
      redirect: mapping.redirect,
      body: mapping.body && JSON.stringify(mapping.body),
      // cache: 'force-cache',
      // referrer: 'https://phx-pong.herokuapp.com',
    }
  )
})
