FROM elixir:1.10-alpine AS build

# install build dependencies
RUN apk add --no-cache build-base npm git

# prepare build dir
WORKDIR /app

# install hex + rebar
RUN mix local.hex --force && \
    mix local.rebar --force

ENV MIX_ENV=prod

# install mix dependencies
COPY mix.exs mix.lock ./
COPY config config
RUN mix do deps.get, deps.compile

# copy lib before tailwind purge is done!
COPY lib lib

# build assets
COPY assets/package.json assets/package-lock.json ./assets/
RUN npm --prefix ./assets ci --progress=false --no-audit --loglevel=error

COPY priv priv
COPY assets assets
RUN npm run --prefix ./assets deploy
RUN mix phx.digest

# compile and build release

# uncomment COPY if rel/ exists
# COPY rel rel
RUN mix do compile, release

#prepare release image
FROM alpine:3.9 AS app
RUN apk add --no-cache openssl ncurses-libs bash

WORKDIR /app

RUN chown nobody:nobody /app

USER nobody:nobody

COPY --from=build --chown=nobody:nobody /app/_build/prod/rel/ceibo_land ./

ENV HOME=/app

CMD ["bin/ceibo_land", "start"]


