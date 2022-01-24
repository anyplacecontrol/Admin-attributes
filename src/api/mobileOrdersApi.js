//import { FAKE_ORDER } from "../fakeDb/fakeOrder";
import {FAKE_ORDERS_RESPONSE} from "../fakeDb/fakeOrders";
import * as baseAPI from "./baseApi";
import * as constants from "../consts/constants";
import {fetchJSON, throwFetchError} from "../utils/fetchUtils.js";

const mobileOrders_endPoint =
  "https://" + constants.apiDomain + "/order_api/mobile_orders";
const readyStatus_endPoint =
  "https://" + constants.apiDomain + "/order_api/orders/arrived/"; //+{id}
const closeStatus_endPoint =
  "https://" + constants.apiDomain + "/order_api/orders/close/"; //+{id}
const changeComments_endPoint =
  "https://" + constants.apiDomain + "/order_api/mobile_orders/"; //+{id}

export async function getItems(
  filter,
  topRowNumber,
  itemsPerPage,
  sortBy,
  sortOrder
) {
  if (filter.price) {
    //Convert price with coins to integer
    filter.price = {
      fromPrice: Math.floor(filter.price.startValue * 100),
      toPrice: Math.floor(filter.price.endValue * 100)
    };
  }

  let result = await baseAPI.getFilteredItems(
    mobileOrders_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_ORDERS_RESPONSE
  );

  // convert prices string to float
  for (let i = 0; i < result.items.length; i++) {
    let resultItem = result.items[i];
    resultItem.grandTotal = (resultItem.grandTotal / 100).toFixed(2);
    resultItem.total = (resultItem.total / 100).toFixed(2);
  }

  return result;
}

//---------------------------------------------------------------------------

export async function changeStatus(orderObj, status) {
  if (constants.isFakeData) {
    return;
  }

  let orderTotal = parseFloat(orderObj.total) * 100;

  if (status === "close") {
    let endpoint = closeStatus_endPoint + orderObj.id;
    await fetchJSON(endpoint, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({amount: orderTotal})
    });
  }

  if (status === "ready") {
    let endpoint = readyStatus_endPoint + orderObj.id;
    await fetchJSON(endpoint, {method: "PUT"});
  }
}

export async function changeComments(orderId, comments) {
  let endpoint = changeComments_endPoint + orderId.toString();

  if (!orderId || orderId === "")
    throwFetchError("argument orderId is empty", endpoint);

  if (constants.isFakeData) {
    return;
  }

  await fetchJSON(endpoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({comments: comments})
  });
}
