defmodule PhxPong.ConsoleController do
  use PhxPong.Web, :controller

  def main_menu(conn, _params) do
    conn
    |> put_layout("console.html")
    |> render("main_menu.html")
  end
end
