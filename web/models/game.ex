defmodule PhxPong.Game do
  use PhxPong.Web, :model

  alias PhxPong.User

  schema "games" do
    belongs_to :p1, User
    belongs_to :p2, User
    field :details, :map
    timestamps
  end

  @required_fields ~w(details)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    # |> put_assoc(:p1, required: true)
    # |> put_assoc(:p2, required: true)
  end
end
