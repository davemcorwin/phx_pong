defmodule PhxPong.PlayerView do
  use PhxPong.Web, :view

  alias PhxPong.Player

  def render("player.json", %{player: player}) do
    %{
      id: player.id,
      user_id: player.user_id,
      game_id: player.game_id,
      score: player.score,
      name: player.user.name,
      taunt: player.user.taunt,
      wins: player.user.wins,
      losses: player.user.losses
    }
  end
end
