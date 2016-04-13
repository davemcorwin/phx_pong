defmodule PhxPong.GameView do
  use PhxPong.Web, :view

  alias PhxPong.Game

  def render("index.json", %{games: games}) do
    %{games: render_many(games, PhxPong.GameView, "game.json")}
  end

  def render("show.json", %{game: game}) do
    %{game: render("game.json", %{game: game})}
  end

  # def render("error.json", changeset) do
  #   %{errors: changeset.errors}
  # end
  #
  # def render("error.json", %{game: game}, changeset) do
  #   %{game: render("game.json", game), errors: changeset.errors}
  # end

  def render("game.json", %{game: game}) do
    %{
      id: game.id,
      status: game.status,
      details: game.details
    }
  end
end
