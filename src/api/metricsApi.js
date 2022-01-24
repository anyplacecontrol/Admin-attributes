import { FAKE_METRICS_RESPONSE } from "../fakeDb/fakeMetrics";
import * as baseAPI from "./baseApi";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";

const metrics_endPoint =
  "https://" + constants.apiDomain + "/inventory_api/admin/inventory/metric";
const metricAdd_endPoint = metrics_endPoint;
const metricDelete_endPoint = metrics_endPoint + "/"; //+{metricId}
const metricUpdate_endPoint = metrics_endPoint + "/"; //+{metricId}

//--------------------------------------------------------------------------------
function changeIsChecked(metricUi, value) {
  if (!metricUi) return;
  if (metricUi.weight) {
    if (value) metricUi.weight.isChecked = true;
    else delete metricUi.weight.isChecked;
  }
  if (metricUi.thickness) {
    if (value) metricUi.thickness.isChecked = true;
    else delete metricUi.thickness.isChecked;
  }
  if (metricUi.marbling) {
    if (value) metricUi.marbling.isChecked = true;
    else delete metricUi.marbling.isChecked;
  }
}
//--------------------------------------------------------------------------------
function getButtonIndexById(id, buttons) {
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].id.toString() === id) return i;
  }
  return null;
}

function transformRules_forRedux(rules, metricUi) {
  if (!rules.weight) return;
  if (!rules.weight.values) return;
  if (!metricUi.weight) return;
  if (!metricUi.weight.buttons) return;

  //values_transformed
  rules.weight.values_transformed = [{}, {}, {}];

  for (var id in rules.weight.values) {
    let arrIndex = getButtonIndexById(id, metricUi.weight.buttons);
    if (arrIndex === null) continue;

    rules.weight.values_transformed[arrIndex] = {
      min: rules.weight.values[id].min.toString(),
      max: rules.weight.values[id].max.toString()
    };
  }
  delete rules.weight.values;
}

function transformRules_forApi(metricObj) {
  if (
    metricObj.metricUi.weight &&
    metricObj.metricUi.weight.buttons &&
    metricObj.metricUi.weight.buttons.length > 0 &&
    metricObj.rules &&
    metricObj.rules.weight &&
    metricObj.rules.weight.values_transformed &&
    metricObj.rules.weight.values_transformed.length > 0
  ) {
    metricObj.rules.weight.values = {};
    for (let i = 0; i < metricObj.metricUi.weight.buttons.length; i++) {
      if (
        metricObj.metricUi.weight.buttons[i] === null ||
        metricObj.metricUi.weight.buttons[i].id === null
      )
        continue;

      let id = metricObj.metricUi.weight.buttons[i].id;
      let value = metricObj.rules.weight.values_transformed[i];
      if (value) {
        value.min = parseFloat(value.min);
        value.max = parseFloat(value.max);
        metricObj.rules.weight.values[id.toString()] = value;
      }
    }
  }

  if (
    metricObj.rules &&
    metricObj.rules.weight &&
    metricObj.rules.weight.values_transformed
  )
    delete metricObj.rules.weight.values_transformed;
}

export async function getItems() {
  let response;
  let Json;

  if (constants.isFakeData) {
    Json = { body: JSON.parse(JSON.stringify(FAKE_METRICS_RESPONSE)) };
  } else {
    Json = await fetchJSON(metrics_endPoint);
  }

  if (!Json.body) throwFetchError("Body is empty", null, metrics_endPoint);
  response = {
    items: Json.body.data,
    topRowNumber: 0,
    maxItemsQty: Json.body.count
  };

  //flag isChecked is required for view form
  if (response.items) {
    for (let i = 0; i < response.items.length; i++) {
      let metricUi = response.items[i].metricUi;
      if (!metricUi) continue;
      if (response.items[i].rules)
        transformRules_forRedux(response.items[i].rules, metricUi); //convertor to different format
      changeIsChecked(metricUi, true);
    }
  }

  return response;
}

//--------------------------------------------------------------------------------

export async function deleteItem(metricObj) {
  return await baseAPI.deleteItem(metricObj.id, metricDelete_endPoint);
}

//--------------------------------------------------------------------------------
export async function addItem(metricObj) {
  if (!metricObj)
    throwFetchError("argument metricObj is empty", metricAdd_endPoint);

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  transformRules_forApi(metricObj);

  changeIsChecked(metricObj.metricUi, false); //delete flag isChecked

  await fetchJSON(metricAdd_endPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: metricObj.name,
      description: metricObj.description,
      metricUi: metricObj.metricUi,
      rules: metricObj.rules,
      translations: metricObj.translations,
    })
  });

  return null;
}

//--------------------------------------------------------------------------------

export async function updateItem(metricObj) {
  if (!metricObj)
    throwFetchError("argument metricObj is empty", metricUpdate_endPoint);

  let endPoint = metricUpdate_endPoint + metricObj.id;

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  transformRules_forApi(metricObj);

  changeIsChecked(metricObj.metricUi, false); //delete flag isChecked

  await fetchJSON(endPoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(metricObj)
  });

  return null;
}
