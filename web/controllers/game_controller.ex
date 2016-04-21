defmodule PhxPong.GameController do
  use PhxPong.Web, :controller

  alias PhxPong.Game

  plug :scrub_params, "game" when action in [:create, :update]

  def index(conn, _params) do
    games = Repo.all(Game) |> Repo.preload(:users)
    render(conn, :index, games: games)
  end

  def create(conn, %{"game" => game_params}) do
    changeset = Game.changeset(%Game{}, game_params)

    IO.inspect changeset


    case Repo.insert(changeset) do
      {:ok, game} ->
        render(conn, :show, game: game)
      {:error, changeset} ->
        conn
        |> put_status(:conflict)
        |> render(:error, changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    game = Repo.get!(Game, id) |> Repo.preload(:users)
    render(conn, :show, game: game)
  end

  def update(conn, %{"id" => id, "game" => game_params}) do
    game = Repo.get!(Game, id) |> Repo.preload(:users)
    changeset = IO.inspect Game.changeset(game, game_params)

    case Repo.update(changeset) do
      {:ok, game} ->
        render(conn, :show, game: game)
      {:error, changeset} ->
        conn
        |> put_status(:conflict)
        |> render(:error, game: game, changeset: changeset)
    end
  end
end
