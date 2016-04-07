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
alias PhxPong.User
alias PhxPong.Game

Repo.delete_all(Game)
Repo.delete_all(User)

dave = Repo.insert!(%User{
  name: "Dave",
  email: "dave@launchpadlab.com",
  taunt: "BOOMshakalaka",
  wins: 0,
  losses: 0
})

ryan = Repo.insert!(%User{
  name: "Ryan",
  email: "ryan@launchpadlab.com",
  taunt: "Jalapeeno",
  wins: 0,
  losses: 0
})

users = [dave, ryan]
range = 0..21

gen_game = fn(_idx) ->
  first = Enum.random(users).id
  {[p1], [p2]} = Enum.partition(users, fn(user) -> user.id == first end)
  p1_points = Enum.random range
  p2_points = 21 - p1_points
  points =
    Enum.map(1..p1_points, fn(_idx) -> p1.id end) ++ Enum.map(1..p2_points, fn(_idx) -> p2.id end)
    |> Enum.shuffle

  Repo.insert!(%Game{
    p1_id:   p1.id,
    p2_id:   p2.id,
    details: %{
      points:       points,
      first_server: p1.id,
      status:       0
    }
  })

  if p1.id == dave.id && p1_points > p2_points, do: 1, else: 0
end

dave_wins = Enum.map(range, gen_game) |> Enum.sum

Repo.update!(User.changeset(dave, %{
  wins: dave_wins,
  losses: 22 - dave_wins
}))

Repo.update!(User.changeset(ryan, %{
  losses: dave_wins,
  wins: 22 - dave_wins
}))
