defmodule PhxPong.User do
  use PhxPong.Web, :model

  alias PhxPong.Game
  alias PhxPong.Player

  @defaults %{
    wins: 0,
    losses: 0,
    details: %{
      "log" => [],
      "win_pct" => 0,
      "last_10" => "",
      "streak" => ""
    }
  }

  schema "users" do
    field :name,    :string
    field :email,   :string
    field :taunt,   :string
    field :wins,    :integer, default: @defaults.wins
    field :losses,  :integer, default: @defaults.losses
    field :details, :map,     default: @defaults.details

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
    |> update_log("W")
    |> update_win_pct
  end

  def game_complete(model, :lose) do
    model
    |> changeset(%{})
    |> put_change(:losses, model.losses + 1)
    |> update_log("L")
    |> update_win_pct
  end

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:name, min: 3)
    |> validate_format(:email, ~r/@/)
    |> validate_number(:wins, greater_than_or_equal_to: 0)
    |> validate_number(:losses, greater_than_or_equal_to: 0)
    |> unique_constraint(:email)
    |> unique_constraint(:name)
  end

  defp update_log(changeset, result) do
    put_map_change(changeset, :details, "log", &(&1 ++ [result]))
  end

  defp update_win_pct(changeset) do
    case {
      get_field(changeset, :wins),
      get_field(changeset, :losses)
    } do
      {_, 0} -> changeset
      {0, _} -> changeset
      {wins, losses} ->
        win_pct = wins / (wins + losses)
        put_change(changeset, :details, %{ get_field(changeset, :details) | "win_pct" => win_pct })
    end
  end
end
