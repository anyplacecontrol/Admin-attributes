import * as customersApi from "../../api/customersApi";
import * as tableColumns from "../../consts/tableColumns";
import * as tableFilters from "../../consts/tableFilters";
import * as uiActions from "./uiRedux";
import { ROUTE_NAMES } from "../../consts/routeNames";
import * as routing from "./routingRedux";
import { categoriesActions } from "./categoriesRedux";
import { tagsActions } from "./tagsRedux";
import { storesActions } from "./storesRedux";
import { productsActions } from "./productsRedux";
import { statusesCustomersActions } from "./statusesRedux";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes,  
} from "./baseTableRedux";
import { ALL_COUNTRIES } from "../../consts/countries";
import { ALL_STATES } from "../../consts/states";

//*******************************************************************************
const PREFIX = "customers/";

//*******************************************************************************

export const customersInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_CUSTOMER_LAST_ORDER_DATE,
  columns: tableColumns.CUSTOMERS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = customersInitialState, action = {}) {
  let result = BaseTableReducer(PREFIX, state, action, customersInitialState);

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class CustomersActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Delete

  _deleteItem(customerObj) {
    return async (dispatch, getState) => {
      await customersApi.deleteItem(customerObj);
    };
  }

  // *** Fetch

  _fetchItemsFromNetwork(
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder
  ) {
    return async (dispatch, getState) => {
      let fetchedResponse = await customersApi.getItems(
        filter,
        topRowNumber,
        itemsPerPage,
        sortBy,
        sortOrder
      );

      return fetchedResponse;
    };
  }

  goto_editItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_EditItem(ROUTE_NAMES.customerView, itemId));
    };
  }

  goto_addItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.customerView));
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {
      let p1 = new Promise(async (resolve, reject) => {
        if (
          !getState().categories.items ||
          getState().categories.items.length === 0
        ) {
          try {
            await dispatch(
              categoriesActions.fetchItems(0, false, false, null, true)
            );
          } catch (e) {}
        }
        resolve();
      });

      let p2 = new Promise(async (resolve, reject) => {
        if (
          !getState().statusesCustomers.items ||
          getState().statusesCustomers.items.length === 0
        ) {
          try {
            await dispatch(
              statusesCustomersActions.fetchItems(0, false, false, null, true)
            );
          } catch (e) {}
        }
        resolve();
      });

      let p3 = new Promise(async (resolve, reject) => {
        if (!getState().tags.items || getState().tags.items.length === 0) {
          try {
            await dispatch(tagsActions.fetchItems(0, false, false, null, true));
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
            let res = await dispatch(
              storesActions.fetchItems(0, false, true, null, true)
            );
          } catch (e) {}
        }
        resolve(null);
      });

      let p5 = new Promise(async (resolve, reject) => {
        if (
          !getState().products.items ||
          getState().products.items.length <= getState().ui.itemsPerPage
        ) {
          try {
            let res = await dispatch(
              productsActions.fetchItems(0, false, true, null, true)
            );
          } catch (e) {}
        }
        resolve(null);
      });

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1, p2, p3, p4, p5]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        { ...tableFilters.FILTER_DATE_PAID },
        { ...tableFilters.FILTER_ID },
        { ...tableFilters.FILTER_PLATFORM },
        { ...tableFilters.FILTER_EMAIL },
        { ...tableFilters.FILTER_PHONE },

        { ...tableFilters.FILTER_COUNTRY, items: [...ALL_COUNTRIES] },
        { ...tableFilters.FILTER_STATE, items: [...ALL_STATES] },
        { ...tableFilters.FILTER_CITY },
        { ...tableFilters.FILTER_ZIP },

        {
          ...tableFilters.FILTER_ITEMS_STORES,
          items: [...getState().stores.items]
        },
        { ...tableFilters.FILTER_MACHINE_ID },
        { ...tableFilters.FILTER_KIOSK_ID },

        {
          ...tableFilters.FILTER_STATUSES,
          items: [...getState().statusesCustomers.items]
        },

        {
          ...tableFilters.FILTER_CATEGORIES,
          items: [...getState().categories.items]
        },
        { ...tableFilters.FILTER_TAGS, items: [...getState().tags.items] },
        {
          ...tableFilters.FILTER_PRODUCTS,
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
  // ABSTRACT SERVICE FUNCS REALIZATION

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  get ALLOW_ADD_ITEM() {
    return true;
  }

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.customers;
  }

  _getStateSlice = state => {
    return state.customers;
  };
}

export const customersActions = new CustomersActions();
