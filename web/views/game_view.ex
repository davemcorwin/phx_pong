defmodule PhxPong.GameView do
  use PhxPong.Web, :view

  alias PhxPong.Game

  def render("index.json", %{games: games}) do
    %{data: render_many(games, PhxPong.GameView, "game.json")}
  end

  def render("show.json", %{game: game}) do
    %{data: render("game.json", %{game: game})}
  end

  def render("error.json", %{changeset: changeset}) do
    %{errors: Ecto.Changeset.traverse_errors(changeset, fn
      {msg, opts} -> String.replace(msg, "%{count}", to_string(opts[:count]))
      msg -> msg
    end)}
  end

  def render("error.json", %{game: game}, %{changeset: changeset}) do
    %{data: render("game.json", game), errors: Ecto.Changeset.traverse_errors(changeset, fn
      {msg, opts} -> String.replace(msg, "%{count}", to_string(opts[:count]))
      msg -> msg
    end)}
  end

  def render("game.json", %{game: game}) do
    game
    |> Map.take([:id, :status, :winner, :first_server, :log])
    |> Map.put(:players, render_many(game.players, PhxPong.PlayerView, "player.json"))
    |> Map.put(:player1, render_one(Enum.at(game.players,0), PhxPong.PlayerView, "player.json"))
    |> Map.put(:player2, render_one(Enum.at(game.players,1), PhxPong.PlayerView, "player.json"))
  end
end
