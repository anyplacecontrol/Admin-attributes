import * as baseAPI from "./baseApi";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";
import * as dataFuncs from "../utils/dataFuncs";
import { FAKE_PRODUCTS_RESPONSE } from "../fakeDb/fakeProducts";
import * as imagesApi from "./imagesApi";

const products_endPoint =
  "https://" + constants.apiDomain +"/inventory_api/admin/inventory/products";

const productAdd__endPoint = products_endPoint;
const productDelete_endPoint = products_endPoint + "/"; //+{productId}
const productUpdate_endPoint = products_endPoint + "/"; //+{productId}

const productCategoryModify_endPoint =
  "https://" + constants.apiDomain +"/inventory_api/admin/inventory/products/category";

export const product_AddTag_endpoint =
  "https://" + constants.apiDomain +"/inventory_api/admin/inventory/productTag/"; //+tagId

const product_DeleteTag_Begin_endpoint = product_AddTag_endpoint; //+{tagId} + product_DeleteTag_End_endpoint
const product_DeleteTag_End_endpoint = "/product/"; //+{productId}

const productAddImage_endpoint =
  "https://" + constants.apiDomain +"/inventory_api/admin/image";

//********************************************************************************
export async function getItems(
  filter,
  topRowNumber,
  itemsPerPage,
  sortBy = null,
  sortOrder = "descending"
) {
  // if (filter.id && filter.id!="") {
  //   filter.ids = [filter.id ];
  // }

  let result =  await baseAPI.getFilteredItems(
    products_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_PRODUCTS_RESPONSE
  );
  
  return result;
}

//--------------------------------------------------------------------------------
export async function addItem(productObj) {
  if (!productObj)
    throwFetchError("argument productObj is empty", productAdd__endPoint);

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  let newImages = productObj.images;
  let prevImages = productObj.prevImages;

  delete productObj.images;
  delete productObj.prevImages;
  delete productObj.categories;
  delete productObj.id;

  let response = await fetchJSON(productAdd__endPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productObj)
  });

  //add tags for product
  let isTagsChangeSuccess = true;
  try {
    for (let i = 0; i < productObj.tags.length; i++) {
      let tag = productObj.tags[i];

      await fetchJSON(product_AddTag_endpoint + tag.id, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: response.body.id
        })
      });
    }
  } catch (e) {
    isTagsChangeSuccess = false;
  }
  
  //TODO: add metric for product

  //add image
  let isImageChangeSuccess = await imagesApi.changeImages(
    response.body.id,
    newImages,
    prevImages,
    productAddImage_endpoint,
    "product"
  );

  let str = "";
  if (!isTagsChangeSuccess)
    str = "tag(s), "  
  if (!isImageChangeSuccess)
    str += "image(s)."

  if (str!="")
    return "Product was created, but unable to add: " + str;
  else
    return null;
}

//--------------------------------------------------------------------------------
export async function updateItem(productObj) {
  if (!productObj)
    throwFetchError("argument productObj is empty", productUpdate_endPoint);

  let endPoint = productUpdate_endPoint + productObj.id;

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  let newImages = productObj.images;
  let prevImages = productObj.prevImages;

  delete productObj.images;
  delete productObj.prevImages;

  let response = await fetchJSON(endPoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productObj)
  });

  //Modify category
  let isCategoryChangeSuccess = true;
  try {
    //check if category was changed:
    if (
      productObj.prevCategories.length == 0 ||
      (productObj.prevCategories.length > 0 &&
        productObj.categories.length > 0 &&
        productObj.prevCategories[0].id != productObj.categories[0].id)
    ) {
      //delete old category
      if (productObj.prevCategories.length > 0)
        await fetchJSON(productCategoryModify_endPoint, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            productId: productObj.id,
            categoryId: productObj.prevCategories[0].id
          })
        });

      //add new category
      if (productObj.categories.length > 0)
        await fetchJSON(productCategoryModify_endPoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            productId: productObj.id,
            categoryId: productObj.categories[0].id
          })
        });
    }
  } catch (e) {
    isCategoryChangeSuccess = false;
  }

  //Modify tags
  let isTagsChangeSuccess = true;
  try {
    //add new tags
    for (let i = 0; i < productObj.tags.length; i++) {
      let tag = productObj.tags[i];
      if (dataFuncs.isItemByIdExists(tag.id, productObj.prevTags)) continue;

      await fetchJSON(product_AddTag_endpoint + tag.id, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: response.body.id
        })
      });
    }

    //remove unused tags
    for (let i = 0; i < productObj.prevTags.length; i++) {
      let tag = productObj.prevTags[i];
      if (dataFuncs.isItemByIdExists(tag.id, productObj.tags)) continue;

      let endPoint =
        product_DeleteTag_Begin_endpoint +
        tag.id +
        product_DeleteTag_End_endpoint +
        productObj.id;

      await fetchJSON(endPoint, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
    }
  } catch (e) {
    isTagsChangeSuccess = false;
  }
    
  //TODO: modify metric for product

  //modify images
  let isImageChangeSuccess = await imagesApi.changeImages(
    response.body.id,
    newImages,
    prevImages,
    productAddImage_endpoint,
    "product"
  );
  
  let str = "";
  if (!isTagsChangeSuccess)
    str = "tag(s), "
  if (!isCategoryChangeSuccess)
    str += "category, "
  if (!isImageChangeSuccess)
    str += "image(s)."

  if (str!="")
    return "Product was updated, but unable to modify: " + str;
  else
    return null;
}

//--------------------------------------------------------------------------------
export async function deleteItem(productObj) {
  return await baseAPI.deleteItem(productObj.id, productDelete_endPoint);
}

