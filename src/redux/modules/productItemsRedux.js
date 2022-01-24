import React from "react";
import * as productItemsApi from "../../api/productItemsApi";
import * as routing from "./routingRedux";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes
} from "./baseTableRedux";
import * as tableColumns from "../../consts/tableColumns";
import {categoriesActions} from "./categoriesRedux";
import {storesActions} from "./storesRedux";
import {machinesActions} from "./machinesRedux";
import {tagsActions} from "./tagsRedux";
import {statusesProductItemsActions} from "./statusesRedux";
import * as tableFilters from "../../consts/tableFilters";
import * as dataFuncs from "../../utils/dataFuncs";
import {ROUTE_NAMES} from "../../consts/routeNames";
import * as uiActions from "./uiRedux";
// import * as serviceFuncs from "../../utils/serviceFunctions";
// import * as consts from "../../consts/constants";

//*******************************************************************************

const PREFIX = "productItems/";

//*******************************************************************************

export const productItemsInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_PROD_DATE,
  columns: tableColumns.PRODUCT_ITEMS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = productItemsInitialState, action = {}) {
  let result = BaseTableReducer(
    PREFIX,
    state,
    action,
    productItemsInitialState
  );

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class ProductItemsActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  deleteItem(itemObj) {
    return async (dispatch, getState) => {
    };
  }

  goto_editItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_EditItem(ROUTE_NAMES.productItemView, itemId));
    };
  }

  goto_addItem(itemId) {
    //do nothing
  }

  // *** Fetch
  _fetchItemsFromNetwork(
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    skipHiddenColumns
  ) {
    return async (dispatch, getState) => {
      let fetchedResponse;

      //Get Product Items

      let p1 = new Promise((resolve, reject) => {
        return productItemsApi
          .getItems(filter, topRowNumber, itemsPerPage, sortBy, sortOrder)
          .then(response => {
            fetchedResponse = response;
            resolve();
          })
          .catch(e => reject(e));
      });

      //get store information for every item

      //if function is calling not for csv export or
      //if function is calling for csv and column is visible
      let p2 = null;

      if (
        !skipHiddenColumns ||
        (skipHiddenColumns &&
          dataFuncs.isColumnVisible(
            getState().orders.columns,
            tableColumns.COLUMN_STORE_NAME
          ))
      ) {
        if (
          !getState().stores.items ||
          getState().stores.items.length <= getState().ui.itemsPerPage
        ) {
          p2 = new Promise((resolve, reject) => {
            return dispatch(
              storesActions.fetchItems(0, skipHiddenColumns, false, null, true)
            )
              .then(() => resolve())
              .catch(() => resolve());
          });
        }
      }

      dispatch(uiActions.showBackdrop(true));
      await p2;

      try {
        await p1; //throw exception inside
      } finally {
        dispatch(uiActions.showBackdrop(false));
      }

      for (let i = 0; i < fetchedResponse.items.length; i++) {
        let item = fetchedResponse.items[i];
        item.store = dataFuncs.getStoreByMachineId(
          getState().stores.items,
          item.machineId
        );
      }

      return fetchedResponse;
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
          } catch (e) {
          }
        }
        resolve();
      });

      let p2 = new Promise(async (resolve, reject) => {
        if (
          !getState().statusesProductItems.items ||
          getState().statusesProductItems.items.length === 0
        ) {
          try {
            await dispatch(
              statusesProductItemsActions.fetchItems(
                0,
                false,
                false,
                null,
                true
              )
            );
          } catch (e) {
          }
        }
        resolve();
      });

      let p3 = new Promise(async (resolve, reject) => {
        if (!getState().tags.items || getState().tags.items.length === 0) {
          try {
            await dispatch(tagsActions.fetchItems(0, false, false, null, true));
          } catch (e) {
          }
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
          } catch (e) {
          }
        }
        resolve();
      });

      let p5 = new Promise(async (resolve, reject) => {
        if (
          !getState().machines.items ||
          getState().machines.items.length <= getState().ui.itemsPerPage
        ) {
          try {
            await dispatch(
              machinesActions.fetchItems(0, false, true, null, true)
            );
          } catch (e) {
          }
        }
        resolve();
      });

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1, p2, p3, p4, p5]);
      dispatch(uiActions.showBackdrop(false));

      const statusesTooltipText = (
        <div>
          <p>
            <strong>blocked</strong> - <em>item is actively in cart / reserved by a customer</em>
          </p>
          <br/>
          <p>
            <strong>free</strong> - <em>item is available for sale unless it is not forbiddenToSell</em>
          </p>
          <br/>
          <p>
            <strong>sold</strong> - <em>item is paid for but not yet dispatched / dynamic</em>
          </p>
          <br/>
          <p>
            <strong>dispatched</strong> - <em>item sold on kiosk</em>
          </p>
        </div>
      );

      let filterItems = [
        {...tableFilters.FILTER_PRODUCTION_DATE},
        {...tableFilters.FILTER_EXPIRATION_DATE},
        {...tableFilters.FILTER_CLOUD_ID},
        {...tableFilters.FILTER_PRODUCT_ID},
        {...tableFilters.FILTER_PRODUCT_NAME},
        {...tableFilters.FILTER_ORDER_ID},
        {...tableFilters.FILTER_GS1},
        {...tableFilters.FILTER_CARRIER_ID},
        {
          ...tableFilters.FILTER_MACHINES,
          items: [...getState().machines.items],
        },
        {
          ...tableFilters.FILTER_ORIGIN_MACHINES,
          items: [...getState().machines.items],
        },
        {
          ...tableFilters.FILTER_ITEMS_STORES_BY_MACHINE,
          items: [...getState().stores.items],
        },
        {...tableFilters.FILTER_WEIGHT},
        {...tableFilters.FILTER_MARBLING},
        {...tableFilters.FILTER_THICKNESS},
        {
          ...tableFilters.FILTER_CATEGORIES,
          items: [...getState().categories.items],
        },
        {
          ...tableFilters.FILTER_STATUSES,
          items: [...getState().statusesProductItems.items],
          tooltipText: statusesTooltipText,
        },
        {
          ...tableFilters.FILTER_TAGS,
          items: [...getState().tags.items],
        },
        {...tableFilters.FILTER_LOT},
        {...tableFilters.FILTER_PRICE},
      ];

      return dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_FILTER_ITEMS),
        filterItems: filterItems
      });
    };
  }

  _disableItem(itemObj) {
    return async (dispatch, getState) => {
      await productItemsApi.forbidItems([itemObj.id], true); //throw exception inside
    };
  }

  _enableItem(itemObj) {
    return async (dispatch, getState) => {
      await productItemsApi.forbidItems([itemObj.id], false); //throw exception inside
    };
  }

  //------------------------------------------------------------------------------
  // ABSTRACT SERVICE FUNCS REALIZATION

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  get _USE_PAGINATION() {
    return true;
  }

  get ALLOW_DISABLE_ITEM() {
    return true;
  }

  _getStateSlice = state => {
    return state.productItems;
  };
}

export const productItemsActions = new ProductItemsActions();
