defmodule PhxPong.Repo.Migrations.CreateGame do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :p1_id,        references(:users)
      add :p2_id,        references(:users)
      add :details,      :map
      timestamps
    end
  end
end
