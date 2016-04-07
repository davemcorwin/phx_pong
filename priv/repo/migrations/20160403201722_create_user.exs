defmodule PhxPong.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name,   :string
      add :email,  :string
      add :taunt,  :text,    default: "Taunt"
      add :wins,   :integer, default: 0
      add :losses, :integer, default: 0

      timestamps
    end

    create unique_index(:users, [:name])
    create unique_index(:users, [:email])
  end
end
