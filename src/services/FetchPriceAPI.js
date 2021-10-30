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
                    __typename
                }
                }

                fragment TokenDefault on token {
                id
                artifact_uri
                __typename
                }

                fragment TokenMarket on token {
                asks(order_by: {price: asc}, where: {status: {_eq: "active"}}) {
                    ...AskDefault
                    __typename
                }
                __typename
                }

                fragment AskDefault on obj_ask {
                price
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
            price: neonz.asks.length ? neonz.asks[0].price : 0,
          };
        })
        .filter((neonz) => {
          return neonz.price;
        })
        .sort((a, b) => a.price - b.price);
      return finalData;
    });
};
