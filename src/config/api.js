export const CoinList = (_currency, _order) => {
  return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${_currency}&order=${_order}&per_page=100&page=1&sparkline=false/`;
}

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=CAD&days=${days}`;
