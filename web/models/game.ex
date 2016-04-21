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
    |> check_first_server
    |> check_win
  end

  defp check_first_server(changeset) do
    if get_field(changeset, :status) == "pending" do
      case get_change(changeset, :first_server) do
        nil -> changeset
          _ -> put_change(changeset, :status, "in-progress")
      end
    else
      changeset
    end
  end

  defp check_win(changeset) do

    [p1, p2] = get_field(changeset, :players)

    cond do
      p1.score > 20 && p1.score >= p2.score + 2 ->
        changeset
        |> put_change(:winner, p1.id)
        |> put_change(:status, "complete")
      p2.score > 20 && p2.score >= p1.score + 2  ->
        changeset
        |> put_change(:winner, p2.id)
        |> put_change(:status, "complete")
      true ->
        changeset
    end
  end
end
