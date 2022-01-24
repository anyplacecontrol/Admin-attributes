import {FAKE_MACHINES_RESPONSE} from "../fakeDb/fakeMachines";
import * as baseAPI from "./baseApi";
import {fetchJSON, throwFetchError, urlfy} from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";
import * as addressesApi from "./addressesApi";
import * as dataFuncs from "../utils/dataFuncs";

const machines_endPoint =
  "https://" + constants.apiDomain + "/machines_api/machines";
const machineAdd_endPoint = machines_endPoint;
const machineDelete_endPoint = machines_endPoint + "/"; //+{machineId}
const machineUpdate_endPoint = machines_endPoint + "/"; //+{machineId}

const machineAddressUpdate_endPoint =
  "https://" + constants.apiDomain + "/machines_api/addresses/"; //+{machineId}
const machineTemperature_endPoint = machines_endPoint + "/temperature/"; //+{machineId}
const machineHeartbeat_endPoint = machines_endPoint + "/heartbeat"; //?machineIds=[...ids]}

// new sensor api
const machineSensor_endPoint = "https://" + constants.apiDomain + "/machines_api/sensor";

//--------------------------------------------------------------------------------

function utcformat(d) { // todo: put to helpers file
  d = new Date(d);
  var tail = "",
    //D = [d.getUTCDate(), d.getUTCMonth() + 1, d.getUTCFullYear()],
    T = [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()];
  if (+T[0] > 12) {
    T[0] -= 12;
    tail = " PM " + tail;
  } else tail = " AM " + tail;
  var i = 3;
  while (i) {
    --i;
    //if (D[i] < 10) D[i] = "0" + D[i];
    if (T[i] < 10) T[i] = "0" + T[i];
  }
  return dataFuncs.truncateDate(d) + " " + T.join(":") + tail;
}

export async function getItems(
  filter,
  topRowNumber,
  itemsPerPage,
  sortBy = null,
  sortOrder = "descending"
) {
  let result = await baseAPI.getFilteredItems(
    machines_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_MACHINES_RESPONSE
  );
  return result;
}

//--------------------------------------------------------------------------------

export async function deleteItem(machineObj) {
  return await baseAPI.deleteItem(machineObj.id, machineDelete_endPoint);
}

//--------------------------------------------------------------------------------

export async function addItem(machineObj) {
  return await AddOrUpdateItem(machineObj, machineAdd_endPoint, "POST");
}

//--------------------------------------------------------------------------------

export async function updateItem(machineObj) {
  let endPoint = machineUpdate_endPoint + machineObj.id;

  return await AddOrUpdateItem(machineObj, endPoint, "PUT");
}

//--------------------------------------------------------------------------------

export async function AddOrUpdateItem(machineObj, endPoint, method) {
  if (!machineObj) {
    throwFetchError("argument machineObj is empty", endPoint);
  }

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  let cleanObj = {...machineObj};
  delete cleanObj.prevAddress;
  delete cleanObj.prevManufacturer;
  delete cleanObj.prevModel;
  delete cleanObj.address;
  delete cleanObj.manufacturer;
  delete cleanObj.model;

  // Modify Kiosk
  let response = await fetchJSON(endPoint, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cleanObj)
  });

  //add address for kiosk.
  let isAddressChangeSuccess = true;
  // isAddressChangeSuccess = await addressesApi.changeAddress(
  //   response.body.id,
  //   machineObj.address,
  //   machineObj.prevAddress,
  //   machineAddressUpdate_endPoint
  // );

  //TODO: model, manufacturer
  let isManufacturerChangeSuccess = true;
  let isModelChangeSuccess = true;

  let what = "";
  if (!isAddressChangeSuccess) what = what + "address, ";
  if (!isManufacturerChangeSuccess) what = what + "manufacturer, ";
  if (!isModelChangeSuccess) what = what + "model, ";

  let action = method === "POST" ? "created" : "updated";
  if (what != "")
    return "Machine was " + action + ", but unable to modify " + what;
  else return null;
}

//--------------------------------------------------------------------------------

export async function getTemperature(machineId) {
  let req = machineTemperature_endPoint + machineId;

  if (!machineId || machineId === "")
    throwFetchError("machineId is empty ", null, req);

  let response;

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    response = {
      statusCode: 200,
      body: {
        MachineId: machineId,
        Type: "TEMPERATURE",
        Data: {
          Message: 5,
        },
        Time: {
          Seconds: 1572521740
        }
      }
    };
  } else {
    response = await fetchJSON(req);

    if (!response.body) throwFetchError("Body is empty", null, req);
  }
  return response.body || {};
}

export async function getSensors(machineId, sensorType, from, to) {
  let req = machineSensor_endPoint
    + "?machineId=" + machineId
    + "&sensorType=" + sensorType
    + "&from=" + from
    + "&to=" + to;

  if (!machineId || machineId === "") {
    throwFetchError("machineId is empty ", null, req);
  }

  let result = [];
  const jsonData = await fetchJSON(req);

  if (jsonData.errorMessage) {
    throw "The selected period is too big. Please, select smaller period range.";
  }
  // if (!response.body) {
  //   throwFetchError("Body is empty", null, req);
  // }

  if (jsonData.body.length > 0) {
    for (let i = 0; i < jsonData.body.length; i++) {
      result.push({
        date: jsonData.body[i].Date,
        dateStr: utcformat(jsonData.body[i].Date),
        temperature: jsonData.body[i].Data.Message
      });
    }

    const sortedItems = result.sort((a, b) => (a.date < b.date) ? 1 : -1);
    result = sortedItems;
  } else {
    result.push({
      date: (new Date()).getTime(),
      dateStr: utcformat((new Date()).getTime()),
      temperature: '---',
    });
  }

  return result;
}

//--------------------------------------------------------------------------------

export async function getHeartbeat(machineId) {
  let req = machineHeartbeat_endPoint + "?machineIds=" + urlfy({machineIds: [machineId]});

  if (!machineId || machineId === "")
    throwFetchError("machineId is empty ", null, req);

  let response;

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    response = {
      statusCode: 200,
      body: [{
        "MachineId": "string",
        "Type": "HEARTBEAT",
        "Data": {
          "ItemsLeft": 10
        }
      }]
    };
  } else {
    response = await fetchJSON(req);

    if (!response.body || !response.body[0]) throwFetchError("Body is empty", null, req);
  }
  return response.body[0] || {};
}
