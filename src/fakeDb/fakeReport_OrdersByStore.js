export const FAKE_REPORT_ORDERS_BY_STORE = [
    {
        "date": "2019-08-16T00:00:00.000Z",
        "Stone Ridge Location": 9,
        "Hudson Location": 48
    },
    {
        "date": "2019-08-17T00:00:00.000Z",
        "Stone Ridge Location": 10,
        "Hudson Location": 41
    },
  ];
  
  export const FAKE_REPORT_ORDERS_BY_STORE_TOTALS = {
    "Stone Ridge Location": 19,
    "Hudson Location": 88
  };
  
  export const FAKE_REPORT_ORDERS_BY_STORE_RESPONSE = {
    items: {
      items: FAKE_REPORT_ORDERS_BY_STORE,
      totals: FAKE_REPORT_ORDERS_BY_STORE_TOTALS
    }
  };
  