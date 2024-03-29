# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

# Configures the endpoint
config :ceibo_land, CeiboLandWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "zA9/4UnPbXPi7laSSu/BUPK96J+loeycxq26KNPObI4mYK9TYaaKeEH4R57B/HR8",
  render_errors: [view: CeiboLandWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: CeiboLand.PubSub,
  live_view: [signing_salt: "iRkDIVAG"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :ceibo_land,
  trello_key: System.get_env("TRELLO_KEY"),
  trello_token: System.get_env("TRELLO_TOKEN"),
  trello_id_list: "60799d81fcaa6d32260c43e3"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
