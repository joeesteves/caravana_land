defmodule Trello do
  @base "https://api.trello.com/1/cards"

  def create_card(card = %{}) do
    HTTPoison.post(api_url(), Jason.encode!(card), [{"Content-Type", "application/json"}])
  end

  defp api_url do
    @base <> "?key=#{trello_key()}&token=#{trello_token()}&idList=#{trello_id_list()}"
  end

  def trello_key, do: Application.get_env(:ceibo_land, :trello_key)
  def trello_token, do: Application.get_env(:ceibo_land, :trello_token)
  def trello_id_list, do: Application.get_env(:ceibo_land, :trello_id_list)
end
