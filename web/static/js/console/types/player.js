import { PropTypes as PT } from 'react'

export default PT.shape({
  id:     PT.number.isRequired,
  name:   PT.string.isRequired,
  taunt:  PT.string,
  wins:   PT.number.isRequired,
  losses: PT.number.isRequired,
  score:  PT.number.isRequired,
  status:  PT.string.isRequired
})
