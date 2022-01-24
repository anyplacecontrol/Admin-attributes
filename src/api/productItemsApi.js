import {fetchJSON, throwFetchError} from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";
import {FAKE_PRODUCT_ITEMS_RESPONSE} from "../fakeDb/fakeProductItems";
import * as baseAPI from "./baseApi";

const productItems_endPoint =
  "https://" + constants.apiDomain + "/inventory_api/admin/inventory/items";
const forbidItem_endPoint = productItems_endPoint + "/forbidded";

//********************************************************************************

export async function getItems(
  _filter,
  topRowNumber,
  itemsPerPage,
  sortBy,
  sortOrder
) {
  let filter = JSON.parse(JSON.stringify(_filter));

  //filter.productIds = ["3420bd40-4c7b-11e9-8892-a509189f5d34"];

  if (filter.weight) {
    filter.weight = [filter.weight];
  }

  // if (filter.machineId && !Array.isArray(filter.machineId)) {
  //   filter.machineId = [filter.machineId];
  // }

  if (filter.price) {
    //Convert price with coins to integer
    filter.price = {
      fromPrice: Math.floor(filter.price.startValue * 100),
      toPrice: Math.floor(filter.price.endValue * 100)
    };
  }

  let result = await baseAPI.getFilteredItems(
    productItems_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_PRODUCT_ITEMS_RESPONSE
  );

  return result;
}


//--------------------------------------------------------------------------------

export async function forbidItems(itemIds, forbiddenState) {

  let endPoint = forbidItem_endPoint;

  if (!itemIds || itemIds.length === 0) {
    throwFetchError("argument itemIds is empty", endPoint);
  }

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  let response = await fetchJSON(endPoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      forbiddenState,
      itemIds
    })
  });

  if (!response.body || !response.body.success) {
    throwFetchError("response is success=false", endPoint);
  }
}
