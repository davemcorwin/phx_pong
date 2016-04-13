defmodule PhxPong.GameController do
  use PhxPong.Web, :controller

  alias PhxPong.Game
  alias PhxPong.Player

  plug :scrub_params, "game" when action in [:create, :update]

  def index(conn, _params) do
    games = Repo.all(Game) |> Repo.preload(:users)
    render(conn, :index, games: games)
  end

  def create(conn, params) do
    changeset = Game.changeset(%Game{}, %{"game" => game} = params)

    case Repo.insert(changeset) do
      {:ok, game} ->
        Repo.insert!(Player.changeset(%Player{}, %{game_id: game.id}, Enum.at(params.players, 0)))
        Repo.insert!(Player.changeset(%Player{}, %{game_id: game.id}, Enum.at(params.players, 1)))
        render(conn, :show, game: game)
      {:error, changeset} ->
        render(conn, :error, changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    game = Repo.get!(Game, id) |> Repo.preload(:users)
    render(conn, :show, game: game)
  end

  def update(conn, %{"id" => id, "game" => game_params}) do
    game = Repo.get!(Game, id)
    changeset = Game.changeset(game, game_params)

    case Repo.update(changeset) do
      {:ok, game} ->
        render(conn, :show, game: game)
      {:error, changeset} ->
        render(conn, :error, game: game, changeset: changeset)
    end
  end
end
