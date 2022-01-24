import * as baseAPI from "./baseApi";
import { FAKE_TAGS_RESPONSE } from "../fakeDb/fakeTags";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";

const tags_endPoint =
  "https://" + constants.apiDomain + "/inventory_api/admin/inventory/tag";
const tagAdd_endPoint = tags_endPoint;
const tagDelete_endPoint = tags_endPoint + "/"; // + {tagId}
const tagUpdate_endPoint = tags_endPoint + "/"; // + {tagId}

export async function getItems() {  
  let result = await baseAPI.getItems(tags_endPoint, FAKE_TAGS_RESPONSE);
  return result;
}

export async function deleteItem(tagObj) {
  throw "not tested yet";
  //return await baseAPI.deleteItem(tagObj.id, tagDelete_endPoint);
}


//---------------------------------------------------------------------------
export async function addItem(tagObj) {
 
  if (!tagObj)
    throwFetchError("argument tagObj is empty", tagAdd_endPoint);

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return null;
  }
  
  delete tagObj.id;

  await fetchJSON(tagAdd_endPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tagObj)
  });

  return null;
}

//---------------------------------------------------------------------------
export async function updateItem(tagObj) {
  throw "not implemented";
  
  // if (!tagObj)
  //   throwFetchError("argument tagObj is empty", tagUpdate_endPoint);

  // if (constants.isFakeData) {
  //   await serviceFuncs.delayTime(constants.fakeDelay);
  //   return null;
  // }

  // await fetchJSON(tagUpdate_endPoint + tagObj.id, {
  //   method: "PUT",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(tagObj)
  // });

  // return null;
}