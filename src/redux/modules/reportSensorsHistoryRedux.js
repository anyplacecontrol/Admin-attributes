import * as machinesApi from "../../api/machinesApi";
import * as tableFilters from "../../consts/tableFilters";
import {BaseTableTypes} from "./baseTableRedux";
import {
  BaseReportReducer,
  BaseReportActions,
  BaseReportInitialState
} from "./baseReportRedux";
import * as tableColumns from "../../consts/tableColumns";
import * as reportTemperaturesApi from "../../api/reportTemperaturesApi";

//*******************************************************************************
const PREFIX = "reportSensorsHistory/";
const CHANGE_MACHINE_ID = PREFIX + "CHANGE_MACHINE_ID";

//*******************************************************************************

export const reportSensorsHistoryInitialState = {
  ...BaseReportInitialState,
  columns: tableColumns.SENSORS_HISTORY_COLUMNS,
  sortBy: tableColumns.COLUMN_SENSOR_1,
  machineId: null
};

//*******************************************************************************

export default function reducer(
  state = reportSensorsHistoryInitialState,
  action = {}
) {
  let result = BaseReportReducer(
    PREFIX,
    state,
    action,
    reportSensorsHistoryInitialState
  );

  if (result) return result;

  switch (action.type) {
    case CHANGE_MACHINE_ID:
      return {...state, machineId: action.value};

    default:
      return state;
  }
}

//*******************************************************************************

class ReportSensorsHistoryActions extends BaseReportActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Fetch
  _fetchItemsFromNetwork(filter) {
    return async (dispatch, getState) => {
      let sensorType = 'Shelf_1_Temp'; // todo: add sensors list

      let fetchedResponse = await reportTemperaturesApi.getReport_TemperatureHistory(
        filter, sensorType
      );

      return fetchedResponse;
    };
  }

  changeMachineId(machineId) {
    return async (dispatch, getState) => {
      await dispatch({type: CHANGE_MACHINE_ID, value: machineId});
      const defaultFilterItems = this._getStateSlice(getState()).filterItems[0]; // advancedDateRange

      return dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_FILTER_ITEMS),
        filterItems: [
          // ...this._getStateSlice(getState()).filterItems,
          defaultFilterItems,
          {
            ...tableFilters.FILTER_MACHINE_ID,
            value: machineId
          },
          {
            ...tableFilters.FILTER_LIMIT,
            items: ['10', '25', '100', '500', '1000']
          },
        ]
      });
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {
      let filterItems = [
        {...tableFilters.FILTER_PERIOD},
      ];

      return dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_FILTER_ITEMS),
        filterItems: filterItems
      });
    };
  }

  //------------------------------------------------------------------------------
  // ABSTRACT FUNCS REALIZATION

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  _getStateSlice = globalState => {
    return globalState.reportSensorsHistory;
  };

  getStep = globalState => {
    return null;
  };

  getValuesType = globalState => {
    return null;
  };

  getSubCaption = globalState => {
    return "Sensors History for Machine";
  };

  getSpacesCount = globalState => {
    return 40;
  };
}

export const reportSensorsHistoryActions = new ReportSensorsHistoryActions();
