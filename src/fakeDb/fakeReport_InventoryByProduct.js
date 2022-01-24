export const FAKE_INVENTORY_BY_PRODUCT_TYPE = [
  {
    name: "Beef Flat Iron Steak",
    itemsInStock: 122,
    itemsExpiring: 82
  },
  {
    name: "Beef Ribeye Steak (Bone Out)",
    itemsInStock: 122,
    itemsExpiring: 18
  },
  {
    name: "Beef Tenderloin Steak",
    itemsInStock: 412,
    itemsExpiring: 1
  },
  {
    name: "Pork Cutlets",
    itemsInStock: 112,
    itemsExpiring: 4
  },
  {
    name: "Pork Rib Сhops",
    itemsInStock: 2,
    itemsExpiring: 5
  }
];

export const FAKE_INVENTORY_BY_PRODUCT_TYPE_TOTALS = {
  name: "TOTAL",
  itemsInStock: 1234,
  itemsExpiring: 25
};

export const FAKE_INVENTORY_BY_PRODUCT_RESPONSE = {
  items: {
    items: FAKE_INVENTORY_BY_PRODUCT_TYPE,
    totals: FAKE_INVENTORY_BY_PRODUCT_TYPE_TOTALS
  }
};
