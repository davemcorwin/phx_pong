defmodule PhxPong.ConsoleController do
  use PhxPong.Web, :controller

  def main_menu(conn, _params) do
    render(conn, "main_menu.html")
  end
end
