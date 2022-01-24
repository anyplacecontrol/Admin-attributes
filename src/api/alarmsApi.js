import * as baseAPI from "./baseApi";
import * as constants from "../consts/constants";
import {FAKE_COOKING_TIPS_RESPONSE} from "../fakeDb/fakeCookingTips";

const alarms_endPoint = `https://${constants.apiDomain}/machines_api/alarms`;

//---------------------------------------------------------------------------

export async function getItems(
  filter,
  // topRowNumber,
  // itemsPerPage,
  // sortBy = null,
  // sortOrder = "descending"
) {
  let defaultLimit = 10;
  let defaultMachineId = 'fa3dc6c0-450f-11ea-9564-598269956044'; // ARS2
  let defaultPeriod = {
    from: new Date().setDate(new Date().getDate() - 1),
    to: new Date().getTime()
  };

  let limit = filter.limit
    ? filter.limit
    : defaultLimit;
  let machineId = filter.machineId
    ? filter.machineId
    : defaultMachineId;
  let period = filter.period && filter.period.startDate
    ? {
      from: new Date(filter.period.startDate).getTime(),
      to: new Date(filter.period.endDate).getTime()
    } : defaultPeriod;

  const url = `${alarms_endPoint}?machineId=${machineId}&from=${period.from}&to=${period.to}&limit=${limit}`;
  let result = await baseAPI.getItems(url, FAKE_COOKING_TIPS_RESPONSE);

  return result;
}

//---------------------------------------------------------------------------
