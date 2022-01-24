import * as reportTemperaturesApi from "../../api/reportTemperaturesApi";
import * as tableFilters from "../../consts/tableFilters";
import {BaseTableTypes} from "./baseTableRedux";
import {
  BaseReportReducer,
  BaseReportActions,
  BaseReportInitialState
} from "./baseReportRedux";
import * as tableColumns from "../../consts/tableColumns";
import {storesActions} from "./storesRedux";
import * as uiActions from "./uiRedux";

//*******************************************************************************
const PREFIX = "reportTemperaturesByStore/";

const REPLACE_COLUMNS = PREFIX + "REPLACE_COLUMNS";

//*******************************************************************************

export const reportTemperaturesByStoreInitialState = {
  ...BaseReportInitialState,
  columns: [{...tableColumns.COLUMN_DATE, isDefault: true, isVisible: true}]
};

//*******************************************************************************

export default function reducer(
  state = reportTemperaturesByStoreInitialState,
  action = {}
) {
  let result = BaseReportReducer(
    PREFIX,
    state,
    action,
    reportTemperaturesByStoreInitialState
  );

  if (result) return result;

  switch (action.type) {
    case REPLACE_COLUMNS:
      return {...state, columns: action.columns};

    default:
      return state;
  }
}

//*******************************************************************************

class ReportTemperaturesByStoreActions extends BaseReportActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Fetch
  _fetchItemsFromNetwork(filter) {
    return async (dispatch, getState) => {

      //if selected "All Stores" -> add each of stores to filter
      let filter1 = JSON.parse(JSON.stringify(filter));
      if (!filter1.stores || filter1.stores.length === 0) {
        filter1.stores = [];
        let stores = getState().stores.items;
        for (let i = 0; i < stores.length; i++) {
          if (stores[i].machineId &&
            stores[i].machineId != "")
            filter1.stores.push({machineId: stores[i].machineId, name: stores[i].name})
        }
      }

      let fetchedResponse = await reportTemperaturesApi.getReportTemperaturesByStore(
        filter1
      );

      let columns = [
        {...tableColumns.COLUMN_DATE, isDefault: true, isVisible: true}
      ];

      let colorIndex = 0;
      if (fetchedResponse.items.length > 0)
        for (var storeName in fetchedResponse.items[0]) {
          if (storeName === "date" || storeName === "dateStr") continue;

          let column = tableColumns.getColumnStoreSales(storeName, colorIndex, "°C", "right");
          columns.push(column);

          colorIndex = colorIndex + 1;
        }

      await dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_COLUMNS),
        columns
      });

      return fetchedResponse;
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {
      let p1 = new Promise(async (resolve, reject) => {
        if (
          !getState().stores.items ||
          getState().stores.items.length <= getState().ui.itemsPerPage
        ) {
          try {
            await dispatch(
              storesActions.fetchItems(0, false, true, null, true)
            );
          } catch (e) {
          }
        }
        resolve();
      });

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        {...tableFilters.FILTER_PERIOD},
        {
          ...tableFilters.FILTER_ITEMS_STORES_WITH_MACHINES,
          items: [...getState().stores.items]
        },
        {
          ...tableFilters.FILTER_LIMIT,
          items: ['10', '25', '100', '500', '1000']
        },
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

  _getStateSlice = state => {
    return state.reportTemperaturesByStore;
  };

  getSpacesCount = globalState => {
    return 10;
  };

  getValuesType = globalState => {
    return null;
  };

  getStep = globalState => {
    return null;
  };

  getUseChart = globalState => {
    return true;
  };

}

export const reportTemperaturesByStoreActions = new ReportTemperaturesByStoreActions();
