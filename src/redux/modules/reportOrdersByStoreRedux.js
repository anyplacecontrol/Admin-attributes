import * as reportOrdersByStoreApi from "../../api/reportOrdersByStoreApi";
import * as tableFilters from "../../consts/tableFilters";
import { BaseTableTypes } from "./baseTableRedux";
import {
  BaseReportReducer,
  BaseReportActions,
  BaseReportInitialState
} from "./baseReportRedux";
import * as tableColumns from "../../consts/tableColumns";
import { storesActions } from "./storesRedux";
import * as uiActions from "./uiRedux";

//*******************************************************************************
const PREFIX = "reportOrdersByStore/";

//const REPLACE_COLUMNS = PREFIX + "REPLACE_COLUMNS";

//*******************************************************************************

export const reportOrdersByStoreInitialState = {
  ...BaseReportInitialState,
  columns: [{ ...tableColumns.COLUMN_DATE, isDefault: true, isVisible: true }]
};

//*******************************************************************************

export default function reducer(
  state = reportOrdersByStoreInitialState,
  action = {}
) {
  let result = BaseReportReducer(
    PREFIX,
    state,
    action,
    reportOrdersByStoreInitialState
  );

  if (result) return result;

  switch (action.type) {
    // case REPLACE_COLUMNS:
    //   return { ...state, columns: action.columns };

    default:
      return state;
  }
}

//*******************************************************************************

class ReportOrdersByStoreActions extends BaseReportActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Fetch
  _fetchItemsFromNetwork(filter) {
    return async (dispatch, getState) => {
      let fetchedResponse = await reportOrdersByStoreApi.getReportOrdersByStore(filter);

      let columns = [{ ...tableColumns.COLUMN_DATE, isDefault: true, isVisible: true} ];

      let colorIndex = 0;
      for (var storeName in fetchedResponse.totals) {
        let column = tableColumns.getColumnStoreSales(storeName, colorIndex);
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
          } catch (e) {}
        }
        resolve();
      });

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        { ...tableFilters.FILTER_PERIOD },
        {
          ...tableFilters.FILTER_ITEMS_STORES,
          items: [...getState().stores.items]
        }
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
    return state.reportOrdersByStore;
  };

  getSpacesCount = globalState => {
    return 10;
  };

  getValuesType = globalState => {
    return null;
  };

  getUseChart = globalState => {
    return true;
  };
}

export const reportOrdersByStoreActions = new ReportOrdersByStoreActions();
