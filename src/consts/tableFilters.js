import PropTypes from "prop-types";

export const IFilterItems = PropTypes.arrayOf(
  PropTypes.shape({
    type: PropTypes.string.isRequired,
    apiParamName: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
    ),
    accessorText: PropTypes.func,
    accessorApi: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array])
  })
);

//------------------------------------------------------------------------
//----------Products

export const FILTER_CLOUD_ID = _addDefaultValue({
  type: "input",
  apiParamName: "id",
  labelText: "Cloud ID",
  value: ""
});

export const FILTER_ID = _addDefaultValue({
  type: "input",
  apiParamName: "id",
  labelText: "ID",
  value: ""
});

export const FILTER_DEFINED_PRODUCT_ID = _addDefaultValue({
  type: "input",
  apiParamName: "id",
  labelText: "Defined Product ID",
  value: ""
});

export const FILTER_NAME = _addDefaultValue({
  type: "input",
  apiParamName: "name",
  labelText: "Name",
  value: ""
});

export const FILTER_FIRST_NAME = _addDefaultValue({
  type: "input",
  apiParamName: "first_name",
  labelText: "First Name",
  value: ""
});

export const FILTER_LAST_NAME = _addDefaultValue({
  type: "input",
  apiParamName: "last_name",
  labelText: "Last Name",
  value: ""
});

export const FILTER_CATEGORIES = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "categories",
  labelText: "Category",
  items: [], //items are category object
  accessorText: item => item.name,
  accessorApi: item => item.slug,
  value: []
});

export const FILTER_STATUSES = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "statuses",
  labelText: "Status",
  items: [], //item are productStatus objects
  accessorText: item => item.name,
  accessorApi: item => item.id,
  value: []
});

export const FILTER_ROLES = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "roles",
  labelText: "Role",
  items: [], //item are roles objects
  accessorText: item => item.name,
  accessorApi: item => item.id,
  value: []
});

export const FILTER_METRICS = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "metricIds",
  labelText: "Metric",
  items: [], //item are metrics objects
  accessorText: item => item.name,
  accessorApi: item => item.id,
  value: []
});

//--------Product Items

export const FILTER_PRODUCT_IDS = _addDefaultValue({
  //not for UI, but for API only
  apiParamName: "productIds",
  accessorApi: item => item.id,  //item is product object
  value: []
});

export const FILTER_PRODUCT_ID = _addDefaultValue({
  type: "arrayInput",
  apiParamName: "productIds",
  labelText: "Defined Product ID",
  value: []
});

export const FILTER_PRODUCT_NAME = _addDefaultValue({
  type: "input",
  apiParamName: "productName",
  labelText: "Product Name",
  value: ""
});

export const FILTER_ORDER_ID = _addDefaultValue({
  type: "numberInput",
  apiParamName: "orderId",
  labelText: "Order ID",
  value: ""
});

export const FILTER_LOT = _addDefaultValue({
  type: "input",
  apiParamName: "lot",
  labelText: "Lot ID",
  value: ""
});

export const FILTER_GS1 = _addDefaultValue({
  type: "input",
  apiParamName: "GS1",
  labelText: "GS1",
  value: ""
});

export const FILTER_CARRIER_ID = _addDefaultValue({
  type: "input",
  apiParamName: "carrierId",
  labelText: "Carrier ID",
  value: ""
});

//TODO:
//machineId - as array but not value
//storeName: as array but not value

export const FILTER_MARBLING = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "marbling",
  labelText: "Marbling",
  items: [{text: "Lean", value: 1}, {text: "Medium", value: 2}, {text: "Heavy", value: 3}],
  accessorText: item => item.text,
  accessorApi: item => item.value,
  value: []
});

export const FILTER_THICKNESS = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "cutThickness",
  labelText: "Thickness",
  items: [{text: "1 Inch", value: 1}, {text: "1.5 Inch", value: 2}, {text: "2 Inch", value: 3}],
  accessorText: item => item.text,
  accessorApi: item => item.value,
  value: []
});

export const FILTER_PRODUCT_POPULARITY = _addDefaultValue({
  type: "multiSelectBox",
  labelText: "Popularity (0 is the lowest)",
  apiParamName: "productPopularity",
  items: [0, 1, 2, 3],
  accessorText: item => item,
  accessorApi: item => item,
  value: []
});

export const FILTER_PRODUCTION_DATE = _addDefaultValue({
  type: "advancedDateRange",
  apiParamName: "production_date",
  labelText: "Production Date",
  value: {startDate: null, endDate: null}
});

export const FILTER_EXPIRATION_DATE = _addDefaultValue({
  type: "advancedDateRange",
  apiParamName: "expiration_date",
  labelText: "Expiration Date",
  value: {startDate: null, endDate: null}
});

export const FILTER_EXPIRATION_DATE_OPTIONAL = _addDefaultValue({
  type: "advancedDateRange",
  apiParamName: "expiration_date",
  labelText: "Expiration Date (optional)",
  value: {startDate: null, endDate: null}
});

export const FILTER_PRICE = _addDefaultValue({
  type: "sliderRange",
  apiParamName: "price",
  labelText: "Price",
  minValue: 0,
  maxValue: 100,
  value: {startValue: 0, endValue: 100, }
});

export const FILTER_LIMIT = _addDefaultValue({
  type: "selectBox",
  apiParamName: "limit",
  labelText: "Limit",
  items: [],
  accessorText: item => item,
  accessorApi: item => item,
  value: "100"
});

export const FILTER_WEIGHT = _addDefaultValue({
  type: "numberInput",
  apiParamName: "weight",
  labelText: "Weight",
  value: ""
});

export const FILTER_TAGS = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "tags",
  labelText: "Tag",
  items: [], //items are tag objects
  accessorText: item => item.name,
  accessorApi: item => item.id,
  value: []
});

export const FILTER_MACHINE_ID = _addDefaultValue({
  type: "input",
  apiParamName: "machineId",
  labelText: "Machine ID",
  value: ""
});


export const FILTER_ITEMS_STORES_BY_MACHINE = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "machineId",
  labelText: "Store",
  items: [], //items are store objects
  accessorText: item => item.name,
  accessorApi: item => item.machineId || "not_defined",
  value: []
});

export const FILTER_ITEMS_STORES_WITH_MACHINES = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "stores",
  labelText: "Store",
  items: [], //items are store objects
  accessorText: item => item.name,
  accessorApi: item =>{ return  {name: item.name, machineId: item.machineId} || {}
},
  value: []
});


export const FILTER_MACHINES = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "machineId",
  labelText: "Machine",
  items: [], //items are store objects
  accessorText: item => item.name,
  accessorApi: item => item.id,
  value: []
});

export const FILTER_ORIGIN_MACHINES = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "originMachineId",
  labelText: "Scanned by Machine",
  items: [], //items are store objects
  accessorText: item => item.name,
  accessorApi: item => item.id,
  value: []
});

export const FILTER_MACHINES_BY_ID = _addDefaultValue({
  type: "selectBox",
  apiParamName: "machineId",
  labelText: "Machine",
  items: [], //items are store objects
  accessorText: item => item.name,
  accessorApi: item => item.id,
  value: ""
});

export const FILTER_ITEMS_STORES = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "storeIds",
  labelText: "Store",
  items: [], //items are store objects
  accessorText: item => item.name,
  accessorApi: item => item.id,
  value: []
});

//--------Orders

export const FILTER_STORES = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "storeIds",
  labelText: "Store",
  items: [], //items are store objects
  accessorText: item => item.name,
  accessorApi: item => item.id,
  value: []
});

export const FILTER_PLATFORM = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "created_via",
  labelText: "Platform",
  items: ["kiosk", "web", "mobile"],
  accessorText: item => item,
  accessorApi: item => item,
  value: []
});

export const FILTER_ORDER_PRICE = _addDefaultValue({
  type: "sliderRange",
  apiParamName: "price",
  labelText: "Total Price",
  minValue: 0,
  maxValue: 1000,
  value: {startValue: 0, endValue: 1000, }
});

export const FILTER_DATE_PAID = _addDefaultValue({
  type: "advancedDateRange",
  apiParamName: "date_paid",
  labelText: "Order Date",
  value: {startDate: null, endDate: null}
});

export const FILTER_DATE_CREATED = _addDefaultValue({
  type: "advancedDateRange",
  apiParamName: "date_created",
  labelText: "Order Date",
  value: {startDate: null, endDate: null}
});

export const FILTER_CUSTOMER_ID = _addDefaultValue({
  type: "input",
  apiParamName: "customerId",
  labelText: "Customer ID",
  value: ""
});

export const FILTER_CREDIT_CARD = _addDefaultValue({
  type: "input",
  apiParamName: "creditCardNumber",
  labelText: "Credit Card (4 last digits)",
  value: ""
});

//---------Stores

export const FILTER_COUNTRY = _addDefaultValue({
  type: "selectBox",
  apiParamName: "country",
  labelText: "Country",
  items: [],
  accessorText: item => item,
  accessorApi: item => item,
  value: ""
});

export const FILTER_STATE = _addDefaultValue({
  apiParamName: "state",
  labelText: "State",
  type: "selectBox",
  items: [],
  accessorText: item => item,
  accessorApi: item => item,
  value: ""
});

export const FILTER_CITY = _addDefaultValue({
  type: "input",
  apiParamName: "city",
  labelText: "City",
  value: ""
});

export const FILTER_ZIP = _addDefaultValue({
  type: "input",
  apiParamName: "zip",
  labelText: "ZIP",
  value: ""
});

export const FILTER_PERSON = _addDefaultValue({
  type: "input",
  apiParamName: "contactPerson",
  labelText: "Contact Person",
  value: ""
});

//---------Machines
export const FILTER_KIOSK_ID = _addDefaultValue({
  type: "input",
  apiParamName: "kioskId",
  labelText: "Kiosk ID",
  value: ""
});

export const FILTER_STORE_ID = _addDefaultValue({
  type: "input",
  apiParamName: "storeId",
  labelText: "Store ID",
  value: ""
});


export const FILTER_INVENTORY_NUMBER = _addDefaultValue({
  type: "input",
  apiParamName: "inventoryNumber",
  labelText: "Inventory Number",
  value: ""
});

export const FILTER_MANUFACTURER_NAME = _addDefaultValue({
  type: "input",
  apiParamName: "manufacturerName",
  labelText: "Manufacturer Name",
  value: ""
});

export const FILTER_MODEL_NAME = _addDefaultValue({
  type: "input",
  apiParamName: "modelName",
  labelText: "Model Name",
  value: ""
});

//---------Customers

export const FILTER_EMAIL = _addDefaultValue({
  type: "input",
  apiParamName: "email",
  labelText: "Email",
  value: ""
});

export const FILTER_PHONE = _addDefaultValue({
  type: "input",
  apiParamName: "phone",
  labelText: "Phone",
  value: ""
});

export const FILTER_PRODUCTS = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "productSlugs",
  labelText: "Purchased Product",
  items: [], //items are product object
  accessorText: item => item.name,
  accessorApi: item => item.slug,
  value: []
});

export const FILTER_PRODUCTS_IDS = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "productIds",
  labelText: "Products",
  items: [], //items are product object
  accessorText: item => item.name,
  accessorApi: item => item.id,
  value: []
});

//----------Reports

export const FILTER_PERIOD = _addDefaultValue({
  type: "advancedDateRange",
  apiParamName: "period",
  labelText: "Period",
  value: {startDate: null, endDate: null}
});

function _addDefaultValue(obj) {
  return {...obj, defaultValue: obj.value}
}

//----------Cooking Tips
export const FILTER_COOKING_TIPS = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "cookingTips",
  labelText: "Cooking Tips",
  items: [], //items are tag objects
  accessorText: item => item.name,
  accessorApi: item => item.id,
  value: []
});

export const FILTER_COOKING_TIPS_TITLE = _addDefaultValue({
  type: "input",
  apiParamName: "title",
  labelText: "Title",
  value: ""
});

export const FILTER_COOKING_TIPS_STATUS = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "status",
  labelText: "Status",
  items: [], //items are store objects
  accessorText: item => item.status.name,
  accessorApi: item => item.status.id,
  value: []
});

export const FILTER_COOKING_TIPS_PRODUCTS = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "products",
  labelText: "Products",
  items: [], //items are product object
  accessorText: item => item.name,
  accessorApi: item => item.slug,
  value: []
});

export const FILTER_COOKING_TIPS_CATEGORIES = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "categories",
  labelText: "Categories",
  items: [], //items are category object
  accessorText: item => item.name,
  accessorApi: item => item.id,
  value: []
});


