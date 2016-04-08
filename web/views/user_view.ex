defmodule PhxPong.UserView do
  use PhxPong.Web, :view

  alias PhxPong.User
  alias PhxPong.Game

  def win_pct(%User{wins: 0}), do: 0
  def win_pct(%User{losses: 0}), do: 0
  def win_pct(user) do
    100 * (user.wins / (user.wins + user.losses))
    |> Float.round(0)
    |> Float.to_string([decimals: 0])
  end

  def rank(user, users) do
    n = Enum.sort(users, fn (a,b) -> win_pct(a) > win_pct(b) end)
     |> Enum.find_index(fn u -> u.id == user.id end)
     |> + 1

    s = ["th","st","nd","rd"]
    v = rem n, 100

    "#{n}#{(Enum.at(s, rem((v-20), 10)) || Enum.at(s, v) || Enum.at(s, 0))}"
  end

  # def last_10(user) do
  #   results = Enum.sort (user.p1_games ++ user.p2_games), fn (a,b) -> a.updated_at > b.updated_at end
  #     |> Enum.take(10)
  #     |> Enum.group_by(fn game -> result(score(game, user)) end)
  #
  #     results
    # "#{Enum.length results.W} - #{Enum.length results.L}"
  # end

  def games(user, users) do
    Enum.map (user.p1_games ++ user.p2_games), fn game ->
      s = score(game, user)
      %{
        date: Ecto.DateTime.to_date(game.inserted_at),
        opponent: opponent(user, game, users),
        result: result(s),
        score: Enum.join(s, " - "),
        status: game.details["status"]
      } end
  end

  def opponent(%User{id: id}, game = %Game{p1_id: id}, users) do
    (Enum.find users, fn(user) -> user.id == game.p2_id end).name
  end

  def opponent(%User{id: id}, game = %Game{p2_id: id}, users) do
    (Enum.find users, fn(user) -> user.id == game.p2_id end).name
  end

  def score(game, user) do
    Enum.partition(game.details["points"], fn(id) -> id == user.id end)
      |> Tuple.to_list
      |> Enum.map(fn(points) -> length(points) end)
  end

  def result([a, b]) when a > b, do: "W"
  def result([a, b]) when b > a, do: "L"
  def result([a, b]), do: "?"
end
