defmodule PhxPong.PlayerView do
  use PhxPong.Web, :view

  def render("player.json", %{player: player}) do
    player
    |> Map.take([:id, :user_id, :game_id, :position, :score, :status])
    |> Map.put(:name, get_in(player, [:user, :name]) || "Player #{player.position}")
    |> Map.put(:taunt, get_in(player, [:user, :taunt]))
  end
end
