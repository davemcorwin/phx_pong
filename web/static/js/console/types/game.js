import { PropTypes as PT } from 'react'
import Player from './player'

export default PT.shape({
  id:           PT.number.isRequired,
  player1:      Player.isRequired,
  player2:      Player.isRequired,
  players:      PT.arrayOf(Player).isRequired,
  log:          PT.arrayOf(PT.number).isRequired,
  first_server: PT.number,
  winner:       PT.number
})
