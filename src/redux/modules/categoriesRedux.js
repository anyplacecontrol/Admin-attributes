import * as categoriesApi from "../../api/categoriesApi";
import * as tableColumns from "../../consts/tableColumns";
import * as tableFilters from "../../consts/tableFilters";
import * as uiActions from "./uiRedux";
import * as productsApi from "../../api/productsApi";
import { statusesProductsActions } from "./statusesRedux";
import { ROUTE_NAMES } from "../../consts/routeNames";
import * as routing from "./routingRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes
} from "./baseTableRedux";

//*******************************************************************************
const PREFIX = "categories/";

//*******************************************************************************

export const categoriesInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_NAME,
  columns: tableColumns.CATEGORIES_COLUMNS
};

//*******************************************************************************

export default function reducer(state = categoriesInitialState, action = {}) {
  let result = BaseTableReducer(PREFIX, state, action, categoriesInitialState);

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class CategoriesActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Delete
  _deleteItem(categoryObj) {
    return async (dispatch, getState) => {
      if (
        !getState().statusesProducts.items ||
        getState().statusesProducts.items.length === 0
      ) {
        await dispatch(statusesProductsActions.fetchItems()); //throw exception inside
        dispatch(uiActions.showBackdrop(true));
      }

      //remove status "deleted"
      let applicableStatuses = getState().statusesProducts.items.filter(
        statusObj => statusObj.name.toUpperCase() != "DELETED"
      );

      //check if category has any "non-deleted" products
      let filter = {
        [tableFilters.FILTER_CATEGORIES.apiParamName]: [
          tableFilters.FILTER_CATEGORIES.accessorApi(categoryObj)
        ],
        [tableFilters.FILTER_STATUSES.apiParamName]: [
          ...applicableStatuses.map(statusObj =>
            tableFilters.FILTER_STATUSES.accessorApi(statusObj)
          )
        ]
      };
      
      let productsResponse = await productsApi.getItems(filter, 0, 1); //throw exception inside

      if (productsResponse.maxItemsQty > 0) {
        throw "Unable to delete category '" +
          categoryObj.name +
          "', because there are some products in it";
      }

      //DELETE      
      await categoriesApi.deleteItem(categoryObj);
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
      let fetchedResponse = await categoriesApi.getItems();
      return fetchedResponse;
    };
  }

  goto_editItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_EditItem(ROUTE_NAMES.categoryView, itemId));
    };
  }

  goto_addItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.categoryView));
    };
  }

  loadFilterItems() {
    return async dispatch => {
      let filterItems = [];

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
    return ROUTE_NAMES.categories;
  }

  _getStateSlice = state => {
    return state.categories;
  };
}

export const categoriesActions = new CategoriesActions();
