import * as baseAPI from "./baseApi";
import {FAKE_COOKING_TIPS_RESPONSE} from "../fakeDb/fakeCookingTips";
import {fetchJSON, throwFetchError} from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";

const cookingTips_endPoint =
  // "https://" + constants.apiDomain + "/static_content/admin/static/cookingTips";
  "https://" + constants.apiDomain + "/inventory_api/admin/inventory/products/tip";
const cookingTipsAdd_endPoint = cookingTips_endPoint;
const cookingTipsDelete_endPoint = cookingTips_endPoint + "/"; // + {cookingTipId}
const cookingTipsUpdate_endPoint = cookingTips_endPoint;

//---------------------------------------------------------------------------

export async function getItems(
  filter,
  topRowNumber,
  itemsPerPage,
  sortBy = null,
  sortOrder = "descending"
) {
  let result = await baseAPI.getFilteredItems(
    cookingTips_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_COOKING_TIPS_RESPONSE
  );
  return result;
}

//---------------------------------------------------------------------------

export async function deleteItem(cookingTipsObj) {
  return await baseAPI.deleteItem(cookingTipsObj.id, cookingTipsDelete_endPoint);
}

//---------------------------------------------------------------------------

export async function addItem(cookingTipsObj) {

  if (!cookingTipsObj) {
    throwFetchError("argument cookingTipsObj is empty", cookingTipsAdd_endPoint);
  }

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return null;
  }

  let body = {
    productId: cookingTipsObj.product.id,
    tipContent: {
      title: cookingTipsObj.title,
      text: cookingTipsObj.text
    }
  };

  await fetchJSON(cookingTipsAdd_endPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return null;
}

//---------------------------------------------------------------------------

export async function updateItem(cookingTipsObj) {

  if (!cookingTipsObj) {
    throwFetchError("argument cookingTipsObj is empty", cookingTipsUpdate_endPoint);
  }

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return null;
  }

  let body = {
    tipId: cookingTipsObj.id,
    tipContent: {
      productId: cookingTipsObj.product.id,
      title: cookingTipsObj.title,
      text: cookingTipsObj.text
    }
  };

  await fetchJSON(cookingTipsUpdate_endPoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return null;
}
