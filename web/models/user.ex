defmodule PhxPong.User do
  use PhxPong.Web, :model

  alias PhxPong.Game

  schema "users" do
    field :name,   :string
    field :email,  :string
    field :taunt,  :string
    field :wins,   :integer
    field :losses, :integer

    has_many :p1_games, Game, foreign_key: :p1_id
    has_many :p2_games, Game, foreign_key: :p2_id

    timestamps
  end

  @required_fields ~w(name email)
  @optional_fields ~w(taunt wins losses)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:email)
    |> unique_constraint(:name)
    |> validate_length(:name, min: 3)
    |> validate_format(:email, ~r/@/)
    |> validate_number(:wins, greater_than_or_equal_to: 0)
    |> validate_number(:losses, greater_than_or_equal_to: 0)
  end
end
