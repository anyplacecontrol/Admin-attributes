export const FAKE_STORES = [
  {
    id: "16d31b40-60e2-11e9-94ef-a9cd091228b9",    
    WorkHours: [{id: 1, name: "all days", storeId: "16d31b40-60e2-11e9-94ef-a9cd091228b9"}],
    withMachine: true,
    name: "test store",
    slug: "test-store",
    machineId: "9304cf50-39c4-11e9-9168-5bba35669139",
    createdAt: "2019-04-17T07:26:17.333Z",
    updatedAt: "2019-04-17T07:26:17.333Z",
    addressId: 1,
    imageId: "1690bb10-60e2-11e9-94ef-a9cd091228b9",
    statusId: 3,
    address: {
      id: 1,
      zip: "0073",
      country: "USA",
      city: "Los Angeles",
      state: "CA",
      region: null,
      street: null,
      address: null,
      address_2: null,
      phone: null,
      contactPerson: "Alex",
      info: null,
      coordinates: null,
      createdAt: "2019-04-17T07:26:16.753Z",
      updatedAt: "2019-04-17T07:26:16.753Z"
    },
    status: {
      id: 3,
      name: "Open",
      description: "Open store",
      createdAt: "2019-04-17T07:26:16.605Z",
      updatedAt: "2019-04-17T07:26:16.605Z"
    },
    image: {
        id: "184e4710-4008-11e9-864e-6bc39ac88d29",
        src:
          "https://s3.us-east-2.amazonaws.com/applestone-images/test/productImages/BeefBrisket.jpg",
        createdAt: "2019-03-06T12:05:12.774Z",
        updatedAt: "2019-03-06T12:05:12.774Z"
      }    
  },

  {
    id: "26d31b40-60e2-11e9-94ef-a9cd091228b8",    
    WorkHours: [{id: 1, name: "all days", storeId: "16d31b40-60e2-11e9-94ef-a9cd091228b9"}],
    withMachine: true,
    name: "another store",
    slug: "another-store",
    machineId: "2304cf50-39c4-11e9-9168-5bba35669137",
    createdAt: "2019-04-17T07:26:17.333Z",
    updatedAt: "2019-04-17T07:26:17.333Z",
    addressId: 1,
    imageId: "1690bb10-60e2-11e9-94ef-a9cd091228b9",
    statusId: 3,
    address: {
      id: 1,
      zip: "0073",
      country: "USA",
      city: "New York",
      state: "NY",
      region: null,
      street: null,
      address: null,
      address_2: null,
      phone: null,
      contactPerson: "Kirk",
      info: null,
      coordinates: null,
      createdAt: "2019-04-17T07:26:16.753Z",
      updatedAt: "2019-04-17T07:26:16.753Z"
    },
    status: {
      id: 2,
      name: "Closed",
      description: "Closed store",
      createdAt: "2019-04-17T07:26:16.605Z",
      updatedAt: "2019-04-17T07:26:16.605Z"
    },
    image: null,
  }
];

export const FAKE_STORES_RESPONSE = {
  items: FAKE_STORES,
  maxItemsQty: FAKE_STORES.length,
  topRowNumber: 0
};
