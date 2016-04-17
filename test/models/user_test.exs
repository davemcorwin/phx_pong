defmodule PhxPong.UserTest do
  use PhxPong.ModelCase

  alias PhxPong.User

  @valid_attrs %{
    name: "a name",
    email: "dave@email.com"
  }

  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "name must be at least 3 characters" do
    attrs = Map.put @valid_attrs, :name, "fo"
    assert {:name, {"should be at least %{count} character(s)", [count: 3]}}
      in errors_on(%User{}, attrs)
  end

  test "email must be a valid email address" do
    attrs = Map.put @valid_attrs, :email, "foo"
    assert {:email, "has invalid format"}
      in errors_on(%User{}, attrs)
  end

  test "wins must be greater than or equal to 0" do
    attrs = Map.put @valid_attrs, :wins, -1
    assert {:wins, {"must be greater than or equal to %{count}", [count: 0]}}
      in errors_on(%User{}, attrs)
  end

  test "losses must be greater than or equal to 0" do
    attrs = Map.put @valid_attrs, :losses, -1
    assert {:losses, {"must be greater than or equal to %{count}", [count: 0]}}
      in errors_on(%User{}, attrs)
  end

  test "game_complete(model, :win) increments wins" do
    user = %User{
      name: "a name",
      email: "dave@email.com",
      details: %{ "log" => [] },
      wins: 2
    }

    changeset = User.game_complete(user, :win)
    assert get_change(changeset, :wins) == user.wins + 1
  end

  test "game_complete(model, :win) adds W to log" do
    user = %User{
      name: "a name",
      email: "dave@email.com",
      details: %{ "log" => [] },
      wins: 2
    }

    changeset = User.game_complete(user, :win)
    assert logged_results(get_change(changeset, :details), "W") == logged_results(user.details, "W") + 1
  end

  test "game_complete(model, :win) updates win pct" do
    user = %User{
      name: "a name",
      email: "dave@email.com",
      wins: 2,
      losses: 2
    }

    changeset = User.game_complete(user, :win)
    assert get_change(changeset, :details) |> Map.get("win_pct") == 3/5
  end

  test "game_complete(model, :lose) increments losses" do
    user = %User{
      name: "a name",
      email: "dave@email.com",
      details: %{ "log" => [] },
      losses: 2
    }

    changeset = User.game_complete(user, :lose)
    assert get_change(changeset, :losses) == user.losses + 1
  end

  test "game_complete(model, :lose) adds L to log" do
    user = %User{
      name: "a name",
      email: "dave@email.com",
      details: %{ "log" => [] },
      losses: 3
    }

    changeset = User.game_complete(user, :lose)
    assert logged_results(get_change(changeset, :details), "L") == logged_results(user.details, "L") + 1
  end

  test "game_complete(model, :lose) updates win pct" do
    user = %User{
      name: "a name",
      email: "dave@email.com",
      wins: 2,
      losses: 2
    }

    changeset = User.game_complete(user, :lose)
    assert get_change(changeset, :details) |> Map.get("win_pct") == 2/5
  end

  defp logged_results(details, result) do
    details
    |> Map.get("log")
    |> Enum.count(&(&1 == result))
  end
end
