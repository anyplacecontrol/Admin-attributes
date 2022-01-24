import * as productsApi from "../../api/productsApi";
import * as productItemsApi from "../../api/productItemsApi";
import * as routing from "./routingRedux";
import * as uiActions from "./uiRedux";
import * as tableFilters from "../../consts/tableFilters";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes
} from "./baseTableRedux";
import * as tableColumns from "../../consts/tableColumns";
import {categoriesActions} from "./categoriesRedux";
import {statusesProductsActions} from "./statusesRedux";
import {tagsActions} from "./tagsRedux";
import {metricsActions} from "./metricsRedux";
import {ROUTE_NAMES} from "../../consts/routeNames";

//*******************************************************************************
const PREFIX = "products/";

//*******************************************************************************

export const productsInitialState = {
  ...BaseTableInitialState,
  // sortBy: tableColumns.COLUMN_POPULARITY,
  sortBy: tableColumns.COLUMN_ID,
  columns: tableColumns.PRODUCTS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = productsInitialState, action = {}) {
  let result = BaseTableReducer(PREFIX, state, action, productsInitialState);

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class ProductsActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Delete
  _disableItem(productObj) {
    return async (dispatch, getState) => {
      let filter = {
        [tableFilters.FILTER_PRODUCT_IDS.apiParamName]: [
          tableFilters.FILTER_PRODUCT_IDS.accessorApi(productObj)
        ]
      };

      dispatch(uiActions.showBackdrop(true));
      let productItemsResponse = await productItemsApi.getItems(filter, 0, 1);

      // if (productItemsResponse.maxItemsQty > 0) {
      //   throw "Unable to disable '" +
      //   productItemsResponse.items[0].product.name +
      //   "', because there are some product Items associated with it"
      // }

      productObj = JSON.parse(JSON.stringify(productObj));

      let statusses = getState().statusesProducts.items;
      if (!statusses) return;

      let newStatus = null;
      for (let i=0; i<statusses.length; i++) {
        if (statusses[i].name === "disabled") {
          newStatus = statusses[i];
          break;
        }
      }
      if (!newStatus || !newStatus.id) return;
      productObj.status =  newStatus.id;
      productObj.prevImages = productObj.images;
      productObj.prevCategories = productObj.categories;
      productObj.prevTags = productObj.tags;

      await productsApi.updateItem(productObj);
    };
  }

  _enableItem(productObj) {
    return async (dispatch, getState) => {
      productObj = JSON.parse(JSON.stringify(productObj));

      let statusses = getState().statusesProducts.items;
      if (!statusses) return;

      let newStatus = null;
      for (let i=0; i<statusses.length; i++) {
        if (statusses[i].name === "enabled") {
          newStatus = statusses[i];
          break;
        }
      }
      if (!newStatus || !newStatus.id) return;
      productObj.status =  newStatus.id;
      productObj.prevImages = productObj.images;
      productObj.prevCategories = productObj.categories;
      productObj.prevTags = productObj.tags;

      await productsApi.updateItem(productObj);
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
      let fetchedResponse = await productsApi.getItems(
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
      dispatch(routing.goto_EditItem(ROUTE_NAMES.productView, itemId));
    };
  }

  goto_addItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.productView));
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
          !getState().statusesProducts.items ||
          getState().statusesProducts.items.length === 0
        ) {
          try {
            await dispatch(
              statusesProductsActions.fetchItems(0, false, false, null, true)
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
          !getState().metrics.items ||
          getState().metrics.items.length === 0
        ) {
          try {
            await dispatch(
              metricsActions.fetchItems(0, false, false, null, true)
            );
          } catch (e) {
          }
        }
        resolve();
      });

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1, p2, p3, p4]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        {...tableFilters.FILTER_NAME},
        {...tableFilters.FILTER_DEFINED_PRODUCT_ID},
        {
          ...tableFilters.FILTER_CATEGORIES,
          items: [...getState().categories.items]
        },
        {
          ...tableFilters.FILTER_STATUSES,
          items: [...getState().statusesProducts.items]
        },
        {...tableFilters.FILTER_PRODUCT_POPULARITY},
        {...tableFilters.FILTER_TAGS, items: [...getState().tags.items]},
        // {...tableFilters.FILTER_METRICS, items: [...getState().metrics.items]}
      ];

      return dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_FILTER_ITEMS),
        filterItems: filterItems
      });
    };
  }

  //------------------------------------------------------------------------------
  // ABSTRACT FUNCS REALIZATION

  get _USE_PAGINATION() {
    return true;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  _getStateSlice = state => {
    return state.products;
  };

  get ALLOW_ADD_ITEM() {
    return true;
  }

  get ALLOW_DELETE_ITEM() {
    return false;
  }

  get ALLOW_DISABLE_ITEM() {
    return true;
  }

}

export const productsActions = new ProductsActions();
