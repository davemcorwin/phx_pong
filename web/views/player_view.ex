defmodule PhxPong.PlayerView do
  use PhxPong.Web, :view

  def render("player.json", %{player: player}) do
    player
    |> Map.take([:id, :user_id, :game_id, :position, :score, :status])
    |> Map.put(:name, if(player.user_id, do: player.user.name, else: "Player #{player.position}"))
    |> Map.put(:taunt, if(player.user_id, do: player.user.taunt, else: ""))
  end
end
