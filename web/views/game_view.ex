defmodule PhxPong.GameView do
  use PhxPong.Web, :view

  alias PhxPong.Game
  alias PhxPong.UserView

  @attributes ~w(id details)

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
      details: game.details,
      p1: UserView.render("user.json", %{user: game.p1}),
      p2: UserView.render("user.json", %{user: game.p2})
    }
  end
end
