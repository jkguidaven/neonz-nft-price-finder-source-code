export default () => {
  return fetch("https://api.objkt.com/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      operationName: "getObjktDetailed",
      query: `
            query getObjktDetailed($fa2: String!) {
                token(where: {fa2_id: {_eq: $fa2}}) {
                    ...TokenDefault
                    ...TokenMarket
                    ...TokenHolders
                    __typename
                }
                }

                fragment TokenDefault on token {
                id
                artifact_uri
                creator_id
                description
                display_uri
                thumbnail_uri
                fa2_id
                royalties
                supply
                timestamp
                title
                mime
                last_listed
                highest_bid
                lowest_ask
                creator {
                    ...UserDefault
                    __typename
                }
                token_attributes {
                    attribute {
                    name
                    type
                    value
                    __typename
                    }
                    __typename
                }
                __typename
                }

                fragment UserDefault on holder {
                address
                alias
                site
                twitter
                description
                tzdomain
                __typename
                }

                fragment TokenMarket on token {
                english_auctions(where: {status: {_eq: "active"}}) {
                    ...EnglishAuctionDefault
                    __typename
                }
                dutch_auctions(where: {status: {_eq: "active"}}) {
                    ...DutchAuctionDefault
                    __typename
                }
                bids(order_by: {price: desc}, where: {status: {_eq: "active"}}) {
                    ...BidDefault
                    __typename
                }
                asks(order_by: {price: asc}, where: {status: {_eq: "active"}}) {
                    ...AskDefault
                    __typename
                }
                swaps(
                    order_by: {price: asc}
                    where: {status: {_eq: "active"}, contract_version: {_gt: 1}, is_valid: {_eq: true}}
                ) {
                    ...SwapDefault
                    __typename
                }
                __typename
                }

                fragment EnglishAuctionDefault on obj_english_auction {
                id
                hash
                fa2_id
                price_increment
                reserve
                royalties
                start_time
                status
                end_time
                timestamp
                token_id
                update_level
                update_timestamp
                hash
                artist {
                    ...UserDefault
                    __typename
                }
                bids {
                    ...EnglishAuctionBidsDefault
                    __typename
                }
                __typename
                }

                fragment EnglishAuctionBidsDefault on obj_english_bid {
                amount
                bidder {
                    ...UserDefault
                    __typename
                }
                bidder_id
                id
                timestamp
                __typename
                }

                fragment DutchAuctionDefault on obj_dutch_auction {
                id
                hash
                fa2_id
                buy_price
                start_price
                end_price
                end_time
                royalties
                start_time
                status
                timestamp
                token_id
                update_level
                update_timestamp
                hash
                artist {
                    ...UserDefault
                    __typename
                }
                buyer {
                    ...UserDefault
                    __typename
                }
                __typename
                }

                fragment BidDefault on obj_bid {
                id
                price
                royalties
                status
                timestamp
                token_id
                update_timestamp
                fa2_id
                artist {
                    ...UserDefault
                    __typename
                }
                creator {
                    ...UserDefault
                    __typename
                }
                seller {
                    ...UserDefault
                    __typename
                }
                __typename
                }

                fragment AskDefault on obj_ask {
                id
                amount
                amount_left
                price
                royalties
                status
                timestamp
                token_id
                update_timestamp
                fa2_id
                artist {
                    ...UserDefault
                    __typename
                }
                creator {
                    ...UserDefault
                    __typename
                }
                __typename
                }

                fragment SwapDefault on hen_swap {
                id
                amount
                amount_left
                price
                royalties
                status
                timestamp
                token_id
                creator {
                    ...UserDefault
                    __typename
                }
                __typename
                }

                fragment TokenHolders on token {
                token_holders(where: {quantity: {_gt: "0"}}) {
                    ...TokenHolderDefault
                    __typename
                }
                __typename
                }

                fragment TokenHolderDefault on token_holder {
                id
                holder_id
                quantity
                token_id
                holder {
                    ...UserDefault
                    __typename
                }
                __typename
                }
      `,
      variables: {
        fa2: "KT1MsdyBSAMQwzvDH4jt2mxUKJvBSWZuPoRJ",
      },
    }),
  })
    .then((r) => r.json())
    .then(({ data: { token } }) => {
      const finalData = token
        .map((neonz) => {
          return {
            id: Number(neonz.id),
            price: (neonz.asks.length ? neonz.asks[0].price : 0) ?? neonz.highest_bid,
          };
        })
        .filter((neonz) => {
          return neonz.price;
        })
        .sort((a, b) => a.price - b.price);
      return finalData;
    });
};
