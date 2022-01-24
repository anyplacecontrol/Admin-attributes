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
  //let result = await baseAPI.getItems(controls_endPoint, FAKE_CONTROLS_RESPONSE);
  //return result;
  return JSON.parse(JSON.stringify(FAKE_CONTROLS_RESPONSE))
}

export async function deleteItem(controlObj) {
  throw "not implemented";
}


//---------------------------------------------------------------------------
export async function addItem(controlObj) {
    throw "not implemented";
}

//---------------------------------------------------------------------------
export async function updateItem(controlObj) {
    throw "not implemented";
}