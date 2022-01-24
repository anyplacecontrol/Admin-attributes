import * as ordersApi from "../../api/ordersApi";
import * as tableColumns from "../../consts/tableColumns";
import * as routing from "./routingRedux";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes
} from "./baseTableRedux";
import {categoriesActions} from "./categoriesRedux";
import {statusesOrdersActions} from "./statusesRedux";
import * as tableFilters from "../../consts/tableFilters";
import * as productItemsApi from "../../api/productItemsApi";
import * as dataFuncs from "../../utils/dataFuncs";
import {storesActions} from "./storesRedux";
import * as uiActions from "./uiRedux";
import {ROUTE_NAMES} from "../../consts/routeNames";
import {machinesActions} from "./machinesRedux";
import * as consts from "../../consts/constants";

//*******************************************************************************

const PREFIX = "orders/";

//*******************************************************************************

export const ordersInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_DATE_PAID,
  columns: tableColumns.ORDERS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = ordersInitialState, action = {}) {
  let result = BaseTableReducer(PREFIX, state, action, ordersInitialState);

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class OrdersActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  deleteItem(orderObj) {
    return async (dispatch, getState) => {
    };
  }

  goto_editItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_EditItem(ROUTE_NAMES.orderView, itemId));
    };
  }

  goto_addItem(itemId) {
    //do nothing
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {
      let p1 = new Promise(async (resolve, reject) => {
        if (
          !getState().statusesOrders.items ||
          getState().statusesOrders.items.length === 0
        ) {
          try {
            await dispatch(
              statusesOrdersActions.fetchItems(0, false, false, null, true)
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

      let p3 = new Promise(async (resolve, reject) => {
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

      let p4 = new Promise(async (resolve, reject) => {
        if (
          !getState().machines.items ||
          getState().machines.items.length <= getState().ui.itemsPerPage
        ) {
          try {
            await dispatch(
              machinesActions.fetchItems(0, false, true, null, true)
            );
          } catch (e) {}
        }
        resolve();
      });

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1, p2, p3, p4]);
      dispatch(uiActions.showBackdrop(false));

      // let end = new Date();
      // let begin = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);

      let filterItems = [
        {
          ...tableFilters.FILTER_DATE_PAID,
          //value: dataFuncs.dateRangeToISOFormat(begin, end) 
        },
        {...tableFilters.FILTER_ORDER_ID},
        //{...tableFilters.FILTER_PLATFORM},        
        { ...tableFilters.FILTER_MACHINES_BY_ID,
          items: [{name: consts.anyValue, machineId: null}, ...getState().machines.items] 
        },
        {...tableFilters.FILTER_STORES, items: [...getState().stores.items]},
        {
          ...tableFilters.FILTER_STATUSES,
          items: [...getState().statusesOrders.items]
        },
        {
          ...tableFilters.FILTER_CATEGORIES,
          items: [...getState().categories.items]
        },
        {...tableFilters.FILTER_CREDIT_CARD},
        {...tableFilters.FILTER_ORDER_PRICE}
      ];

      return dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_FILTER_ITEMS),
        filterItems: filterItems
      });
    };
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

      fetchedResponse = await ordersApi.getItems(
        filter,
        topRowNumber,
        itemsPerPage,
        sortBy,
        sortOrder
      ); //throw exception inside

      if (!fetchedResponse.items || fetchedResponse.items.length === 0)
        return fetchedResponse;

      let p1;
      //if function is calling not for csv export or
      //if function is calling for csv and column is visible
      if (
        !skipHiddenColumns ||
        (skipHiddenColumns &&
          dataFuncs.isColumnVisible(
            getState().orders.columns,
            tableColumns.COLUMN_CATEGORY
          ))
      ) {
        p1 = new Promise((resolve, reject) => {
          let orderIds = [];

          for (let i = 0; i < fetchedResponse.items.length; i++) {
            let order = fetchedResponse.items[i];
            orderIds.push(order.id);
          }

          let _filter = {orderIds: orderIds};

          productItemsApi
            .getItems(_filter, 0)
            .then(productItems => {
              //For every order: get product items related to order and extract its categories
              for (let j = 0; j < fetchedResponse.items.length; j++) {
                let order = fetchedResponse.items[j];
                order.categories = [];
                order.order_items = [];
                for (let i = 0; i < productItems.items.length; i++) {
                  let productItem = productItems.items[i];
                  if (productItem.orderId === order.id) {
                    order.order_items.push(productItem);

                    for (
                      let i = 0;
                      i < productItem.product.categories.length;
                      i++
                    ) {
                      let category = productItem.product.categories[i];
                      if (
                        !dataFuncs.categoriesIncludesName(
                          order.categories,
                          category.name
                        )
                      )
                        order.categories.push({name: category.name});
                    }
                  }
                }
              }
              resolve();
            })
            .catch(e => reject(e));
        });
      }

      //get store information for every order
      let p2;
      //if function is calling not for csv export or
      //if function is calling for csv and column is visible
      if (
        !skipHiddenColumns ||
        (skipHiddenColumns &&
          dataFuncs.isColumnVisible(
            getState().orders.columns,
            tableColumns.COLUMN_STORE_NAME
          ))
      ) {
        p2 = new Promise(async (resolve, reject) => {
          try {
            if (
              !getState().stores.items ||
              getState().stores.items.length <= getState().ui.itemsPerPage
            ) {
              await dispatch(
                storesActions.fetchItems(
                  0,
                  skipHiddenColumns,
                  false,
                  null,
                  true
                )
              );
            }
          } catch (error) {
          }

          for (let i = 0; i < fetchedResponse.items.length; i++) {
            let order = fetchedResponse.items[i];
            order.store = dataFuncs.getStoreByMachineId(
              getState().stores.items,
              order.machineId
            );
          }

          resolve();
        });
      }

      try {
        await p2;
        await p1; //throw exception inside
      } finally {
        dispatch(uiActions.showBackdrop(false));
      }

      return fetchedResponse;
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

  _getStateSlice = state => {
    return state.orders;
  };

  get ALLOW_ADD_ITEM() {
    return false;
  }
}

export const ordersActions = new OrdersActions();
