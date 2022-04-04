defmodule CeiboLandWeb.JoeController do
  use CeiboLandWeb, :controller
  plug :put_root_layout, {CeiboLandWeb.LayoutView, "blank.html"}

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
