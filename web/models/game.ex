defmodule PhxPong.Game do
  use PhxPong.Web, :model

  alias PhxPong.Player
  alias PhxPong.User

  @statuses ~w(pending in-progress complete)

  @defaults %{
    status: "pending",
    log:    []
  }

  schema "games" do
    field :status,       :string, default: @defaults.status
    field :first_server, :integer
    field :winner,       :integer
    field :log,          {:array, :integer}, default: @defaults.log

    has_many :players, Player
    has_many :users, through: [:players, :user]

    timestamps
  end

  @required_fields ~w(status log)
  @optional_fields ~w(first_server winner)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_inclusion(:status, @statuses)
    |> cast_assoc(:players, required: true)
  end
end
