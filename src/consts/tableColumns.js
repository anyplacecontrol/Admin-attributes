import React from "react";
import * as dataFuncs from "../utils/dataFuncs";
import PropTypes from "prop-types";
import {formatPrice} from "../utils/dataFuncs";

export const IColumn = PropTypes.shape({
  accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  accessorSort: PropTypes.oneOfType([PropTypes.func, PropTypes.string]), //if null -  do not sort. otherwise use data item accessor to sort data
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
});

function _addIsDefault(columns) {
  for (let i = 0; i < columns.length; i++) {
    let column = columns[i];
    column.isDefault = column.isVisible;
  }
  return columns;
}

//-----------------------------------------------------------------------------
//Products

export const COLUMN_ROW_NUMBER = {
  accessor: "rowNumber",
  accessorSort: "rowNumber",
  text: "#",
  className: "row-number"
};

export const COLUMN_ID = {
  accessor: "id",
  accessorSort: "id",
  text: "ID",
  className: "id"
};

export const COLUMN_NAME = {
  accessor: "name",
  accessorSort: "name",
  text: "Name",
  className: "name"
};

export const COLUMN_CATEGORY = {
  accessor: item => dataFuncs.categoriesAsString(item.categories),
  text: "Category",
  className: "category"
};

export const COLUMN_CARRIER_ID = {
  accessor: "carrierId",
  accessorSort: "carrierId",
  text: "Carrier ID",
  className: "carrier-id"
};

export const COLUMN_PRICE = {
  accessor: item => "$" + formatPrice((item.price / 100).toFixed(2)),
  accessorSort: "price",
  text: "Price",
  className: "price"
};

export const COLUMN_STATUS = {
  accessor: item => {
    return item.status ? item.status.name : "null";
  },
  accessorSort: "status.name",
  text: "Status",
  className: "location"
};

export const COLUMN_POPULARITY = {
  accessor: item => item.popularity,
  accessorSort: "popularity",
  text: "Products by Popularity / Items Sold",
  className: "name"
};

export const COLUMN_TAG = {
  accessor: item => dataFuncs.tagsAsString(item.tags),
  text: "Tag",
  className: "category"
};

export const COLUMN_PRIORITY = {
  accessor: item => item.priority,
  className: "date",
  text: "Priority"
};

export const COLUMN_METRIC_NAME = {
  accessor: item => (item.metric ? item.metric.name : "not implemented"),
  className: "name",
  text: "Metric"
};

export const PRODUCTS_COLUMNS = _addIsDefault([
  {...COLUMN_ID, isVisible: false},
  {...COLUMN_NAME, isVisible: true},
  {...COLUMN_CATEGORY, isVisible: true},
  {...COLUMN_PRICE, isVisible: true},
  {...COLUMN_STATUS, isVisible: true},
  {...COLUMN_TAG, isVisible: false},
  {...COLUMN_POPULARITY, isVisible: true},
  {...COLUMN_PRIORITY, isVisible: false},
  {...COLUMN_METRIC_NAME, isVisible: false}
]);

//-----------------------------------------------------------------------------
//Product Items
export const COLUMN_PRODUCT_NAME = {
  accessor: item => item.product.name,
  accessorSort: "product.name",
  text: "Name",
  className: "name"
};
export const COLUMN_MARBLING = {
  accessor: item => dataFuncs.marblingToString(item.marbling),
  accessorSort: "marbling",
  text: "Marbling",
  className: "category"
};
export const COLUMN_THICKNESS = {
  accessor: item => {
    if (item.cutThickness != null) return item.cutThickness;
    else return "-";
  },
  accessorSort: "cutThickness",
  text: "Thickness ID",
  className: "category"
};

export const COLUMN_UPDATED_AT = {
  accessor: item => {
    const date = dataFuncs.truncateDate(item.updatedAt);
    const time = dataFuncs.getGmtTimeFormat(item.updatedAt);
    return date + time;
  },
  accessorSort: "updatedAt",
  text: "Last Update",
  className: "date"
}

export const COLUMN_PROD_DATE = {
  accessor: item => dataFuncs.truncateDate(item.production_date),
  accessorSort: "production_date",
  text: "Prod.Date",
  className: "date"
};
export const COLUMN_EXP_DATE = {
  accessor: item => dataFuncs.truncateDate(item.expiration_date),
  accessorSort: "expiration_date",
  text: "Exp.Date",
  className: "date"
};
export const COLUMN_WEIGHT = {
  accessor: item => {
    if (item.weight != null) return item.weight;
    else return "-";
  },
  accessorSort: "weight",
  text: "Weight ID",
  className: "price"
};

export const COLUMN_TIED = {
  accessor: item => dataFuncs.tiedToString(item.tied),
  //accessorSort: "tied",
  text: "Tied",
  className: "price"
};

export const COLUMN_MACHINE_ID = {
  accessor: "machineId",
  accessorSort: "machineId",
  text: "Machine ID",
  className: "name"
};

export const COLUMN_STORE_NAME = {
  accessor: item => item.store.name || "",
  className: "name",
  text: "Store"
};

export const COLUMN_ORDER_ID = {
  accessor: "orderId",
  accessorSort: "orderId",
  className: "name",
  text: "Order ID"
};

export const COLUMN_ITEM_CATEGORY = {
  accessor: item => dataFuncs.categoriesAsString(item.product.categories),
  text: "Category",
  className: "category"
};

export const COLUMN_ITEM_TAG = {
  accessor: item => dataFuncs.tagsAsString(item.product.tags),
  text: "Tag",
  className: "category"
};

export const COLUMN_FORBIDDEN_TO_SALE = {
  accessor: item => {
    return item.forbiddenToSell ? "Yes" : "No";
  },
  text: "Forbidden",
  className: "category"
};

export const COLUMN_GS1 = {
  accessor: "GS1",
  text: "GS1",
  className: "category"
};

export const PRODUCT_ITEMS_COLUMNS = _addIsDefault([
  {...COLUMN_ROW_NUMBER, isVisible: true},
  {...COLUMN_ID, isVisible: false},
  {...COLUMN_PRODUCT_NAME, isVisible: true},
  {...COLUMN_ITEM_CATEGORY, isVisible: false},
  {...COLUMN_ITEM_TAG, isVisible: false},
  {...COLUMN_MARBLING, isVisible: false},
  {...COLUMN_THICKNESS, isVisible: false},
  {...COLUMN_WEIGHT, isVisible: true},
  {...COLUMN_TIED, isVisible: false},
  {...COLUMN_PRICE, isVisible: true},
  {...COLUMN_CARRIER_ID, isVisible: false},
  {...COLUMN_PROD_DATE, isVisible: false},
  {...COLUMN_EXP_DATE, isVisible: true},
  {...COLUMN_STATUS, isVisible: true},
  {...COLUMN_FORBIDDEN_TO_SALE, isVisible: true},
  {...COLUMN_MACHINE_ID, isVisible: false},
  {...COLUMN_STORE_NAME, isVisible: false},
  {...COLUMN_ORDER_ID, isVisible: false},
  {...COLUMN_GS1, isVisible: false},
  {...COLUMN_UPDATED_AT, isVisible: false}
]);

//-----------------------------------------------------------------------------
//Orders

export const COLUMN_CREATED_VIA = {
  accessor: "created_via",
  accessorSort: "created_via",
  text: "Platform",
  className: "status"
};

export const COLUMN_TOTAL = {
  accessor: item => "$" + formatPrice((item.total / 100).toFixed(2)),
  accessorSort: "total",
  className: "price",
  text: "Total"
};

export const COLUMN_RAW_TOTAL = {
  accessor: item => "$" + formatPrice(item.total),
  accessorSort: "total",
  className: "price",
  text: "Total"
};

export const COLUMN_DATE_PAID = {
  accessor: item => dataFuncs.truncateDate(item.date_paid),
  accessorSort: "date_paid",
  className: "date",
  text: "Date"
};

//For Customer View
export const ORDERS_BASIC_COLUMNS = _addIsDefault([
  {...COLUMN_ROW_NUMBER, isVisible: true},
  {...COLUMN_ID, isVisible: true},
  {...COLUMN_DATE_PAID, isVisible: true},
  {...COLUMN_STATUS, isVisible: true},
  {...COLUMN_CREATED_VIA, isVisible: true},
  {...COLUMN_TOTAL, isVisible: true},
  {...COLUMN_MACHINE_ID, isVisible: false}
]);

//For Orders page
export const ORDERS_COLUMNS = _addIsDefault([
  {...COLUMN_ROW_NUMBER, isVisible: true},
  {...COLUMN_ID, isVisible: true},
  {...COLUMN_DATE_PAID, isVisible: true},
  {...COLUMN_CATEGORY, isVisible: true},
  {...COLUMN_STATUS, isVisible: true},
  {...COLUMN_CREATED_VIA, isVisible: true},
  {...COLUMN_TOTAL, isVisible: true},
  {...COLUMN_MACHINE_ID, isVisible: false},
  {...COLUMN_STORE_NAME, isVisible: true}
]);

//For Mobile Orders page
export const MOBILE_ORDERS_COLUMNS = _addIsDefault([
  {...COLUMN_ROW_NUMBER, isVisible: true},
  {...COLUMN_ID, isVisible: true},
  {...COLUMN_DATE_PAID, isVisible: true},
  {...COLUMN_CATEGORY, isVisible: true},
  {...COLUMN_STATUS, isVisible: true},
  {...COLUMN_CREATED_VIA, isVisible: true},
  {...COLUMN_RAW_TOTAL, isVisible: true},
  {...COLUMN_MACHINE_ID, isVisible: false},
  {...COLUMN_STORE_NAME, isVisible: true}
]);

//-----------------------------------------------------------------------------
//Categories

export const COLUMN_DESCRIPTION = {
  accessor: "description",
  text: "Description",
  className: "description"
};

export const CATEGORIES_COLUMNS = _addIsDefault([
  {...COLUMN_ID, isVisible: true},
  {...COLUMN_NAME, isVisible: true},
  {...COLUMN_PRIORITY, isVisible: true},
  {...COLUMN_DESCRIPTION, isVisible: true}
]);

//---------------------------------------------------------------------
//Statuses

export const STATUSES_COLUMNS = _addIsDefault([
  {...COLUMN_ID, isVisible: true},
  {...COLUMN_NAME, isVisible: true},
  {...COLUMN_DESCRIPTION, isVisible: true}
]);

//---------------------------------------------------------------------
//Statuses

export const ROLES_COLUMNS = _addIsDefault([
  {...COLUMN_ID, isVisible: true},
  {...COLUMN_NAME, isVisible: true},
  {...COLUMN_DESCRIPTION, isVisible: true}
  // {...COLUMN_IS_SUPERADMIN, isVisible: true} // todo
]);

//---------------------------------------------------------------------
//Tags

export const TAGS_COLUMNS = _addIsDefault([
  {...COLUMN_ID, isVisible: true},
  {...COLUMN_NAME, isVisible: true}
]);

//---------------------------------------------------------------------
//Stores

export const COLUMN_CITY = {
  accessor: item => (item.address ? item.address.city : ""),
  accessorSort: "city",
  text: "City",
  className: "location"
};

export const COLUMN_ZIP = {
  accessor: item => (item.address ? item.address.zip : ""),
  accessorSort: "zip",
  text: "ZIP",
  className: "location"
};

export const COLUMN_PHONE = {
  accessor: item => (item.address ? item.address.phone : ""),
  text: "Phone",
  className: "location"
};

export const COLUMN_COUNTRY = {
  accessor: item => (item.address ? item.address.country : ""),
  text: "Country",
  className: "location"
};

export const COLUMN_STATE = {
  accessor: item => (item.address ? item.address.state : ""),
  accessorSort: "state",
  text: "State",
  className: "location"
};

export const COLUMN_PERSON = {
  accessor: item => (item.address ? item.address.contactPerson : ""),
  accessorSort: "contactPerson",
  text: "Person",
  className: "name"
};

export const STORES_COLUMNS = _addIsDefault([
  {...COLUMN_ID, isVisible: false},
  {...COLUMN_NAME, isVisible: true},
  {...COLUMN_MACHINE_ID, isVisible: false},
  {...COLUMN_STATUS, isVisible: true},
  {...COLUMN_COUNTRY, isVisible: true},
  {...COLUMN_STATE, isVisible: false},
  {...COLUMN_CITY, isVisible: true},
  {...COLUMN_ZIP, isVisible: false},
  {...COLUMN_PHONE, isVisible: false},
  {...COLUMN_PERSON, isVisible: true}
]);

//---------------------------------------------------------------------
//Machines

export const COLUMN_INVENTORY_NUMBER = {
  accessor: item => item.inventoryNumber,
  accessorSort: "inventoryNumber",
  text: "Inventory Num.",
  className: "name"
};

export const COLUMN_KIOSK_ID = {
  accessor: item => "not implemented",
  text: "Kiosk ID",
  className: "name"
};

export const COLUMN_STORE_ID = {
  accessor: item => "not implemented",
  text: "Store ID",
  className: "name"
};

export const COLUMN_MANUFACTURER_NAME = {
  accessor: item => (item.manufacturer ? item.manufacturer.name : ""),
  text: "Manufacturer",
  accessorSort: "manufacturerName",
  className: "name"
};

export const COLUMN_MODEL_NAME = {
  accessor: item => (item.model ? item.model.name : ""),
  text: "Model",
  accessorSort: "modelName",
  className: "name"
};

export const COLUMN_DETAILS = {
  accessor: item => item.details,
  text: "Details",
  className: "name"
};

export const COLUMN_TEMPERATURE = {
  accessor: item => {
    if (!item.temperature) return "---";
    else return item.temperature.value + "°";
  },
  text: "Temperature",
  className: "price"
};

export const COLUMN_TEMPERATURE_1 = {
  accessor: item => {
    return item.temperature ? item.temperature.value + "°" : "---";
  },
  text: "Avg. Temp",
  className: "price"
};


export const COLUMN_SENSOR_1 = {
  accessor: item => {
    return "0°";
  },
  text: "CondHX_Air-in_Temp",
  className: "sensor-column"
};

export const COLUMN_SENSOR_2 = {
  accessor: item => {
    return "0°";
  },
  text: "CondHX_Air-out_Temp",
  className: "sensor-column"
};

export const COLUMN_SENSOR_3 = {
  accessor: item => {
    return "0°";
  },
  text: "Cond_Disch_Temp",
  className: "sensor-column"
};

export const COLUMN_SENSOR_4 = {
  accessor: item => {
    return "0°";
  },
  text: "Cond_Suct_Temp",
  className: "sensor-column"
};

export const COLUMN_SENSOR_5 = {
  accessor: item => {
    return "0°";
  },
  text: "Cond_Refrig_Out_Temp",
  className: "sensor-column"
};

export const COLUMN_SENSOR_6 = {
  accessor: item => {
    return "0°";
  },
  text: "Cond_Fan_motor_Current",
  className: "sensor-column"
};

export const COLUMN_SENSOR_7 = {
  accessor: item => {
    return "0°";
  },
  text: "Comp_Motor_Current",
  className: "sensor-column"
};

export const COLUMN_SENSOR_8 = {
  accessor: item => {
    return "0°";
  },
  text: "Evap_Air-in_Temp",
  className: "sensor-column"
};

export const COLUMN_SENSOR_9 = {
  accessor: item => {
    return "0°";
  },
  text: "Evap_Air-out_Temp",
  className: "sensor-column"
};

export const COLUMN_SENSOR_10 = {
  accessor: item => {
    return "0°";
  },
  text: "Evap_TXV-out_Temp",
  className: "sensor-column"
};

export const COLUMN_SENSOR_11 = {
  accessor: item => {
    return "0°";
  },
  text: "Evap_coil_Vapor_Temp",
  className: "sensor-column"
};

export const COLUMN_SENSOR_12 = {
  accessor: item => {
    return "0°";
  },
  text: "Evap_Fanmotor_Current",
  className: "sensor-column"
};

export const COLUMN_SENSOR_13 = {
  accessor: item => {
    return "0°";
  },
  text: "Evap_Valvecoil_Current",
  className: "sensor-column"
};

export const COLUMN_SENSOR_14 = {
  accessor: item => {
    return "0°";
  },
  text: "ARS_Main-Power_Current",
  className: "sensor-column"
};

export const COLUMN_SENSOR_15 = {
  accessor: item => {
    return "0°";
  },
  text: "ARS_Aux-Power_Current",
  className: "sensor-column"
};

export const COLUMN_IN_STOCK_FOR_MACHINES = {
  //item => item.itemsInStock,
  accessor: item => [
    <span key={0} style={item.itemsInStock < 20 ? {color: "red"} : {}}>
      {item.itemsInStock}
    </span>
  ],
  text: "Items In Stock",
  accessorSort: "itemsInStock",
  className: "price"
};

export const MACHINES_COLUMNS = _addIsDefault([
  {...COLUMN_ROW_NUMBER, isVisible: true},
  {...COLUMN_ID, isVisible: false},
  {...COLUMN_NAME, isVisible: true},
  {...COLUMN_STATUS, isVisible: true},
  {...COLUMN_INVENTORY_NUMBER, isVisible: true},
  {...COLUMN_TEMPERATURE, isVisible: true},
  {...COLUMN_IN_STOCK_FOR_MACHINES, isVisible: true, accessorSort: null},
  {...COLUMN_MANUFACTURER_NAME, isVisible: false},
  {...COLUMN_MODEL_NAME, isVisible: false},
  {...COLUMN_COUNTRY, isVisible: false},
  {...COLUMN_STATE, isVisible: false},
  {...COLUMN_CITY, isVisible: true},
  {...COLUMN_ZIP, isVisible: false},
  {...COLUMN_PHONE, isVisible: false},
  {...COLUMN_PERSON, isVisible: false},
  {...COLUMN_DETAILS, isVisible: false}
  //TODO: temperature
]);

//---------------------------------------------------------------------
//Kiosks

export const KIOSKS_COLUMNS = _addIsDefault([
  {...COLUMN_ROW_NUMBER, isVisible: true},
  {...COLUMN_ID, isVisible: true},
  {...COLUMN_MACHINE_ID, isVisible: false},
  {...COLUMN_STATUS, isVisible: true},
  {...COLUMN_INVENTORY_NUMBER, isVisible: true},
  {...COLUMN_MANUFACTURER_NAME, isVisible: true},
  {...COLUMN_MODEL_NAME, isVisible: false},
  {...COLUMN_COUNTRY, isVisible: true},
  {...COLUMN_STATE, isVisible: false},
  {...COLUMN_CITY, isVisible: true},
  {...COLUMN_ZIP, isVisible: false},
  {...COLUMN_PHONE, isVisible: false},
  {...COLUMN_PERSON, isVisible: false},
  {...COLUMN_DETAILS, isVisible: false}
]);

//---------------------------------------------------------------------
//Metrics

export const COLUMN_PRICE_MEASURE = {
  accessor: item =>
    item.metricUi && item.metricUi.priceMeasure
      ? item.metricUi.priceMeasure
      : "",
  accessorSort: item =>
    item.metricUi && item.metricUi.priceMeasure
      ? item.metricUi.priceMeasure
      : "",
  text: "Price Measure",
  className: "name"
};

export const COLUMN_WEIGHT_BUTTONS = {
  accessor: item => (item.metricUi && item.metricUi.weight ? "\u2714" : ""),
  accessorSort: item => (item.metricUi && item.metricUi.weight ? "\u2714" : ""),
  text: "Weight",
  className: "name"
};

export const COLUMN_THICKNESS_BUTTONS = {
  accessor: item => (item.metricUi && item.metricUi.thickness ? "\u2714" : ""),
  accessorSort: item =>
    item.metricUi && item.metricUi.thickness ? "\u2714" : "",
  text: "Thickness",
  className: "name"
};

export const COLUMN_MARBLING_BUTTONS = {
  accessor: item => (item.metricUi && item.metricUi.marbling ? "\u2714" : ""),
  accessorSort: item =>
    item.metricUi && item.metricUi.marbling ? "\u2714" : "",
  text: "Marbling",
  className: "name"
};

export const COLUMN_TOTAL_WEIGHT = {
  accessor: item =>
    item.metricUi && item.metricUi.totalWeight ? item.metricUi.totalWeight : "",
  accessorSort: item =>
    item.metricUi && item.metricUi.totalWeight ? item.metricUi.totalWeight : "",
  text: "Total Weight",
  className: "name"
};

export const METRICS_COLUMNS = _addIsDefault([
  {...COLUMN_ID, isVisible: false},
  {...COLUMN_NAME, isVisible: true},
  {...COLUMN_PRICE_MEASURE, isVisible: true},
  {...COLUMN_WEIGHT_BUTTONS, isVisible: true},
  {...COLUMN_THICKNESS_BUTTONS, isVisible: true},
  {...COLUMN_MARBLING_BUTTONS, isVisible: true},
  {...COLUMN_TOTAL_WEIGHT, isVisible: true}
]);

//---------------------------------------------------------------------
//Admins

export const COLUMN_ADMIN_EMAIL = {
  accessor: "email",
  accessorSort: "email",
  text: "Email",
  className: "name"
};

export const COLUMN_ADMIN_FIRST_NAME = {
  accessor: "firstName",
  accessorSort: "firstName",
  text: "First Name",
  className: "name"
};

export const COLUMN_ADMIN_LAST_NAME = {
  accessor: "lastName",
  accessorSort: "lastName",
  text: "Last Name",
  className: "name"
};

export const COLUMN_ADMIN_PHONE = {
  accessor: "phone",
  accessorSort: "phone",
  text: "Phone",
  className: "name"
};

export const COLUMN_ADMIN_ROLE = {
  accessor: item => {
    return item.role ? item.role.name : "null";
  },
  accessorSort: "role.name",
  text: "Role",
  className: "role"
};

export const USERS_COLUMNS = _addIsDefault([
  {...COLUMN_ID, isVisible: false},
  {...COLUMN_ADMIN_EMAIL, isVisible: true},
  {...COLUMN_ADMIN_FIRST_NAME, isVisible: true},
  {...COLUMN_ADMIN_LAST_NAME, isVisible: true},
  {...COLUMN_ADMIN_PHONE, isVisible: true},
  {...COLUMN_ADMIN_ROLE, isVisible: true}
]);

//---------------------------------------------------------------------
//Customers

export const COLUMN_EMAIL = {
  accessor: "email",
  accessorSort: "email",
  text: "Email",
  className: "name"
};

export const COLUMN_CUSTOMER_PHONE = {
  accessor: "phone",
  accessorSort: "phone",
  text: "Phone",
  className: "name"
};

export const COLUMN_CUSTOMER_ORDERS_TOTAL = {
  accessor: item => {
    let total = 0;
    if (item.orders) {
      for (let i = 0; i < item.orders.length; i++) {
        let order = item.orders[i];
        total = total + order.total;
      }
    }
    return "$" + formatPrice((total / 100).toFixed(2));
  },
  text: "Orders Total",
  className: "name"
};

export const COLUMN_CUSTOMER_LAST_ORDER_DATE = {
  accessor: item => {
    let result = "";
    // if (item.orders) {
    //   result = item.orders[0].date_paid;

    //   for (let i = 0; i < item.orders.length; i++) {
    //     let order = item.orders[i];
    //     let d1 = new Date(order.date_paid);
    //     let d2 = new Date(result);
    //     if (d1 > d2) result = order.date_paid;
    //   }

    //   result = dataFuncs.truncateDate(result);
    //}
    if (item.lastOrderDate) result = dataFuncs.truncateDate(item.lastOrderDate);
    return result;
  },
  text: "Last Order",
  accessorSort: "lastOrderDate",
  className: "name"
};

export const COLUMN_CUSTOMER_PLATFORM = {
  accessor: item => {
    return item.platforms ? item.platforms.join(",") : "";
  },
  text: "Platform",
  className: "status"
};

export const CUSTOMERS_COLUMNS = _addIsDefault([
  {...COLUMN_CUSTOMER_LAST_ORDER_DATE, isVisible: true},
  {...COLUMN_ID, isVisible: false},
  {...COLUMN_EMAIL, isVisible: true},
  {...COLUMN_NAME, isVisible: true},
  {...COLUMN_CUSTOMER_PHONE, isVisible: true},
  {...COLUMN_STATUS, isVisible: false},
  {...COLUMN_CUSTOMER_PLATFORM, isVisible: true}
]);

//---------------------------------------------------------------------
//Mobile Users

export const COLUMN_FIRST_NAME = {
  accessor: "firstName",
  accessorSort: "firstName",
  text: "First Name",
  className: "name"
};

export const COLUMN_LAST_NAME = {
  accessor: "lastName",
  accessorSort: "lastName",
  text: "Last Name",
  className: "name"
};

// export const COLUMN_CUSTOMER_ORDERS_TOTAL = {
//   accessor: item => {
//     let total = 0;
//     if (item.orders) {
//       for (let i = 0; i < item.orders.length; i++) {
//         let order = item.orders[i];
//         total = total + order.total;
//       }
//     }
//     return "$" + (total / 100).toFixed(2);
//   },
//   text: "Orders Total",
//   className: "name"
// };
//
// export const COLUMN_CUSTOMER_LAST_ORDER_DATE = {
//   accessor: item => {
//     let result = "";
//     // if (item.orders) {
//     //   result = item.orders[0].date_paid;
//
//     //   for (let i = 0; i < item.orders.length; i++) {
//     //     let order = item.orders[i];
//     //     let d1 = new Date(order.date_paid);
//     //     let d2 = new Date(result);
//     //     if (d1 > d2) result = order.date_paid;
//     //   }
//
//     //   result = dataFuncs.truncateDate(result);
//     //}
//     if (item.lastOrderDate) result = dataFuncs.truncateDate(item.lastOrderDate);
//     return result;
//   },
//   text: "Last Order",
//   accessorSort: "lastOrderDate",
//   className: "name"
// };
//
// export const COLUMN_CUSTOMER_PLATFORM = {
//   accessor: item => {
//     return item.platforms ? item.platforms.join(",") : "";
//   },
//   text: "Platform",
//   className: "status"
// };

export const MOBILE_USERS_COLUMNS = _addIsDefault([
  {...COLUMN_ROW_NUMBER, isVisible: true},
  {...COLUMN_ID, isVisible: false},
  {...COLUMN_EMAIL, isVisible: true},
  {...COLUMN_FIRST_NAME, isVisible: true},
  {...COLUMN_LAST_NAME, isVisible: true},
  {...COLUMN_CUSTOMER_PHONE, isVisible: true}
  // {...COLUMN_STATUS, isVisible: false},
  // {...COLUMN_CUSTOMER_PLATFORM, isVisible: true}
]);

//---------------------------------------------------------------------
//Customer Credit Cards

export const COLUMN_CREDIT_CARD_TYPE = {
  accessor: "cardType",
  className: "name",
  accessorSort: "cardType",
  text: "Card Type"
};

export const COLUMN_CREDIT_LAST_DIGITS = {
  accessor: item => "... " + item.lastDigits,
  className: "name",
  accessorSort: "lastDigits",
  text: "Card Last Digits"
};

export const COLUMN_CREDIT_EXPIRES = {
  accessor: "expires",
  className: "name",
  accessorSort: "expires",
  text: "Expires"
};

export const COLUMN_CREDIT_CARD_TOKEN = {
  accessor: "token",
  className: "name",
  accessorSort: "token",
  text: "Token"
};

export const CREDIT_CARDS_COLUMNS = _addIsDefault([
  {...COLUMN_CREDIT_CARD_TYPE, isVisible: true},
  {...COLUMN_CREDIT_LAST_DIGITS, isVisible: true},
  {...COLUMN_CREDIT_EXPIRES, isVisible: true},
  {...COLUMN_CREDIT_CARD_TOKEN, isVisible: true}
]);

//---------------------------------------------------------------------
//Report for Orders

export const COLUMN_DATE = {
  accessor: item => {
    let res = item.dateStr.replace("|", " ");
    return res;
  },
  accessorSort: "date",
  text: "Period",
  className: "name"
};

export function getColumnStoreSales(storeName, colorIndex, units = "$") {
  let color;
  switch (colorIndex) {
    case 0:
      color = "#ECC41D";
      break;
    case 1:
      color = "#FF73FF";
      break;
    case 2:
      color = "#5D21F1";
      break;
    case 3:
      color = "#51BBFE";
      break;
    case 4:
      color = "#7b9cb3";
      break;
    case 5:
      color = "#8884d8";
      break;
    case 6:
      color = "#808080";
      break;
    case 7:
      color = "#DF4A37";
      break;
    case 8:
      color = "#68C58B";
      break;

    default:
      color = "black";
      break;
  }
  return {
    accessor: item => {
      if (!item[storeName]) {
        return "-";
      }

      let val = item[storeName];

      if (units === "$") {
        return units + formatPrice(val);
      }

      return `${val} ${units}`;
    },
    accessorSort: storeName,
    text: storeName,
    legend: storeName,
    className: "date",
    color: color,
    yAxis: "left",
    isVisible: true,
    isDefault: true
  };
}

export const COLUMN_ORDERS = {
  accessor: item => Math.floor(item.orders || 0),
  accessorSort: "orders",
  text: "Orders",
  legend: "orders placed in this period",
  className: "date",
  color: "#ECC41D",
  yAxis: "right"
};

export const COLUMN_ITEMS = {
  accessor: item => item.items,
  accessorSort: "items",
  text: "Items",
  legend: "Items purchased in this period",
  className: "date",
  color: "#FF73FF",
  yAxis: "right"
};

export const COLUMN_ITEMS_PER_ORDER = {
  accessor: item => item.itemsPerOrder,
  accessorSort: "itemsPerOrder",
  text: "Items/Order",
  legend: "Items per Order in this period",
  className: "date",
  color: "#5D21F1",
  yAxis: "right"
};

export const COLUMN_SUM_PER_ORDER = {
  accessor: item => "$" + item.sumPerOrder,
  accessorSort: "sumPerOrder",
  text: "Avg. Cart",
  legend: "Avg. cart in this period",
  className: "date",
  color: "#51BBFE",
  yAxis: "left"
};

export const COLUMN_DISCOUNT = {
  accessor: item => [
    <span key="0" className="price-discount">
      {item.grand_total != "0.00"
        ? Math.round((100 * item.discount) / item.grand_total) + "%"
        : "0%"}
    </span>,
    <span key="1">{"$" + item.discount}</span>
  ],
  accessorSort: "discount",
  text: "Discount",
  legend: "discounts in this period",
  className: "date",
  color: "#7b9cb3",
  yAxis: "left"
};

export const COLUMN_TAX = {
  accessor: item => "$" + item.tax,
  accessorSort: "tax",
  text: "Tax",
  legend: "tax amount in this period",
  className: "date",
  color: "#8884d8",
  yAxis: "left"
};

export const COLUMN_REFUNDED = {
  accessor: item => "$" + item.refunded,
  accessorSort: "refunded",
  text: "Refunded",
  legend: "refunded in this period",
  className: "date",
  color: "#808080",
  yAxis: "left"
};

export const COLUMN_SUBTOTAL = {
  accessor: item => "$" + formatPrice(item.subtotal),
  accessorSort: "subtotal",
  text: "Subtotal",
  legend: "subtotal in this period",
  className: "date",
  color: "#DF4A37",
  yAxis: "left"
};

export const GRAND_TOTAL = {
  accessor: item => "$" + formatPrice(item.grand_total),
  accessorSort: "grand_total",
  text: "Grand Total",
  legend: "grand total in this period",
  className: "name",
  color: "#68C58B",
  yAxis: "left"
};

export const REPORT_ORDERS_COLUMNS = _addIsDefault([
  {...COLUMN_DATE, isVisible: true},
  {...COLUMN_ORDERS, isVisible: true},
  {...COLUMN_ITEMS, isVisible: true},
  {...COLUMN_ITEMS_PER_ORDER, isVisible: true},
  {...COLUMN_SUM_PER_ORDER, isVisible: true},
  {...COLUMN_DISCOUNT, isVisible: true},
  {...COLUMN_TAX, isVisible: true},
  {...COLUMN_REFUNDED, isVisible: true},
  {...COLUMN_SUBTOTAL, isVisible: true},
  {...GRAND_TOTAL, isVisible: true}
]);

//---------------------------------------------------------------------
//Cooking Tips

export const COLUMN_TITLE = {
  accessor: item => item.title,
  accessorSort: "title",
  text: "Title",
  className: "title"
};

export const COLUMN_PRODUCT_CATEGORY = {
  accessor: item => dataFuncs.getProductsCategoriesAsString([item.product]),
  text: "Category",
  className: "category"
};

export const COLUMN_PRODUCT = {
  accessor: item => item.product.name,
  accessorSort: "product.name",
  text: "Product",
  className: "product"
};

export const COOKING_TIPS_COLUMNS = _addIsDefault([
  {...COLUMN_ID, isVisible: true},
  {...COLUMN_TITLE, isVisible: true},
  {...COLUMN_PRODUCT_CATEGORY, isVisible: true},
  {...COLUMN_PRODUCT, isVisible: true}
]);

//---------------------------------------------------------------------
//Logs

export const COLUMN_MACHINE = {
  accessor: item => item.machine.name,
  accessorSort: "MachineId",
  text: "Machine",
  className: "machine"
};

export const COLUMN_LOG_DATE = {
  accessor: item => {
    const date = dataFuncs.truncateDate(item.Date);
    const time = dataFuncs.getGmtTimeFormat(item.Date);
    return date + time;
  },
  accessorSort: "date",
  text: "Date",
  className: "name",
};

export const COLUMN_LOG_MESSAGE = {
  accessor: item => dataFuncs.truncateString(item.Log.Message, 40),
  accessorSort: "Message",
  text: "Log Message",
  className: "name",
};

export const COLUMN_LOG_TIMESTAMP = {
  accessor: item => item.Log.Timestamp,
  accessorSort: "Timestamp",
  text: "Log Timestamp",
  className: "name",
};

export const COLUMN_LOG_LEVEL = {
  accessor: item => item.Log.Level,
  accessorSort: "Level",
  text: "Log Level",
  className: "name",
};

export const LOGS_COLUMNS = _addIsDefault([
  {...COLUMN_ROW_NUMBER, isVisible: true},
  {...COLUMN_MACHINE, isVisible: true},
  {...COLUMN_LOG_DATE, isVisible: true},
  {...COLUMN_LOG_LEVEL, isVisible: true},
  {...COLUMN_LOG_TIMESTAMP, isVisible: false},
  {...COLUMN_LOG_MESSAGE, isVisible: true},
]);

//---------------------------------------------------------------------
//Alarms

export const COLUMN_ALARM_MESSAGE = {
  accessor: item => item.Data.Message,
  accessorSort: "name",
  text: "Message",
  className: "name"
};

export const COLUMN_ALARM_ID = {
  accessor: "AlarmID",
  accessorSort: "AlarmID",
  text: "Alarm ID",
  className: "alarm-id"
};

export const COLUMN_ALARM_TYPE = {
  accessor: "AlarmType",
  accessorSort: "AlarmType",
  text: "Alarm Type",
  className: "alarm-type"
};

export const ALARMS_COLUMNS = _addIsDefault([
  {...COLUMN_ROW_NUMBER, isVisible: true},
  {...COLUMN_MACHINE, isVisible: true},
  {...COLUMN_LOG_DATE, isVisible: true},
  {...COLUMN_ALARM_ID, isVisible: true},
  {...COLUMN_ALARM_TYPE, isVisible: true},
  {...COLUMN_ALARM_MESSAGE, isVisible: true},
]);

//---------------------------------------------------------------------
//Inventory by Machine

export const COLUMN_EXPIRING = {
  accessor: item => item.itemsExpiring,
  text: "Expiring Items",
  accessorSort: "itemsExpiring",
  className: "price"
};

export const COLUMN_IN_STOCK = {
  accessor: item => {
    if (item.itemsInStock) return item.itemsInStock;
    else return 0;
  },
  text: "Items In Stock (free)",
  accessorSort: "itemsInStock",
  className: "price"
};

export const INVENTORY_BY_MACHINE_COLUMNS = _addIsDefault([
  {...COLUMN_MACHINE_ID, isVisible: true},
  {...COLUMN_IN_STOCK, isVisible: true},
  {...COLUMN_EXPIRING, isVisible: true}
]);

//---------------------------------------------------------------------
//Inventory by Product
export const COLUMN_PRODUCT_TYPE = {
  accessor: item => item.name,
  accessorSort: "name",
  text: "Product",
  className: "name"
};

export const COLUMN_LAST_EXPIRED = {
  accessor: item => {
    if (item.lastExpired) {
      const date = dataFuncs.truncateDate(item.lastExpired);
      const time = dataFuncs.getGmtTimeFormat(item.lastExpired);
      return date + time;
    }
  },
  accessorSort: "name",
  text: "Last Will Expire",
  className: "name"
};

export const INVENTORY_BY_PRODUCT_TYPE_COLUMNS = _addIsDefault([
  {...COLUMN_PRODUCT_TYPE, isVisible: true},
  {...COLUMN_IN_STOCK, isVisible: true},
  {...COLUMN_EXPIRING, isVisible: true},
  {...COLUMN_LAST_EXPIRED, isVisible: true}
]);

//---------------------------------------------------------------------

export const INVENTORY_BY_STORE_COLUMNS = _addIsDefault([
  {...COLUMN_NAME, isVisible: true},
  // { ...COLUMN_MACHINE_ID, isVisible: true },
  {...COLUMN_IN_STOCK, isVisible: true},
  {...COLUMN_EXPIRING, isVisible: true}
]);

//---------------------------------------------------------------------

export const PRODUCTS_BY_POPULARITY_COLUMNS = _addIsDefault([
  {...COLUMN_NAME, isVisible: true},
  {...COLUMN_CATEGORY, isVisible: true},
  {...COLUMN_POPULARITY, isVisible: true}
]);

//---------------------------------------------------------------------

export const TEMPERATURE_HISTORY_COLUMNS = _addIsDefault([
  {...COLUMN_DATE, isVisible: true},
  {...COLUMN_TEMPERATURE_1, isVisible: true},
]);

//---------------------------------------------------------------------

export const COLUMN_ATTRIBUTE = {
  accessor: "attribute",  
  text: "Attribute",
  className: "name"
};

export const COLUMN_CONTROL_TYPE = {
  accessor: "controlType",
  accessorSort: "controlType",
  text: "Type",
  className: "name"
};

export const CONTROLS_COLUMNS = _addIsDefault([
  {...COLUMN_NAME, isVisible: true},
  {...COLUMN_ATTRIBUTE, isVisible: true},
  {...COLUMN_CONTROL_TYPE, isVisible: true},
]);

//---------------------------------------------------------------------

export const SENSORS_HISTORY_COLUMNS = _addIsDefault([
  {...COLUMN_DATE, isVisible: true},
  {...COLUMN_SENSOR_1, isVisible: true},
  {...COLUMN_SENSOR_2, isVisible: true},
  {...COLUMN_SENSOR_3, isVisible: true},
  {...COLUMN_SENSOR_4, isVisible: true},
  {...COLUMN_SENSOR_5, isVisible: true},
  {...COLUMN_SENSOR_6, isVisible: true},
  {...COLUMN_SENSOR_7, isVisible: true},
  {...COLUMN_SENSOR_8, isVisible: true},
  {...COLUMN_SENSOR_9, isVisible: true},
  {...COLUMN_SENSOR_10, isVisible: true},
  {...COLUMN_SENSOR_11, isVisible: true},
  {...COLUMN_SENSOR_12, isVisible: true},
  {...COLUMN_SENSOR_13, isVisible: true},
  {...COLUMN_SENSOR_14, isVisible: true},
  {...COLUMN_SENSOR_15, isVisible: true}
]);
