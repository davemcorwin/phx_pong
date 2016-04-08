defmodule PhxPong.Router do
  use PhxPong.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", PhxPong do
    pipe_through :browser # Use the default browser stack

    resources "/users", UserController
    get "/", UserController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", PhxPong do
  #   pipe_through :api
  # end
end
