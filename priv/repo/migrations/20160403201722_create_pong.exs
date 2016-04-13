defmodule PhxPong.Repo.Migrations.CreatePong do
  use Ecto.Migration

  def change do

    # Users
    create table(:users) do
      add :name,   :string
      add :email,  :string
      add :taunt,  :text,    default: "Taunt"
      add :wins,   :integer, default: 0
      add :losses, :integer, default: 0
      add :details, :map

      timestamps
    end

    create unique_index(:users, [:name])
    create unique_index(:users, [:email])

    # Games
    create table(:games) do
      add :status,  :string # ~w(pending in-progress complete)
      add :details, :map    # %{"points" => [<player_id>, <player_id>, ...], first_server => <player_id> }

      timestamps
    end

    # Players
    create table(:players) do
      add :user_id, references(:users)
      add :game_id, references(:games)
      add :score, :integer, default: 0
    end

    create index(:players, [:user_id])
    create index(:players, [:game_id])
    create unique_index(:players, [:user_id, :game_id], name: :players_user_game_index)
  end
end
