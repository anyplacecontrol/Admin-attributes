import { FAKE_INVENTORY_BY_STORE_RESPONSE } from "../fakeDb/fakeReport_InventoryByStore";
import * as baseAPI from "./baseApi";
import * as consts from "../consts/constants";

const reportInventoryByStore_endPoint =
  "https://" + consts.apiDomain + "/report_api/store";

//********************************************************************************
// INVENTORY BY STORE REPORT

function removeExpiring(item) {
  if (!item) return;
  if (item.itemsExpiring) item.itemsExpiring = "Expiration date not selected";
}

export async function getReport_InventoryByStore(filter) {
  filter.period = filter.expiration_date;
  delete filter.expiration_date;
  delete filter.step;
  delete filter.valuesType;

  let jsonData = await baseAPI.getFilteredItems(
    reportInventoryByStore_endPoint,
    filter,
    0,
    0,
    null,
    null,
    FAKE_INVENTORY_BY_STORE_RESPONSE
  );

  jsonData.totals = jsonData.items.totals;
  jsonData.items = jsonData.items.items;

  if (!filter || !filter.period) {
    for (let i = 0; i < jsonData.items.length; i++) {
      removeExpiring(jsonData.items[i]);
    }
    removeExpiring(jsonData.totals);
  }

  return jsonData;
}
