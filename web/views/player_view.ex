defmodule PhxPong.PlayerView do
  use PhxPong.Web, :view

  alias PhxPong.Player

  def render("player.json", %{player: player}) do
    Map.merge(
      Map.take(player, [:id, :user_id, :game_id, :score, :status]),
      Map.take(player.user, [:name, :taunt, :wins, :losses])
    )
  end
end
