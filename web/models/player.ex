defmodule PhxPong.Player do
  use PhxPong.Web, :model

  alias PhxPong.Game
  alias PhxPong.Player
  alias PhxPong.User

  schema "players" do
    belongs_to :user, User
    belongs_to :game, Game
    field :score, :integer, default: 0
  end

  @required_fields ~w(user_id game_id score)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> assoc_constraint(:user)
    |> assoc_constraint(:game)
    |> unique_constraint(:game_id, name: :players_user_game_index)
    |> validate_number(:score, greater_than_or_equal_to: 0)
  end
end
