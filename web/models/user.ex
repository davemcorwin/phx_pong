defmodule PhxPong.User do
  use PhxPong.Web, :model

  alias PhxPong.Game
  alias PhxPong.Player

  schema "users" do
    field :name,   :string
    field :email,  :string
    field :taunt,  :string
    field :wins,   :integer, default: 0
    field :losses, :integer, default: 0
    field :details, :map  # %{log: ["W", "L", ...]}

    has_many :players, Player
    has_many :games, through: [:players, :game]

    timestamps
  end

  @required_fields ~w(name email wins losses details)
  @optional_fields ~w(taunt)
  @default_values [
    wins: 0,
    losses: 0,
    details: %{"log" => []}
  ]

  def game_complete(model, :win) do
    model
    |> changeset(%{})
    |> put_change(:wins, model.wins + 1)
    |> put_change(:details, Map.update!(model.details, "log", &(&1 ++ ["W"])))
  end

  def game_complete(model, :lose) do
    model
    |> changeset(%{})
    |> put_change(:losses, model.losses + 1)
    |> put_change(:details, Map.update!(model.details, "log", &(&1 ++ ["L"])))
  end

  def changeset(model, params \\ :empty) do
    model
    |> cast(set_defaults(params), @required_fields, @optional_fields)
    |> validate_length(:name, min: 3)
    |> validate_format(:email, ~r/@/)
    |> validate_number(:wins, greater_than_or_equal_to: 0)
    |> validate_number(:losses, greater_than_or_equal_to: 0)
    |> unique_constraint(:email)
    |> unique_constraint(:name)
  end

  defp set_defaults(params) do
    Enum.reduce(@default_values, params, fn dflt, acc ->
      Map.put_new(acc, elem(dflt,0), elem(dflt,1))
    end)
  end
end
