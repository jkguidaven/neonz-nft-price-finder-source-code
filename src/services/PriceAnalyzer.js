const GOOD_DEAL_THRESHOLD = 50;

export default function (data) {
  const priceSorted = [...data].reverse();
  const rankSorted = [...data].sort((a, b) => a.rank - b.rank);

  for (let i = 0; i < rankSorted.length; i++) {
    const item = rankSorted[i];

    const priceRank = priceSorted.findIndex(({ id }) => item.id === id);
    const betterPriceThanMost = priceRank - i;
    item.score = (betterPriceThanMost / rankSorted.length) * 100;
    item.good = item.score > GOOD_DEAL_THRESHOLD;
  }
}
