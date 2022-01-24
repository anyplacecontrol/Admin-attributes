import {FAKE_TEMPERATURE_HISTORY} from "../fakeDb/fakeTemperatureHistory";
import {FAKE_REPORT_TEMPERATURES_BY_STORE_RESPONSE} from "../fakeDb/fakeReport_TemperaturesByStore";

import * as dataFuncs from "../utils/dataFuncs";
import * as consts from "../consts/constants";
import {fetchJSON} from "../utils/fetchUtils.js";

const reportTemperatureHistory_endPoint =
  "https://" + consts.apiDomain + "/machines_api/sensor";

//********************************************************************************
// TEMPERATURE HISTORY REPORT (BY MACHINE)

function utcformat1(d) {
  d = new Date(d);
  var tail = "",
    T = [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()];
  if (+T[0] > 12) {
    T[0] -= 12;
    tail = " PM";
  } else tail = " AM";
  var i = 3;
  while (i) {
    --i;
    if (T[i] < 10) T[i] = "0" + T[i];
  }
  return dataFuncs.truncateDate(d) + " " + T.join(":") + tail;
}

//--------------------------------------------------------------------------------

export async function getReport_TemperatureHistory(
  filter,
  sensorType = "TEMPERATURE"
) {
  filter.sensorType = sensorType;
  filter.sensorType = sensorType;
  filter.from = Date.parse(filter.period.startDate);
  filter.to = Date.parse(filter.period.endDate);

  let req =
    reportTemperatureHistory_endPoint +
    "?" +
    "machineId=" +
    filter.machineId +
    "&sensorType=" +
    filter.sensorType +
    "&from=" +
    filter.from +
    "&to=" +
    filter.to;

  let jsonData = FAKE_TEMPERATURE_HISTORY;
  if (!consts.isFakeData) {
    jsonData = await fetchJSON(req);
  }

  let result = {
    items: [],
    totals: {}
  };

  if (jsonData.errorMessage) {
    throw "The selected period is too big. Please, select smaller period range.";
  }

  for (let i = 0; i < jsonData.body.length; i++) {
    let jsonDataItem = {
      date: jsonData.body[i].Date,
      dateStr: utcformat1(jsonData.body[i].Date),
      temperature: {value: jsonData.body[i].Data.Message}
    };
    result.items.push(jsonDataItem);
  }

  let sortedItems = result.items.sort((a, b) => (a.date < b.date ? 1 : -1));
  result.items = sortedItems.slice(0, filter.limit);

  return result;
}

//==================================================================================
//TEMPERATURES BY STORE REPORT (Chart)

function utcformat2(d) {
  d = new Date(d);
  var tail = "",
    T = [d.getUTCHours(), d.getUTCMinutes()];
  if (+T[0] > 12) {
    T[0] -= 12;
    tail = " PM";
  } else tail = " AM";
  var i = 3;
  while (i) {
    --i;
    if (T[i] < 10) T[i] = "0" + T[i];
  }
  return dataFuncs.truncateDate(d) + "|" + T.join(":") + tail;
}


function formatItem(item, filter) {
  if (!item) return;
  if (item.date)
    item.dateStr = utcformat2(item.date);
}

//-----------------------------------------------------------------------------------

function findDate(dateItems, date) {
  let dateStr = utcformat2(date);
  for (let i = 0; i < dateItems.length; i++) {
    if (utcformat2(dateItems[i].date) === dateStr)
      return dateItems[i]
  }
  return null;
}

export async function getReportTemperaturesByStore(filter) {

  let JsonResponses = [];
  for (let i = 0; i < filter.stores.length; i++) {
    let filter1 = {
      period: filter.period,
      machineId: filter.stores[i].machineId,
      limit: filter.limit,
    };
    let response = await getReport_TemperatureHistory(filter1);
    JsonResponses.push({
      ...response,
      name: filter.stores[i].name
    });
  }

  let jsonData = {items: []};

  if (consts.isFakeData) {
    jsonData = JSON.parse(JSON.stringify(FAKE_REPORT_TEMPERATURES_BY_STORE_RESPONSE));
  } else {
    for (let i = 0; i < JsonResponses.length; i++) {
      let storeHistory = JsonResponses[i];
      let storeDates = storeHistory.items;
      if (!storeDates) {
        continue;
      }
      for (let d = 0; d < storeDates.length; d++) {
        let storeDateObj = storeDates[d];
        let existingDate = findDate(jsonData.items, storeDateObj.date);
        if (!existingDate) {
          jsonData.items.push({
            date: storeDateObj.date,
            [storeHistory.name]: storeDateObj.temperature.value
          })
        } else {
          existingDate[storeHistory.name] = storeDateObj.temperature.value;
        }
      }
    }
  }

  jsonData.items = jsonData.items.sort((a, b) => (a.date > b.date ? 1 : -1));

  //be sure that jsonData.items[0] contains all store names (they are used fro PDF report)
  if (jsonData.items.length > 0)
    for (let i = 0; i < JsonResponses.length; i++) {
      let storeName = JsonResponses[i].name;
      if (!jsonData.items[0][storeName]) {
        jsonData.items[0][storeName] = undefined;
      }
    }

  for (let i = 0; i < jsonData.items.length; i++) {
    formatItem(jsonData.items[i], filter);
  }

  return jsonData;
}
