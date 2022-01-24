import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";
import { FAKE_STATUSES_RESPONSE } from "../fakeDb/fakeStatuses";
import * as statuses from "../redux/modules/statusesRedux";
import * as baseAPI from "./baseApi";
import { ROUTE_NAMES } from "../consts/routeNames";

const productsStatuses_endPoint =  
  "https://" + constants.apiDomain +"/inventory_api/admin/inventory/statuses";
const ordersStatuses_endPoint =
  "https://" + constants.apiDomain +"/order_api/admin/orders/statuses";
const kiosksStatuses_endPoint =
  "https://" + constants.apiDomain +"/kiosk_api/kiosks/statuses";
const machinesStatuses_endPoint =
  "https://" + constants.apiDomain +"/machines_api/machines/statuses";
const storesStatuses_endPoint =
  "https://" + constants.apiDomain +"/store_api/stores/statuses";

export const section_product_statuses = "product_statuses";
export const section_product_items_statuses = "product_items_statuses";

//********************************************************************************

export async function getItems(statusKind) {
  let itemsJson;

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    itemsJson = JSON.parse(
      JSON.stringify(FAKE_STATUSES_RESPONSE.body["product_statuses"])
    );
  }

  switch (statusKind) {
    case statuses.statusesProducts: {
      let response = await fetchJSON(productsStatuses_endPoint);
      itemsJson = response.body[section_product_statuses];
      break;
    }
    case statuses.statusesProductItems: {
      let response = await fetchJSON(productsStatuses_endPoint);
      itemsJson = response.body[section_product_items_statuses];
      break;
    }
    case statuses.statusesOrders: {
      let response = await fetchJSON(ordersStatuses_endPoint);
      itemsJson = response.body;
      break;
    }
    case statuses.statusesKiosks: {
      let response = await fetchJSON(kiosksStatuses_endPoint);
      itemsJson = response.body;
      break;
    }
    case statuses.statusesMachines: {
      let response = await fetchJSON(machinesStatuses_endPoint);
      itemsJson = response.body;
      break;
    }
    case statuses.statusesStores: {
      let response = await fetchJSON(storesStatuses_endPoint);
      itemsJson = response.body;
      break;
    }
    case statuses.statusesCustomers: {
      itemsJson = JSON.parse(
        JSON.stringify(FAKE_STATUSES_RESPONSE.body["product_statuses"])
      );
      // let response = await fetchJSON(customersStatuses_endPoint);
      // itemsJson = response.body;
      break;
    }
    default:
      throw "status kind is not processed for API in getItems: " + statusKind;
  }

  if (!itemsJson)
    throw "response is empty or incorrect for API in getItems: " + statusKind;

  return itemsJson;
}

//----------------------------------------------------------------------

// function getCorrectEndpoint(statusKind) {
//   //it can be 2 variants of argument (1. for delete: statuses. 2) for add/update: ROUTE_NAMES)
//   switch (statusKind) {
//     case statuses.statusesProducts:
//     case ROUTE_NAMES.statusesProductsView: {
//       return productsStatuses_endPoint + "/" + section_product_statuses + "/";
//     }
//     case statuses.statusesProductItems:
//     case ROUTE_NAMES.statusesProductItemsView: {
//       return (
//         productsStatuses_endPoint + "/" + section_product_items_statuses + "/"
//       );
//     }
//     case statuses.statusesOrders:
//     case ROUTE_NAMES.statusesOrdersView: {
//       return ordersStatuses_endPoint + "/";
//     }
//     default:
//       throw "unknown statusKind " + statusKind + " in statusesApi.deleteItem";
//   }
// }

// export async function deleteItem(statusObj) {
//   if (constants.isFakeData) {
//     await serviceFuncs.delayTime(constants.fakeDelay);
//     return null;
//   }

//   await baseAPI.deleteItem(
//     statusObj.id,
//     getCorrectEndpoint(statusObj.statusKind)
//   );
// }

// export async function addItem(statusObj) {
//   if (!statusObj) throw "argument categoryObj is empty in statusesApi.addItem";

//   if (constants.isFakeData) {
//     await serviceFuncs.delayTime(constants.fakeDelay);
//     return null;
//   }

//   let statusKind = statusObj.statusKind;
//   delete statusObj.id;
//   delete statusObj.statusKind;

//   await fetchJSON(getCorrectEndpoint(statusKind), {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(statusObj)
//   });

//   return null;
// }

// export async function updateItem(statusObj) {
//   if (!statusObj)
//     throw "argument categoryObj is empty in statusesApi.updateItem";

//   if (constants.isFakeData) {
//     await serviceFuncs.delayTime(constants.fakeDelay);
//     return null;
//   }

//   let statusKind = statusObj.statusKind;
//   delete statusObj.statusKind;

//   await fetchJSON(getCorrectEndpoint(statusKind) + statusObj.id, {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(statusObj)
//   });

//   return null;
// }
