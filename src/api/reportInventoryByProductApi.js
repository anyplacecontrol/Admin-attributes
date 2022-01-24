import { FAKE_INVENTORY_BY_PRODUCT_RESPONSE } from "../fakeDb/fakeReport_InventoryByProduct";
import * as baseAPI from "./baseApi";
import * as consts from "../consts/constants";

const reportInventoryByProduct_endPoint =
  "https://" + consts.apiDomain + "/report_api/product";

//********************************************************************************
// INVENTORY BY PRODUCT REPORT

function removeExpiring(item) {
  if (!item) return;
  if (item.itemsExpiring) item.itemsExpiring = "Expiration date not selected";
}

export async function getReport_InventoryByProduct(filter) {
  filter.period = filter.expiration_date;
  filter.machineIds = filter.machineId;
  delete filter.expiration_date;
  delete filter.step;
  delete filter.valuesType;
  delete filter.machineId;

  let jsonData = await baseAPI.getFilteredItems(
    reportInventoryByProduct_endPoint,
    filter,
    0,
    0,
    null,
    null,
    FAKE_INVENTORY_BY_PRODUCT_RESPONSE
  );

  jsonData.totals = jsonData.items.totals;
  jsonData.items = jsonData.items.items;

  if (!filter || !filter.period) {
    for (let i = 0; i < jsonData.items.length; i++) {
      removeExpiring(jsonData.items[i]);
      if (jsonData.items[i].itemsInStock === null)
        jsonData.items[i].itemsInStock = 0;
    }
    removeExpiring(jsonData.totals);
  }

  return jsonData;
}
