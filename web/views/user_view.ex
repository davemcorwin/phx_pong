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

  def games(user, users) do
    Enum.map (user.p1_games ++ user.p2_games), fn(game) ->
      s = scores(user, game)
      %{
        date: Ecto.DateTime.to_date(game.inserted_at),
        opponent: opponent(user, game, users),
        result: result(s),
        score: "#{inspect elem(s,0)} - #{elem(s,1)}" 
      } end
  end

  def opponent(%User{id: id}, game = %Game{p1_id: id}, users) do
    (Enum.find users, fn(user) -> user.id == game.p2_id end).name
  end

  def opponent(%User{id: id}, game = %Game{p2_id: id}, users) do
    (Enum.find users, fn(user) -> user.id == game.p2_id end).name
  end

  def scores(user, game) do
    Enum.partition(game.details["points"], fn(id) -> id == user.id end)
      |> Tuple.to_list
      |> Enum.map(fn(points) -> length(points) end)
      |> List.to_tuple
  end

  def result({a, b}) when a > b do
    "W"
  end

  def result({a, b}) when b > a do
    "L"
  end

  def result({a, b}) do
    "?"
  end
end
