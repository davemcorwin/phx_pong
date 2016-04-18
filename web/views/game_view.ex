defmodule PhxPong.GameView do
  use PhxPong.Web, :view

  alias PhxPong.Game

  def render("index.json", %{games: games}) do
    %{games: render_many(games, PhxPong.GameView, "game.json")}
  end

  def render("show.json", %{game: game}) do
    %{game: render("game.json", %{game: game})}
  end

  def render("error.json", %{changeset: changeset}) do
    %{errors: Ecto.Changeset.traverse_errors(changeset, fn
      {msg, opts} -> String.replace(msg, "%{count}", to_string(opts[:count]))
      msg -> msg
    end)}
  end

  def render("error.json", %{game: game}, %{changeset: changeset}) do
    %{game: render("game.json", game), errors: Ecto.Changeset.traverse_errors(changeset, fn
      {msg, opts} -> String.replace(msg, "%{count}", to_string(opts[:count]))
      msg -> msg
    end)}
  end

  def render("game.json", %{game: game}) do
    players = render_many(game.players, PhxPong.PlayerView, "player.json")

    %{
      id: game.id,
      status: game.status,
      players: players,
      player1: Enum.at(players,0),
      player2: Enum.at(players,1)
    }
    |> Map.merge(game.details)
  end
end
