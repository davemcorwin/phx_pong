export function isServer(game, player) {

  if (game.status !== 'in-progress') return false

  const totalScore = game.players.reduce((player, acc) => acc + player.score, 0),
        modChanges = Math.floor(totalScore / 5) % 2

  return modChanges !== 0 ? (player.id === game.first_server) : (player.id !== game.first_server)
}

export function winner(game) {
  return game.winner ? game.winner === game.player1.id ? game.player1 : game.player2 : null
}

export function isPending(game) {
  return game.status === 'pending'
}

export function inProgress(game) {
  return game.status === 'in-progress'
}

export function isOver(game) {
  return game.status === 'complete'
}
