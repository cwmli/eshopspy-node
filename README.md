# Eshopspy

Backend node component of Eshop scraper for Nintendo Switch games with historical pricing data

Uses custom nintendo-switch-eshop module for sale filtering

## API

`/api/exchange?base=[BASE]`: Fetches exchange rates for `[BASE]` to USD.

`/api/eshopcarts`: Fetches all game cartridge data stored.

`/api/eshopcarts/:eshopCartId`: Fetch game cartridge data for nsuid of `eshopCartId`.

`/api/eshopus`: Fetches games from the American Switch EShop. Uses `offset`, `limit`, and `sale(optional)` as query parameters.

`/api/eshopprice`: Fetches prices for games specified in `gameIds` according to the currency of `country` query parameter.
