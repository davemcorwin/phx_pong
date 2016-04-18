# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     PhxPong.Repo.insert!(%PhxPong.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias PhxPong.Repo
alias PhxPong.Game
alias PhxPong.Player
alias PhxPong.User

Repo.delete_all(Player)
Repo.delete_all(Game)
Repo.delete_all(User)

dave = Repo.insert!(%User{
  name: "Dave",
  email: "dave@launchpadlab.com",
  taunt: "BOOMshakalaka"
})

ryan = Repo.insert!(%User{
  name: "Ryan",
  email: "ryan@launchpadlab.com",
  taunt: "Jalapeeno"
})

users = [dave, ryan]
range = 0..21

gen_game = fn(_) ->
  first = Enum.random(users).id
  {[p1], [p2]} = Enum.partition(users, fn(user) -> user.id == first end)
  p1_points = Enum.random range
  p2_points = 21 - p1_points
  points =
    Enum.map(1..p1_points, fn(_idx) -> p1.id end) ++ Enum.map(1..p2_points, fn(_idx) -> p2.id end)
    |> Enum.shuffle
  winner = if p1_points > p2_points, do: p1.id, else: p2.id

  game = Repo.insert!(%Game{
    status: "complete",
    details: %{
      points:       points,
      first_server: p1.id,
      winner:       winner
    }
  })

  Repo.insert!(%Player{
    user_id: p1.id,
    game_id: game.id,
    score: p1_points
  })

  Repo.insert!(%Player{
    user_id: p2.id,
    game_id: game.id,
    score: p2_points
  })

  Repo.update!(User.game_complete(Repo.get(User, dave.id), (if winner == dave.id, do: :win, else: :lose)))
  Repo.update!(User.game_complete(Repo.get(User, ryan.id), (if winner == ryan.id, do: :win, else: :lose)))
end

Enum.each range, gen_game
