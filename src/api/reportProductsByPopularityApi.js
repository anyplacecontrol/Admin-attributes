import { FAKE_PRODUCTS_BY_POPULARITY_RESPONSE } from "../fakeDb/fakeReport_ProductsByPopularity";
import * as baseAPI from "./baseApi";
import * as consts from "../consts/constants";

const reportProductsByPopularity_endPoint =
  "https://" + consts.apiDomain + "/report_api/popularity";

//********************************************************************************
// PRODUCTS BY POPULARITY REPORT

export async function getReport_ProductsByPopularity(filter) {
  filter.machineIds = filter.machineId;
  delete filter.step;
  delete filter.valuesType;
  delete filter.machineId;

  let jsonData = await baseAPI.getFilteredItems(
    reportProductsByPopularity_endPoint,
    filter,
    0,
    0,
    null,
    null,
    FAKE_PRODUCTS_BY_POPULARITY_RESPONSE
  );

  jsonData.totals = jsonData.items.totals;
  jsonData.items = jsonData.items.items;

  for (let i = 0; i < jsonData.items.length; i++) {
    jsonData.items[i].categories || [];
  }

  return jsonData;
}
