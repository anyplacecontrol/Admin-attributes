export const FAKE_COOKING_TIPS = {
  count: 3,
  data: [
    {
      id: 1,
      text: "fancy cooking tip added using Postman 1",
      title: "Best way to cook Beef Ground 1",
      createdAt: "2019-11-05T16:10:45.834Z",
      updatedAt: "2019-11-05T16:10:45.834Z",
      productId: "34213273-4c7b-11e9-8892-a509189f5d34",
    },
    {
      id: 2,
      text: "fancy cooking tip added using Postman 2",
      title: "Best way to cook Beef Ground 2",
      createdAt: "2019-11-05T16:21:59.637Z",
      updatedAt: "2019-11-05T16:21:59.637Z",
      productId: "34213273-4c7b-11e9-8892-a509189f5d34",
    },
    {
      id: 3,
      text: "fancy cooking tip added using Postman 3",
      title: "Best way to cook Beef Stew Lean",
      createdAt: "2019-11-05T16:22:14.469Z",
      updatedAt: "2019-11-05T16:22:14.469Z",
      productId: "34213274-4c7b-11e9-8892-a509189f5d34",
    }
  ]
};
// {
//   id: 1,
//   name: "Beef Stir-Fry",
//   products: [
//     {
//       id: "3420bd40-4c7b-11e9-8892-a509189f5d34",
//       name: "Beef brisket",
//       categories: [
//         {
//           id: 9,
//           name: "Beef"
//         }
//       ]
//     },
//     {
//       id: "34210b60-4c7b-11e9-8892-a509189f5d34",
//       name: "Beef stew chuck",
//       categories: [
//         {
//           id: 9,
//           name: "Beef"
//         }
//       ]
//     }
//   ],
//   status: {
//     id: 2,
//     name: "Disabled"
//   }
// },
// {
//   id: 2,
//   name: "Pork Bottom Round Roast",
//   products: [
//     {
//       id: "34210b60-4c7b-11e9-8892-a509189f5d34",
//       name: "Pork stew chuck",
//       categories: [
//         {
//           id: 9,
//           name: "Pork"
//         }
//       ]
//     },
//     {
//       id: "3420bd40-4c7b-11e9-8892-a509189f5d34",
//       name: "Beef brisket",
//       categories: [
//         {
//           id: 9,
//           name: "Beef"
//         }
//       ]
//     }
//   ],
//   status: {
//     id: 1,
//     name: "Enabled"
//   }
// }

export const FAKE_COOKING_TIPS_RESPONSE = {
  items: FAKE_COOKING_TIPS,
  maxItemsQty: FAKE_COOKING_TIPS.length,
  topRowNumber: 0
};
