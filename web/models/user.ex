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
    |> cast(params, @required_fields, @optional_fields)
    |> set_default_values
    |> unique_constraint(:email)
    |> unique_constraint(:name)
    |> validate_length(:name, min: 3)
    |> validate_format(:email, ~r/@/)
    |> validate_number(:wins, greater_than_or_equal_to: 0)
    |> validate_number(:losses, greater_than_or_equal_to: 0)
  end

  defp set_default_values(changeset) do
    case fetch_field(changeset, :wins) do
      {_, nil} -> changeset = put_change(changeset, :wins, 0)
      _ -> changeset
    end

    case fetch_field(changeset, :losses) do
      {_, nil} -> changeset = put_change(changeset, :losses, 0)
      _ -> changeset
    end

    case fetch_field(changeset, :details) do
      {_, nil} -> changeset = put_change(changeset, :details, %{streak: "", last_10: %{ wins: 0, losses: 0 }})
      _ -> changeset
    end
  end
end
