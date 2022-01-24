import {FAKE_CUSTOMERS_RESPONSE} from "../fakeDb/fakeCustomers";
import * as baseAPI from "./baseApi";
import {fetchJSON, throwFetchError} from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";
import * as dataFuncs from "../utils/dataFuncs";

const customers_endPoint =
  "https://" + constants.apiDomain + "/users_api/users";
const customerAdd_endPoint = customers_endPoint;
const customerDelete_endPoint = customers_endPoint + "/"; //+{customerId}
const customerUpdate_endPoint = customers_endPoint + "/"; //+{customerId}

//--------------------------------------------------------------------------------

export async function getItems(
  filter,
  topRowNumber,
  itemsPerPage,
  sortBy = null,
  sortOrder = "descending"
) {

  let result = JSON.parse(JSON.stringify(FAKE_CUSTOMERS_RESPONSE));

  // result = await baseAPI.getFilteredItems(
  //   customers_endPoint,
  //   filter,
  //   topRowNumber,
  //   itemsPerPage,
  //   sortBy,
  //   sortOrder,
  //   FAKE_CUSTOMERS_RESPONSE
  // );

  //Note: additional fields (secondaryEmails_asString, etc) are initialized in the customerViewRedux.initializeView_end
  return result;
}

//--------------------------------------------------------------------------------

export async function deleteItem(customerObj) {
  //return await baseAPI.deleteItem(customerObj.id, customerDelete_endPoint);
  return;
}

//--------------------------------------------------------------------------------
export async function addItem(customerObj) {
  throw "not implemented";

  if (!customerObj)
    throwFetchError("argument productObj is empty", customerAdd_endPoint);

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  delete customerObj.id;

  let response = await fetchJSON(customerAdd_endPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(customerObj)
  });

  //TODO: add address for customer.

  //TODO: add model, manufacturer

  return null;
}

//--------------------------------------------------------------------------------

export async function updateItem(customerObj) {
  throw "not implemented";

  if (!customerObj)
    throwFetchError("argument productObj is empty", customerUpdate_endPoint);

  let endPoint = customerUpdate_endPoint + customerObj.id;

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  //Modify address
  let isAddressChangeSuccess = true;
  let newAddressId = null;
  try {
    //check if address was changed:
    if (
      serviceFuncs.isObjectsEquivalent(customerObj.address, customerObj.prevAddress)
    ) {
      //TODO: 
    }
  } catch (e) {
    isAddressChangeSuccess = false;
  }

  //TODO: model, manufacturer

  // Modify Customer

  let newCustomerObj = {...customerObj};
  if (newAddressId)
    newCustomerObj.addressId = newAddressId;
  //TODO: new model ID and new Manufacturer ID  

  let response = await fetchJSON(endPoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newCustomerObj)
  });

  if (isAddressChangeSuccess) return null;

  if (!isAddressChangeSuccess)
    return "Customer was updated, but unable to modify address";

}
