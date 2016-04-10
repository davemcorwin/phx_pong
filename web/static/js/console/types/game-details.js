import { PropTypes as PT } from 'react'

export default PT.shape({
  points:       PT.arrayOf(PT.number).isRequired,
  first_server: PT.number.isRequired,
  status:       PT.string.isRequired,
  winner:       PT.number
})
