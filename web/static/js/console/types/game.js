import { PropTypes as PT } from react

import GameDetails from './game-details'
import Player from './player'

export default PT.shape({
  id:      PT.number.isRequired,
  player1: Player.isRequired,
  player2: Player.isRequired,
  details: GameDetails.isRequired
})
