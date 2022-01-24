import {FAKE_CUSTOMERS_RESPONSE} from "../fakeDb/fakeCustomers";
import * as baseAPI from "./baseApi";
import {fetchJSON, throwFetchError} from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";

const users_endPoint = "https://" + constants.apiDomain + "/users_api/admins";
const userAdd_endPoint = users_endPoint;
const userDelete_endPoint = users_endPoint + "/"; //+{userId}
const userUpdate_endPoint = users_endPoint + "/"; //+{userId}

//--------------------------------------------------------------------------------

export async function getItems(
  filter,
  topRowNumber,
  itemsPerPage,
  sortBy = null,
  sortOrder = "descending"
) {
  let result = await baseAPI.getFilteredItems(
    users_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_CUSTOMERS_RESPONSE
  );

  //Note: additional fields (secondaryEmails_asString, etc) are initialized in the customerViewRedux.initializeView_end
  return result;
}

//--------------------------------------------------------------------------------

export async function deleteItem(userObj) {
  return await baseAPI.deleteItem(userObj.id, userDelete_endPoint);
}

//--------------------------------------------------------------------------------
export async function addItem(userObj) {

  if (!userObj) {
    throwFetchError("argument userObj is empty", userAdd_endPoint);
  }

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  delete userObj.id;

  await fetchJSON(userAdd_endPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  });

  return null;
}

//--------------------------------------------------------------------------------

export async function updateItem(userObj) {

  let endPoint = userUpdate_endPoint + userObj.id;

  if (!userObj) {
    throwFetchError("argument userObj is empty", endPoint);
  }

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  let newUserObj = {
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    phone: userObj.phone,
    roleId: userObj.roleId,
  };

  await fetchJSON(endPoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUserObj)
  });

  return null;
}
