defmodule PhxPong.Game do
  use PhxPong.Web, :model

  alias PhxPong.Player
  alias PhxPong.User

  schema "games" do
    field :status,  :string # ~w(pending in-progress complete)
    field :details, :map    # %{points: [<player_id>, <player_id>, ...], first_server: <player_id>, winner: <player_id> }

    has_many :players, Player
    has_many :users, through: [:players, :user]

    timestamps
  end

  @required_fields ~w(status)
  @optional_fields ~w(details)

  @statuses ~w(pending in-progress complete)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> set_default_values
    |> validate_inclusion(:status, @statuses)
    |> cast_assoc(:players, required: true)
  end

  defp set_default_values(changeset) do
    case fetch_field(changeset, :status) do
      {_, nil} -> changeset = put_change(changeset, :status, "pending")
      _ -> changeset
    end

    case fetch_field(changeset, :details) do
      {_, nil} -> changeset = put_change(changeset, :details, %{points: []})
      _ -> changeset
    end
  end
end
