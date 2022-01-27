import * as baseAPI from "./baseApi";
import { FAKE_CONTROLS_RESPONSE } from "../fakeDb/fakeControls";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";

const controls_endPoint =
  "https://" + constants.apiDomain + "/inventory_api/admin/inventory/control";
const controlAdd_endPoint = controls_endPoint;
const controlDelete_endPoint = controls_endPoint + "/"; // + {controlId}
const controlUpdate_endPoint = controls_endPoint + "/"; // + {controlId}

export async function getItems() {  
  return JSON.parse(JSON.stringify(FAKE_CONTROLS_RESPONSE));
  
  let Json = await fetchJSON(controls_endPoint);

  if (!Json.body) throwFetchError("Body is empty", null, controls_endPoint);
  let response = {
    items: Json.body.data,
    topRowNumber: 0,
    maxItemsQty: Json.body.count
  };

  return response;
}

export async function deleteItem(controlObj) {
  throw "not implemented";
  return await baseAPI.deleteItem(controlObj.id, controlDelete_endPoint);
}

//---------------------------------------------------------------------------
export async function addItem(controlObj) {
  throw "not implemented";
  if (!controlObj)
    throwFetchError("argument controlObj is empty", controlAdd_endPoint);

  delete controlObj.id;
  delete controlObj.isChecked;
  delete controlObj.isValidated;
  delete controlObj.language  

  await fetchJSON(controlAdd_endPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(controlObj)
  });

  return null;
}

//---------------------------------------------------------------------------
export async function updateItem(controlObj) {
  throw "not implemented";

  if (!controlObj)
    throwFetchError("argument metricObj is empty", controlUpdate_endPoint);

  let endPoint = controlUpdate_endPoint + controlObj.id;
  
  delete controlObj.isChecked;
  delete controlObj.isValidated;
  delete controlObj.language  

  await fetchJSON(endPoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(controlObj)
  });

  return null;
}
