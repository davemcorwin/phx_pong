defmodule PhxPong.GameControllerTest do
  use PhxPong.ConnCase

  alias PhxPong.Game
  alias PhxPong.User

  @valid_attrs %{ players: [
    %{ user_id: Repo.insert!(%User{}) },
    %{ user_id: Repo.insert!(%User{}) }
  ]}

  @invalid_attrs %{ players: [ %{ user_id: -1 } ]}

  test "renders json for all games" do

    game_ids =
      [Repo.insert!(Game.changeset(@valid_attrs)),
        Repo.insert!(Game.changeset(@valid_attrs))]
      |> Enum.map(&(&1.id))

    conn = get conn, game_path(conn, :index)

    response_ids =
      json_response(conn, :ok)
      |> Map.get("games")
      |> Enum.map(&(Map.get(&1, "id")))

    assert Enum.all?(game_ids, &(&1 in response_ids))
  end

  test "renders json for the game" do

    game = Repo.insert!(Game.changeset(@valid_attrs))

    conn = get conn, game_path(conn, :show, game)

    response_id =
      json_response(conn, :ok)
      |> get_in(["game", "id"])

    assert game.id == response_id
  end

  test "creates resource and redirects when data is valid", %{conn: conn} do

    conn = post conn, game_path(conn, :create), game: @valid_attrs

    assert json_response(conn, :ok) |> Map.has_key?("game")
    assert Repo.get_by(Game, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, game_path(conn, :create), game: @invalid_attrs
    assert json_response(conn, :conflict) |> Map.has_key?("errors")
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, game_path(conn, :show, -1)
    end
  end

  test "updates chosen resource and redirects when data is valid", %{conn: conn} do
    game = Repo.insert! Game.changeset(@valid_attrs)
    conn = put conn, game_path(conn, :update, game), game: @valid_attrs
    assert json_response(conn, :ok) |> Map.has_key?("game")
    assert Repo.get_by(Game, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    game = Repo.insert! Game.changeset(@valid_attrs)
    conn = put conn, game_path(conn, :update, game), game: @invalid_attrs
    assert json_response(conn, :conflict) |> Map.has_key?("errors")
  end
end
