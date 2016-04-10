export function currentServer(game) {

  const totalScore = game.player1Score + game.player2Score,
        modChanges = Math.floor(totalScore / 5) % 2

  return modChanges === 0 ? game.firstServer :
    game.firstServer === game.player1.id ? game.player2.id : game.player1.id
}

export function winner(game) {
  return game.details.winner ? game.details.winner === game.player1.id ? game.player1 : game.player2 : null
}

export function isPending(game) {
  return game.status === 'pending'
}

export function inProgress(game) {
  return game.status === 'in-progress'
}

export function isOver(game) {
  return game.status === 'over'
}
