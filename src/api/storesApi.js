import { FAKE_STORES_RESPONSE } from "../fakeDb/fakeStores";
import * as baseAPI from "./baseApi";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";
import * as imagesApi from "./imagesApi";
import * as addressesApi from "./addressesApi";
import * as dataFuncs from "../utils/dataFuncs";

const stores_endPoint =
  "https://" + constants.apiDomain + "/store_api/admin/stores";
const storeAdd_endPoint =
  "https://" + constants.apiDomain + "/store_api/stores";
const storeDelete_endPoint =
  "https://" + constants.apiDomain + "/store_api/stores/"; //+{storeId}
const storeUpdate_endPoint =
  "https://" + constants.apiDomain + "/store_api/stores/"; //+{storeId}

const storeAddressUpdate_endPoint =
  "https://" + constants.apiDomain + "/store_api/addresses/"; //+{storeId}

const storeImage_endpoint =
  "https://" + constants.apiDomain + "/store_api/stores/image";

const storeWorkHours_endpoint =
  "https://" + constants.apiDomain + "/store_api/stores/workhours";

//--------------------------------------------------------------------------------

export async function getItems(
  filter,
  topRowNumber,
  itemsPerPage,
  sortBy = null,
  sortOrder = "descending"
) {
  if (filter && filter.machineId) filter.machineIds = [filter.machineId];

  let result = await baseAPI.getFilteredItems(
    stores_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_STORES_RESPONSE
  );

  return result;
}

//--------------------------------------------------------------------------------

export async function deleteItem(storeObj) {
  return await baseAPI.deleteItem(storeObj.id, storeDelete_endPoint);
}

//--------------------------------------------------------------------------------

export async function addItem(storeObj) {
  return await AddOrUpdateItem(storeObj, storeAdd_endPoint, "POST");
}

//--------------------------------------------------------------------------------

export async function updateItem(storeObj) {
  let endPoint = storeUpdate_endPoint + storeObj.id;
  return await AddOrUpdateItem(storeObj, endPoint, "PUT");
}

//--------------------------------------------------------------------------------
function findWorkDayById(workDays, id) {
  if (!workDays) return null;
  for (let i = 0; i < workDays.length; i++) {
    if (workDays[i].id === id) return workDays[i];
  }
}

async function updateWorkHours(storeObj) {
  let isWorkHoursChangeSuccess = true;
  let prevWorkHours = storeObj.prevWorkHours || [];

  //add new or modify existing workHours
  for (let i = 0; i < storeObj.WorkHours.length; i++) {
    let workDay;
    try {      
      workDay = storeObj.WorkHours[i];
      let prevWorkDay = findWorkDayById(prevWorkHours, workDay.id);

      //if day does not exist on server - POST
      if (!prevWorkDay) {
        let day = { ...workDay, storeId: storeObj.id };
        delete day.id;
        await fetchJSON(storeWorkHours_endpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(day)
        });
        continue;
      }

      if (serviceFuncs.isObjectsEquivalent(prevWorkDay, workDay)) continue;

      //if day does not exist on server - PUT (update)
      await fetchJSON(storeWorkHours_endpoint + "/" + workDay.id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(workDay)
      });
    } catch (e) {
      isWorkHoursChangeSuccess = false;
      console.log("======Exception 1 of change workHours REST API =====");
      console.log(e);
      console.log(workDay)
    }
  }

  //Delete work days which were deleted in UI
  for (let i = 0; i < prevWorkHours.length; i++) {
    try {
      let workDay = findWorkDayById(storeObj.WorkHours, prevWorkHours[i].id);
      if (workDay) continue;

      await fetchJSON(storeWorkHours_endpoint + "/" + prevWorkHours[i].id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
    } catch (e) {
      isWorkHoursChangeSuccess = false;
      console.log("======Exception 2 of change workHours REST API =====");
      console.log(e);
    }
  }

  return isWorkHoursChangeSuccess;
}

//----------
export async function AddOrUpdateItem(storeObj, endPoint, method) {
  if (!storeObj) {
    throwFetchError("argument storeObj is empty", endPoint);
  }

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  let cleanObj = { ...storeObj };
  delete cleanObj.image;
  delete cleanObj.prevImage;
  delete cleanObj.address;
  delete cleanObj.prevAddress;
  delete cleanObj.WorkHours;

  if (cleanObj.machineId == "") {
    delete cleanObj.machineId;
  }
  cleanObj.withMachine = cleanObj.machineId != null;

  let response = await fetchJSON(endPoint, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cleanObj)
  });

  //add address for store.
  let isAddressChangeSuccess = true;
  isAddressChangeSuccess = await addressesApi.changeAddress(
    response.body.id || cleanObj.id,
    storeObj.address,
    storeObj.prevAddress,
    storeAddressUpdate_endPoint
  );

  //add images for store.
  let isImageChangeSuccess = true;
  isImageChangeSuccess = await imagesApi.changeImages(
    response.body.id || cleanObj.id,
    storeObj.image ? [storeObj.image] : [],
    storeObj.prevImage ? [storeObj.prevImage] : [],
    storeImage_endpoint,
    null
  );

  //update workHours for store
  let isWorkHoursChangeSuccess = await updateWorkHours(storeObj);

  let what = "";
  if (!isImageChangeSuccess) {
    what = what + "image, ";
  }
  if (!isAddressChangeSuccess) {
    what = what + "address, ";
  }
  if (!isWorkHoursChangeSuccess) {
    what = what + "work hours, ";
  }

  let action = method === "POST" ? "created" : "updated";
  if (what != "") {
    return "Store was " + action + ", but unable to modify " + what;
  } else {
    return null;
  }
}
