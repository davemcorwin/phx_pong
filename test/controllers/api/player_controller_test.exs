defmodule PhxPong.PlayerControllerTest do
  use PhxPong.ConnCase

  alias PhxPong.User
  @valid_attrs %{email: "dave@email.com", name: "dave corwin"}
  @invalid_attrs %{}

  test "renders json for all users" do

    names =
      [Repo.insert!(%User{name: "foo"}),
        Repo.insert!(%User{name: "bar"})]
      |> Enum.map(&(&1.name))

    conn = get conn, player_path(conn, :index)

    response_names =
      json_response(conn, :ok)
      |> Map.get("data")
      |> Enum.map(&(Map.get(&1, "name")))

    assert Enum.all?(names, &(&1 in response_names))
  end
end
