defmodule PhxPong.Game do
  use PhxPong.Web, :model

  schema "games" do
    belongs_to :p1, User
    belongs_to :p2, User
    field :details, :map
    timestamps
  end

  @required_fields ~w(p1 p2)
  @optional_fields ~w(details)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
