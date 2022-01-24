import * as reportProductsByPopularityApi from "../../api/reportProductsByPopularityApi";
import * as tableFilters from "../../consts/tableFilters";
import {BaseTableTypes} from "./baseTableRedux";
import {
  BaseReportReducer,
  BaseReportActions,
  BaseReportInitialState
} from "./baseReportRedux";
import * as tableColumns from "../../consts/tableColumns";
import {storesActions} from "./storesRedux";
import {productsActions} from "./productsRedux";
import * as uiActions from "./uiRedux";
import * as dataFuncs from "../../utils/dataFuncs";

//*******************************************************************************
const PREFIX = "reportProductsByPopularity/";

//*******************************************************************************

export const reportProductsByPopularityInitialState = {
  ...BaseReportInitialState,
  columns: tableColumns.PRODUCTS_BY_POPULARITY_COLUMNS,
  sortBy: tableColumns.COLUMN_POPULARITY,
  sortOrder: "ascending"
};

//*******************************************************************************

export default function reducer(
  state = reportProductsByPopularityInitialState,
  action = {}
) {
  let result = BaseReportReducer(
    PREFIX,
    state,
    action,
    reportProductsByPopularityInitialState
  );

  if (result) {
    return result;
  }

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class ReportProductsByPopularityActions extends BaseReportActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Fetch
  _fetchItemsFromNetwork(filter) {
    return async (dispatch, getState) => {
      let fetchedResponse = await reportProductsByPopularityApi.getReport_ProductsByPopularity(
        filter
      );

      return fetchedResponse;
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {
      let p1 = new Promise(async (resolve, reject) => {
        if (
          !getState().products.items ||
          getState().products.items.length <= getState().ui.itemsPerPage
        ) {
          try {
            await dispatch(
              productsActions.fetchItems(0, false, true, null, true)
            );
          } catch (e) {
          }
        }
        resolve();
      });

      let p2 = new Promise(async (resolve, reject) => {
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
      await Promise.all([p1, p2]);
      dispatch(uiActions.showBackdrop(false));

      // let end = new Date();
      // let begin = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

      let filterItems = [
        {
          ...tableFilters.FILTER_PERIOD,
          //  value: dataFuncs.dateRangeToISOFormat(begin, end)
        },
        {
          ...tableFilters.FILTER_ITEMS_STORES,
          items: [...getState().stores.items]
        },
        {
          ...tableFilters.FILTER_PRODUCTS_IDS,
          items: [...getState().products.items]
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
    return state.reportProductsByPopularity;
  };

  getStep = globalState => {
    return null;
  };

  getValuesType = globalState => {
    return null;
  };

  getSpacesCount = globalState => {
    return 40;
  };
}

export const reportProductsByPopularityActions = new ReportProductsByPopularityActions();
