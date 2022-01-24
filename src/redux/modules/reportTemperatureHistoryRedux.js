import * as reportTemperaturesApi from "../../api/reportTemperaturesApi";
import * as tableFilters from "../../consts/tableFilters";
import {BaseTableTypes} from "./baseTableRedux";
import {
  BaseReportReducer,
  BaseReportActions,
  BaseReportInitialState
} from "./baseReportRedux";
import * as tableColumns from "../../consts/tableColumns";

//*******************************************************************************
const PREFIX = "reportTemperatureHistory/";
const CHANGE_MACHINE_ID = PREFIX + "CHANGE_MACHINE_ID";

//*******************************************************************************

export const reportTemperatureHistoryInitialState = {
  ...BaseReportInitialState,
  columns: tableColumns.TEMPERATURE_HISTORY_COLUMNS,
  sortBy: tableColumns.COLUMN_DATE,
  machineId: null
};

//*******************************************************************************

export default function reducer(
  state = reportTemperatureHistoryInitialState,
  action = {}
) {
  let result = BaseReportReducer(
    PREFIX,
    state,
    action,
    reportTemperatureHistoryInitialState
  );

  if (result) return result;

  switch (action.type) {
    case CHANGE_MACHINE_ID:
      return {
        ...state,
        machineId: action.value
      };

    default:
      return state;
  }
}

//*******************************************************************************

class ReportTemperatureHistoryActions extends BaseReportActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Fetch
  _fetchItemsFromNetwork(filter) {
    return async (dispatch, getState) => {
      let fetchedResponse = await reportTemperaturesApi.getReport_TemperatureHistory(
        filter
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
    return globalState.reportTemperatureHistory;
  };

  getStep = globalState => {
    return null;
  };

  getValuesType = globalState => {
    return null;
  };

  getSubCaption = globalState => {
    return "Temperature History for Machine";
  };

  getSpacesCount = globalState => {
    return 40;
  };
}

export const reportTemperatureHistoryActions = new ReportTemperatureHistoryActions();
