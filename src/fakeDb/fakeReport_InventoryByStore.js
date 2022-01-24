export const FAKE_INVENTORY_BY_STORE = [
  {
    name: "Store #1",
    machineId: "1290f1ee-6c54-4b01-90e6-d701748f0851",
    itemsInStock: 122,
    itemsExpiring: 82
  },
  {
    name: "Store #2",
    machineId: "2290f1ee-6c54-4b01-90e6-d701748f0851",
    itemsInStock: 122,
    itemsExpiring: 18
  },
  {
    name: "Store #3",
    machineId: "3290f1ee-6c54-4b01-90e6-d701748f0851",
    itemsInStock: 412,
    itemsExpiring: 1
  },
  {
    name: "Store #4",
    machineId: "4290f1ee-6c54-4b01-90e6-d701748f0851",
    itemsInStock: 112,
    itemsExpiring: 4
  },
  {
    name: "Store #5",
    machineId: "5290f1ee-6c54-4b01-90e6-d701748f0851",
    itemsInStock: 2,
    itemsExpiring: 5
  }
];

export const FAKE_INVENTORY_BY_STORE_TOTALS = {
  name: "TOTAL",
  itemsInStock: 1234,
  itemsExpiring: 25
};

export const FAKE_INVENTORY_BY_STORE_RESPONSE = {
  items: {
    items: FAKE_INVENTORY_BY_STORE,
    totals: FAKE_INVENTORY_BY_STORE_TOTALS
  }
};
