import { FAKE_REPORT_ORDERS_RESPONSE } from "../fakeDb/fakeReport_Orders";
import * as baseAPI from "./baseApi";
import * as dataFuncs from "../utils/dataFuncs";
import * as consts from "../consts/constants";

const reportKioskOrders_endPoint_total =
  "https://" + consts.apiDomain + "/report_api/orders/total";
const reportKioskOrders_endPoint_average =
  "https://" + consts.apiDomain + "/report_api/orders/average";
const reportKioskOrders_endPoint_median =
  "https://" + consts.apiDomain + "/report_api/orders/median";

const reportMobileOrders_endPoint_total =
  "https://" + consts.apiDomain + "/report_api/mobile_orders/total";
const reportMobileOrders_endPoint_average =
  "https://" + consts.apiDomain + "/report_api/mobile_orders/average";
const reportMobileOrders_endPoint_median =
  "https://" + consts.apiDomain + "/report_api/mobile_orders/median";



//********************************************************************************
// ORDERS REPORT

function formatItem_Orders(item, filter) {
  if (!item) return;
  if (item.date)
    item.dateStr = dataFuncs.truncateDate(item.date, filter.step);
  item.discount = ((item.discount || 0) / 100).toFixed(2);
  item.tax = ((item.tax || 0) / 100).toFixed(2);
  item.refunded = ((item.refunded || 0) / 100).toFixed(2);
  item.subtotal = ((item.subtotal || 0) / 100).toFixed(2);
  item.grand_total = ((item.grand_total || 0) / 100).toFixed(2);
  if (item.orders != 0 && item.orders != "0") {
    item.itemsPerOrder = (item.items / item.orders).toFixed(2);
    item.sumPerOrder = (item.grand_total / item.orders).toFixed(2);
  } else {
    item.itemsPerOrder = "0";
    item.sumPerOrder = "0";
  }
  item.orders = ((item.orders || 0) * 1).toFixed(0);
  item.items = ((item.items || 0) * 1).toFixed(0);
}

//----------------------------------------------------------------------

function sumItems(item1, item2) {
  let result = {};
  result.date = item1.date;
  result.dateStr = item1.dateStr;
  result.discount = (
    parseFloat(item1.discount) + parseFloat(item2.discount)
  ).toFixed(2);
  result.grand_total = (
    parseFloat(item1.grand_total) + parseFloat(item2.grand_total)
  ).toFixed(2);
  result.items = (
    parseFloat(item1.items) + parseFloat(item2.items)
  ).toString();
  result.orders = (
    parseFloat(item1.orders) + parseFloat(item2.orders)
  ).toString();
  result.refunded = (
    parseFloat(item1.refunded) + parseFloat(item2.refunded)
  ).toFixed(2);
  result.subtotal = (
    parseFloat(item1.subtotal) + parseFloat(item2.subtotal)
  ).toFixed(2);
  result.tax = (parseFloat(item1.tax) + parseFloat(item2.tax)).toFixed(2);

  if (result.orders != 0 && result.orders != "0") {
    result.itemsPerOrder = (result.items / result.orders).toFixed(2);
    result.sumPerOrder = (result.grand_total / result.orders).toFixed(2);
  } else {
    result.itemsPerOrder = "0";
    result.sumPerOrder = "0";
  }
  return result;
}

//----------------------------------------------------------------------

function combineJsonData(jsonData_kiosk, jsonData_mobile) {
  let mobile_items_to_add = [];
  for (let m = 0; m < jsonData_mobile.items.length; m++) {
    let mobile_found = false;
    for (let k = 0; k < jsonData_kiosk.items.length; k++) {
      if (jsonData_kiosk.items[k].date === jsonData_mobile.items[m].date) {
        mobile_found = true;
        jsonData_kiosk.items[k] = sumItems(
          jsonData_kiosk.items[k],
          jsonData_mobile.items[m]
        );
      }
    }
    if (!mobile_found) mobile_items_to_add.push(jsonData_mobile.items[m]);
  }
  let result = {};
  result.items = [...jsonData_kiosk.items, ...mobile_items_to_add];
  result.totals = sumItems(jsonData_kiosk.totals, jsonData_mobile.totals);
  result.items = result.items.sort(function(a, b) {
    let a_date = new Date(a.date);
    let b_date = new Date(b.date);
    if (a_date > b_date) {
      return 1;
    }
    if (a_date < b_date) {
      return -1;
    }
    return 0;
  });
  return result;
}

//----------------------------------------------------------------------

export async function getReportOrders(filter) {
  let endpoint;
  let valuesType = filter.valuesType;
  delete filter.valuesType;

  //Kiosk Orders
  let jsonData_kiosk;
  if (
    !filter.created_via ||
    filter.created_via.length === 0 ||
    filter.created_via.includes("kiosk")
  ) {
    switch (valuesType) {
      case "total":
        endpoint = reportKioskOrders_endPoint_total;
        break;

      case "average":
        endpoint = reportKioskOrders_endPoint_average;
        break;

      case "median":
        endpoint = reportKioskOrders_endPoint_median;
        break;
    }
    jsonData_kiosk = await baseAPI.getFilteredItems(
      endpoint,
      filter,
      0,
      0,
      null,
      null,
      FAKE_REPORT_ORDERS_RESPONSE
    );

    jsonData_kiosk.totals = jsonData_kiosk.items.totals;
    jsonData_kiosk.items = jsonData_kiosk.items.items;

    for (let i = 0; i < jsonData_kiosk.items.length; i++) {
      formatItem_Orders(jsonData_kiosk.items[i], filter);
    }

    if (!jsonData_kiosk.totals) jsonData_kiosk.totals = {};
    formatItem_Orders(jsonData_kiosk.totals);
  }

  //Mobile Orders
  let jsonData_mobile;
  if (
    !filter.created_via ||
    filter.created_via.length === 0 ||
    filter.created_via.includes("mobile")
  ) {
    switch (valuesType) {
      case "total":
        endpoint = reportMobileOrders_endPoint_total;
        break;

      case "average":
        endpoint = reportMobileOrders_endPoint_average;
        break;

      case "median":
        endpoint = reportMobileOrders_endPoint_median;
        break;
    }
    jsonData_mobile = await baseAPI.getFilteredItems(
      endpoint,
      filter,
      0,
      0,
      null,
      null,
      FAKE_REPORT_ORDERS_RESPONSE
    );

    jsonData_mobile.totals = jsonData_mobile.items.totals;
    jsonData_mobile.items = jsonData_mobile.items.items;

    for (let i = 0; i < jsonData_mobile.items.length; i++) {
      formatItem_Orders(jsonData_mobile.items[i], filter);
    }

    if (!jsonData_mobile.totals) jsonData_mobile.totals = {};
    formatItem_Orders(jsonData_mobile.totals);
  }

  let jsonData;
  if (jsonData_kiosk && !jsonData_mobile) jsonData = jsonData_kiosk;
  else if (jsonData_mobile && !jsonData_kiosk) jsonData = jsonData_mobile;
  else jsonData = combineJsonData(jsonData_kiosk, jsonData_mobile);

  return jsonData;
}
