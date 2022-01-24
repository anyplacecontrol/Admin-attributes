//import { FAKE_ORDER } from "../fakeDb/fakeOrder";
import { FAKE_ORDERS_RESPONSE } from "../fakeDb/fakeOrders";
import * as baseAPI from "./baseApi";
import * as constants from "../consts/constants";
import {fetchJSON} from "../utils/fetchUtils";

const orders_endPoint =
  "https://" + constants.apiDomain +"/order_api/orders";
const readyStatus_endPoint =
  "https://" + constants.apiDomain +"/order_api/orders/arrived/"; //+{id}
const closeStatus_endPoint =
  "https://" + constants.apiDomain +"/order_api/orders/close/"; //+{id}
  

export async function getItems(filter, topRowNumber, itemsPerPage, sortBy,
  sortOrder) {
  
  if (filter.price) {
    //Convert price with coins to integer
    filter.price = {
      fromPrice: Math.floor(filter.price.startValue * 100),
      toPrice: Math.floor(filter.price.endValue * 100)
    };
  }

  let result = await baseAPI.getFilteredItems(
    orders_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,    
    sortBy,
    sortOrder,
    FAKE_ORDERS_RESPONSE,
  );
  return result;
}

