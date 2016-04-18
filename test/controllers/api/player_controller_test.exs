defmodule PhxPong.PlayerControllerTest do
  use PhxPong.ConnCase

  alias PhxPong.User

  test "renders json for all users" do

    user_ids =
      [Repo.insert!(%User{}),
        Repo.insert!(%User{})]
      |> Enum.map(&(&1.id))

    conn = get conn, player_path(conn, :index)

    response_ids =
      json_response(conn, :ok)
      |> Map.get("data")
      |> Enum.map(&(Map.get(&1, "id")))

    assert Enum.all?(user_ids, &(&1 in response_ids))
  end
end
