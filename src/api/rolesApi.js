import {fetchJSON, throwFetchError} from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
// import * as serviceFuncs from "../utils/serviceFunctions";
// import { FAKE_STATUSES_RESPONSE } from "../fakeDb/fakeStatuses";
import * as roles from "../redux/modules/rolesRedux";

const adminsRoles_endPoint = "https://" + constants.apiDomain + "/users_api/roles";

//********************************************************************************

export async function getItems(roleKind) {
  let itemsJson;

  // if (constants.isFakeData) {
  //   await serviceFuncs.delayTime(constants.fakeDelay);
  //   itemsJson = JSON.parse(
  //     JSON.stringify(FAKE_STATUSES_RESPONSE.body["product_statuses"])
  //   );
  // }

  switch (roleKind) {
    case roles.rolesAdmins: {
      let response = await fetchJSON(adminsRoles_endPoint);
      itemsJson = response.body;
      break;
    }
    default:
      throw "role kind is not processed for API in getItems: " + roleKind;
  }

  if (!itemsJson)
    throw "response is empty or incorrect for API in getItems: " + roleKind;

  return itemsJson;
}

//----------------------------------------------------------------------
