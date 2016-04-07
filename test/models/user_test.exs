defmodule PhxPong.UserTest do
  use PhxPong.ModelCase

  alias PhxPong.User

  @valid_attrs %{email: "some content", losses: 42, name: "some content", taunt: "some content", wins: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
