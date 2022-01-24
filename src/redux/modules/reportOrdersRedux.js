import * as reportOrdersApi from "../../api/reportOrdersApi";
import * as tableFilters from "../../consts/tableFilters";
import { BaseTableTypes } from "./baseTableRedux";
import {
  BaseReportReducer,
  BaseReportActions,
  BaseReportInitialState
} from "./baseReportRedux";
import * as tableColumns from "../../consts/tableColumns";
import { statusesOrdersActions } from "./statusesRedux";
import { storesActions } from "./storesRedux";
import { productsActions } from "./productsRedux";
import * as uiActions from "./uiRedux";

//*******************************************************************************
const PREFIX = "reportOrders/";


//*******************************************************************************

export const reportOrdersInitialState = {
  ...BaseReportInitialState,
  columns: tableColumns.REPORT_ORDERS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = reportOrdersInitialState, action = {}) {
  let result = BaseReportReducer(
    PREFIX,
    state,
    action,
    reportOrdersInitialState
  );

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class ReportOrdersActions extends BaseReportActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Fetch
  _fetchItemsFromNetwork(filter) {
    return async (dispatch, getState) => {      
      let fetchedResponse = await reportOrdersApi.getReportOrders(filter);
      
      return fetchedResponse;
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {           

      let p2 = new Promise(async (resolve, reject) => {
        if (
          !getState().statusesOrders.items ||
          getState().statusesOrders.items.length === 0
        ) {
          try {
            await dispatch(
              statusesOrdersActions.fetchItems(0, false, false, null, true)
            );
          } catch (e) {}
        }
        resolve();
      });
     
      let p4 = new Promise(async (resolve, reject) => {
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

      let p5 = new Promise(async (resolve, reject) => {
        if (
          !getState().products.items ||
          getState().products.items.length <= getState().ui.itemsPerPage
        ) {
          try {
            await dispatch(
              productsActions.fetchItems(0, false, true, null, true)
            );
          } catch (e) {}
        }
        resolve();
      });

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p2, p4, p5]);
      dispatch(uiActions.showBackdrop(false));

      // let end = new Date();
      // let begin = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

      let filterItems = [
        { ...tableFilters.FILTER_PERIOD,
          //value: dataFuncs.dateRangeToISOFormat(begin, end)
         },
        {
          ...tableFilters.FILTER_STATUSES,
          items: [...getState().statusesOrders.items]
        },
        { ...tableFilters.FILTER_PLATFORM },
        {
          ...tableFilters.FILTER_PRODUCTS_IDS,
          items: [...getState().products.items]
        },
                    
        { ...tableFilters.FILTER_ITEMS_STORES,
          items: [...getState().stores.items]}        
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
    return state.reportOrders;
  };

  getSpacesCount = globalState => {
    return 10;
  };

  getUseChart = globalState => {
    return true;
  };
  
}

export const reportOrdersActions = new ReportOrdersActions();
