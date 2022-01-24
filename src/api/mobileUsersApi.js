import {FAKE_CUSTOMERS_RESPONSE} from "../fakeDb/fakeCustomers";
import * as baseAPI from "./baseApi";
import {fetchJSON, throwFetchError} from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";
import * as dataFuncs from "../utils/dataFuncs";

const mobileUsers_endPoint =
  "https://" + constants.apiDomain + "/users_api/users";
const mobileUserAdd_endPoint = mobileUsers_endPoint;
const mobileUserDelete_endPoint = mobileUsers_endPoint + "/"; //+{mobileUserId}
const mobileUserUpdate_endPoint = mobileUsers_endPoint + "/"; //+{mobileUserId}

//--------------------------------------------------------------------------------

export async function getItems(
  filter,
  topRowNumber,
  itemsPerPage,
  sortBy = null,
  sortOrder = "descending"
) {
  let result = await baseAPI.getFilteredItems(
    mobileUsers_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_CUSTOMERS_RESPONSE
  );
  return result;
}

//--------------------------------------------------------------------------------

export async function deleteItem(mobileUserObj) {
  return await baseAPI.deleteItem(mobileUserObj.id, mobileUserDelete_endPoint);
}

//--------------------------------------------------------------------------------
export async function addItem(mobileUserObj) {
  throw "not implemented";

  if (!mobileUserObj)
    throwFetchError("argument mobileUserObj is empty", mobileUserAdd_endPoint);

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  delete mobileUserObj.id;

  let response = await fetchJSON(mobileUserAdd_endPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(mobileUserObj)
  });

  return null;
}

//--------------------------------------------------------------------------------

export async function updateItem(mobileUserObj) {

  if (!mobileUserObj) {
    throwFetchError("argument mobileUserObj is empty", mobileUserUpdate_endPoint);
  }

  let endPoint = mobileUserUpdate_endPoint + mobileUserObj.id;

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  await fetchJSON(endPoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(mobileUserObj)
  });

  return null;
}
