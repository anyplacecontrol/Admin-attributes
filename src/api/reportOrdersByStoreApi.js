import { FAKE_REPORT_ORDERS_BY_STORE_RESPONSE } from "../fakeDb/fakeReport_OrdersByStore";
import * as baseAPI from "./baseApi";
import * as dataFuncs from "../utils/dataFuncs";
import * as consts from "../consts/constants";

const reportOrdersByStore_endPoint =
  "https://" + consts.apiDomain + "/report_api/store/order";

//*************************************************************************************

function formatItem(item, filter) {
    if (!item) return;
    if (item.date)
      item.dateStr = dataFuncs.truncateDate(item.date, filter.step);

     for(var propertyName in item) {
        if (propertyName!="date" &&
            propertyName!="dateStr") 
        item[propertyName] = ((item[propertyName] || 0) / 100).toFixed(2)
     }    
  }

//------------------------------------------------------------------------
  
export async function getReportOrdersByStore(filter) {   

  let endpoint = reportOrdersByStore_endPoint;
  
  let jsonData;

  jsonData = await baseAPI.getFilteredItems(
    endpoint,
    filter,
    0,
    0,
    null,
    null,
    FAKE_REPORT_ORDERS_BY_STORE_RESPONSE
  );

  jsonData.totals = jsonData.items.totals;
  jsonData.items = jsonData.items.items;

  for (let i = 0; i < jsonData.items.length; i++) {
    formatItem(jsonData.items[i], filter);
  }

  if (!jsonData.totals) jsonData.totals = {};
  formatItem(jsonData.totals);

  return jsonData;
}

