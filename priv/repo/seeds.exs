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

Enum.each(range, fn(_) ->
  [p1_id, p2_id] =
    users
    |> Enum.map(&(&1.id))
    |> Enum.shuffle

  p1_points = Enum.random range
  p2_points = 21 - p1_points
  points =
    Enum.map(1..p1_points, fn(_idx) -> p1_id end) ++ Enum.map(1..p2_points, fn(_idx) -> p2_id end)
    |> Enum.shuffle
  winner = if p1_points > p2_points, do: p1_id, else: p2_id

  Repo.insert!(Game.changeset(%Game{}, %{
    status:       "complete",
    log:          points,
    first_server: p1_id,
    winner:       winner,
    players: [ %{
      user_id: p1_id,
      score: p1_points,
      position: 1
    }, %{
      user_id: p2_id,
      score: p2_points,
      position: 2
    }]
  }))

  Repo.update!(User.game_complete(Repo.get(User, dave.id), (if winner == dave.id, do: :win, else: :lose)))
  Repo.update!(User.game_complete(Repo.get(User, ryan.id), (if winner == ryan.id, do: :win, else: :lose)))
end)
