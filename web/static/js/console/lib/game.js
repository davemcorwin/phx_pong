export function isServer(game, player) {
  const totalScore = game.players.reduce((player, acc) => acc + player.score, 0),
        modChanges = Math.floor(totalScore / 5) % 2

  return modChanges === 0 ? players[0].id === game.details.first_server : players[0].id !== game.details.first_server
}

export function winner(game) {
  return game.details.winner ? game.details.winner === game.player1.id ? game.player1 : game.player2 : null
}

export function isPending(game) {
  return game.details.status === 'pending'
}

export function inProgress(game) {
  return game.details.status === 'in-progress'
}

export function isOver(game) {
  return game.details.status === 'complete'
}
