ExUnit.start

Mix.Task.run "ecto.create", ~w(-r PhxPong.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r PhxPong.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(PhxPong.Repo)

