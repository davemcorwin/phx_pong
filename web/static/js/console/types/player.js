import { PropTypes as PT } from 'react'

export default PT.shape({
  id:     PT.number.isRequired,
  name:   PT.string.isRequired,
  taunt:  PT.string,
  score:  PT.number.isRequired,
  status:  PT.string.isRequired
})
