use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :phx_pong, PhxPong.Endpoint,
  secret_key_base: "erqVkeyNHZ0+3jEHDI3w0p+7c/Z0u37i3q4UcWUJm6jD5jT5SxAVyk2r4UUXYzMm"

# Configure your database
config :phx_pong, PhxPong.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "phx_pong_prod",
  pool_size: 20
