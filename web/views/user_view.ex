defmodule PhxPong.UserView do
  use PhxPong.Web, :view
  alias PhxPong.User

  def render("index.json", %{users: users}) do
    %{data: render_many(users, PhxPong.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render("user.json", %{user: user})}
  end

  def render("user.json", %{user: user}) do
    user
    |> Map.take([:id, :name, :wins, :losses, :taunt])
  end

  def win_pct(user) do
    user.win_pct
    |> Float.to_string([decimals: 3])
  end

  def rank(user, users) do
    n = Enum.sort(users, fn (a,b) -> win_pct(a) > win_pct(b) end)
     |> Enum.find_index(fn u -> u.id == user.id end)
     |> + 1

    s = ["th","st","nd","rd"]
    v = rem n, 100

    "#{n}#{(Enum.at(s, rem((v-20), 10)) || Enum.at(s, v) || Enum.at(s, 0))}"
  end

  def last_10(user) do
    user.log
      |> Enum.take(10)
      |> Enum.partition(fn result -> result == "W" end)
      |> Tuple.to_list
      |> Enum.map(&length/1)
      |> Enum.join(" - ")
  end
  def streak(user) do
    log = user.log
    streak_length = log
      |> Enum.reverse
      |> Enum.reduce_while(0, fn result, acc ->
        if result == List.last(log), do: {:cont, acc + 1}, else: {:halt, acc}
      end)
    "#{streak_length} #{List.last(log)}"
  end

  def opponent(game, user, users) do
    case (Enum.find users, fn _user ->
      _user.id == Enum.find(game.players, &(&1.user_id != user.id)).user_id
    end) do
      %User{} = user -> user.name
      _ -> "Guest"
    end
  end

  def score(game, user) do
    game.log
      |> Enum.group_by(&(&1 == user.id))
      |> Map.values
      |> Enum.map(fn points -> Enum.count points end)
  end

  def result([a, b]) when a > b, do: "W"
  def result([a, b]) when b > a, do: "L"
  def result([a, b]), do: "?"

  def status("complete"), do: "Final"
  def status(other), do: other
end
