import * as reportInventoryByProductApi from "../../api/reportInventoryByProductApi";
import * as tableFilters from "../../consts/tableFilters";
import { BaseTableTypes } from "./baseTableRedux";
import {
  BaseReportReducer,
  BaseReportActions,
  BaseReportInitialState
} from "./baseReportRedux";
import * as tableColumns from "../../consts/tableColumns";
import { storesActions } from "./storesRedux";
import { productsActions } from "./productsRedux";
import * as uiActions from "./uiRedux";

//*******************************************************************************
const PREFIX = "reportInventoryByProduct/";

//*******************************************************************************

export const reportInventoryByProductInitialState = {
  ...BaseReportInitialState,
  columns: tableColumns.INVENTORY_BY_PRODUCT_TYPE_COLUMNS,
  sortBy: tableColumns.COLUMN_IN_STOCK,
  sortOrder: "ascending" 
};

//*******************************************************************************

export default function reducer(state = reportInventoryByProductInitialState, action = {}) {
  let result = BaseReportReducer(
    PREFIX,
    state,
    action,
    reportInventoryByProductInitialState
  );

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class ReportInventoryByProductActions extends BaseReportActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Fetch
  _fetchItemsFromNetwork(filter) {
    return async (dispatch, getState) => {
      let fetchedResponse = await reportInventoryByProductApi.getReport_InventoryByProduct(filter);

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

      let p2 = new Promise(async (resolve, reject) => {
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
      await Promise.all([p1, p2]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [        
        {
          ...tableFilters.FILTER_PRODUCTS_IDS,
          items: [...getState().products.items]
        },
        {
          ...tableFilters.FILTER_ITEMS_STORES_BY_MACHINE,
          items: [...getState().stores.items]
        },
        { ...tableFilters.FILTER_EXPIRATION_DATE_OPTIONAL },        
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
    return state.reportInventoryByProduct;
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

export const reportInventoryByProductActions = new ReportInventoryByProductActions();
