export function currentServer(game) {

  const totalScore = game.player1Score + game.player2Score,
        modChanges = Math.floor(totalScore / 5) % 2

  return modChanges === 0 ? game.firstServer :
    game.firstServer === game.player1.id ? game.player2.id : game.player1.id

  // if (modChanges === 0) {
  //   return game.firstServer;
  // } else {
  //   return game.firstServer === this.data.player1._id ? this.data.player2._id : this.data.player1._id;
  // }
}

export function winner(game) {
  return game.winner ? game.winner === game.player1.id ? game.player1 : game.player2 : ''
}

export function isPending(game) {
  return false
}

export function inProgress(game) {
  return game.inProgress
}

export function isOver(game) {
  return false
}
