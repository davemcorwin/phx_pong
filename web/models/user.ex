defmodule PhxPong.User do
  use PhxPong.Web, :model

  alias PhxPong.Game
  alias PhxPong.Player

  @defaults %{
    wins: 0,
    losses: 0,
    log: [],
    win_pct: 0.0
  }

  schema "users" do
    field :name,    :string
    field :email,   :string
    field :taunt,   :string
    field :wins,    :integer, default: @defaults.wins
    field :losses,  :integer, default: @defaults.losses
    field :log,     {:array, :string}, default: @defaults.log
    field :win_pct, :float, default: @defaults.win_pct
    field :last_10, :string
    field :streak,  :string

    has_many :players, Player
    has_many :games, through: [:players, :game]

    timestamps
  end

  @required_fields ~w(name email wins losses log win_pct)
  @optional_fields ~w(taunt last_10 streak)

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
    |> validate_number(:win_pct, greater_than_or_equal_to: 0.0, less_than_or_equal_to: 1.0)
    |> unique_constraint(:email)
    |> unique_constraint(:name)
  end

  defp update_log(changeset, result) do
    log = get_field(changeset, :log)
    put_change(changeset, :log, log ++ [result])
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
        put_change(changeset, :win_pct, win_pct)
    end
  end
end
