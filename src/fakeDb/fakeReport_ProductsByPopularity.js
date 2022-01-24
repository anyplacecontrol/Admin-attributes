export const FAKE_PRODUCTS_BY_POPULARITY = [
  {
    popularity: 100,
    name: "Beef brisket",
    categories: [
      {
        name: "Beef"
      }
    ]
  },

  {
    popularity: 99,
    name: "Beef stew chuck",
    categories: [
      {
        name: "Beef"
      }
    ]
  },

  {
    popularity: 80,
    name: "Beef porterhouse steak",
    categories: [
      {
        name: "Beef"
      }
    ]
  },

  {
    popularity: 807,
    name: "Beef chuck roast",
    categories: [
      {
        name: "Beef"
      }
    ]
  }
];

export const FAKE_PRODUCTS_BY_POPULARITY_TOTALS = {
  name: "TOTAL",
  popularity: 12344
};

export const FAKE_PRODUCTS_BY_POPULARITY_RESPONSE = {
  items: {
  items: FAKE_PRODUCTS_BY_POPULARITY,
  totals: FAKE_PRODUCTS_BY_POPULARITY_TOTALS
  }
};
