import { FAKE_CATEGORIES_RESPONSE } from "../fakeDb/fakeCategories";
import * as baseAPI from "./baseApi";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";
import * as imagesApi from "./imagesApi";

const categories_endPoint =
  "https://" + constants.apiDomain +"/inventory_api/admin/inventory/categories";

const categoryAdd__endPoint = categories_endPoint;
const categoryDelete_endPoint = categories_endPoint + "/"; // + {categoryId}
const categoryUpdate__endPoint = categories_endPoint + "/"; // + {categoryId}

const categoryAddImage_endpoint =
  "https://" + constants.apiDomain +"/inventory_api/admin/image";

//--------------------------------------------------------------------------
export async function getItems() {  
  let result = await baseAPI.getItems(categories_endPoint, FAKE_CATEGORIES_RESPONSE);
  return result;
}

export async function deleteItem(categoryObj) {
  return await baseAPI.deleteItem(categoryObj.id, categoryDelete_endPoint);
}

//---------------------------------------------------------------------------
export async function addItem(categoryObj) {
  if (!categoryObj)
    throwFetchError("argument categoryObj is empty", categoryAdd__endPoint);

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return null;
  }

  let newImage = categoryObj.image;
  let prevImage = categoryObj.prevImage;

  delete categoryObj.id;
  delete categoryObj.image;
  delete categoryObj.prevImage;

  let response = await fetchJSON(categoryAdd__endPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(categoryObj)
  });

  //add image
  let isImageChangeSuccess = await imagesApi.changeImages(
    response.body.id,
    newImage ? [newImage]: [],
    prevImage ? [prevImage]: [],
    categoryAddImage_endpoint,
    "category"
  );

  if (!isImageChangeSuccess)
    return "Category was created, but unable to add image";
  else return null;
}

//---------------------------------------------------------------------------
export async function updateItem(categoryObj) {
  if (!categoryObj)
    throwFetchError("argument categoryObj is empty", categoryUpdate__endPoint);

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return null;
  }

  let newImage = categoryObj.image;
  let prevImage = categoryObj.prevImage;
  
  delete categoryObj.image;
  delete categoryObj.prevImage;

  let result = await fetchJSON(categoryUpdate__endPoint + categoryObj.id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(categoryObj)
  });

  //update image
  let isImageChangeSuccess = await imagesApi.changeImages(
    categoryObj.id,
    newImage ? [newImage]: [],
    prevImage ? [prevImage]: [],
    categoryAddImage_endpoint,
    "category"
  );

  if (!isImageChangeSuccess)
    return "Category was updates, but unable to update image";
  else return null;
}
