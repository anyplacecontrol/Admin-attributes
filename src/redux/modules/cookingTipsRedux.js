import * as cookingTipsApi from "../../api/cookingTipsApi";
import * as tableColumns from "../../consts/tableColumns";
import * as routing from "./routingRedux";
import {ROUTE_NAMES} from "../../consts/routeNames";
import * as uiActions from "./uiRedux";
import * as tableFilters from "../../consts/tableFilters";
import * as productsApi from "../../api/productsApi";
import {categoriesActions} from "./categoriesRedux";
import {productsActions} from "./productsRedux";

import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes
} from "./baseTableRedux";

//*******************************************************************************
const PREFIX = "cookingTips/";

//*******************************************************************************

export const cookingTipsInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_ID,
  columns: tableColumns.COOKING_TIPS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = cookingTipsInitialState, action = {}) {
  let result = BaseTableReducer(PREFIX, state, action, cookingTipsInitialState);

  if (result) {
    return result;
  }

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class CookingTipsActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  _deleteItem(cookingTipObj) {
    return async (dispatch, getState) => {
      await cookingTipsApi.deleteItem(cookingTipObj);
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
            // todo
          }
        }
        resolve();
      });


      let p2 = new Promise(async (resolve, reject) => {
        if (
          !getState().products.items ||
          getState().products.items.length <= getState().ui.itemsPerPage
        ) {
          try {
            let res = await dispatch(
              productsActions.fetchItems(0, false, true, null, true)
            );
          } catch (e) {
            // todo
          }
        }
        resolve(null);
      });


      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1, p2]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        {...tableFilters.FILTER_ID},
        // {...tableFilters.FILTER_COOKING_TIPS_TITLE},
        // {
        //   ...tableFilters.FILTER_COOKING_TIPS_STATUS,
        //   items: [...getState().cookingTips.items]
        // },
        // {
        //   ...tableFilters.FILTER_COOKING_TIPS_CATEGORIES,
        //   items: [...getState().categories.items]
        // },
        // {
        //   ...tableFilters.FILTER_PRODUCTS,
        //   items: [...getState().products.items]
        // }
      ];

      return dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_FILTER_ITEMS),
        filterItems: filterItems
      });
    };
  }

  _fetchItemsFromNetwork(
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder
  ) {
    return async (dispatch, getState) => {
      let fetchedResponse = await cookingTipsApi.getItems(
        filter,
        topRowNumber,
        itemsPerPage
        // sortBy,
        // sortOrder
      );
      let products = getState().products.items;

      fetchedResponse.items.forEach((cookingTipObj, i) => {
        let product = products.find(product => product.id === cookingTipObj.productId);
        fetchedResponse.items[i].product = product;
      });

      return fetchedResponse;
    };
  }

  goto_editItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_EditItem(ROUTE_NAMES.cookingTipsView, itemId));
    };
  }

  goto_addItem() {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.cookingTipsView));
    };
  }

  //------------------------------------------------------------------------------
  // ABSTRACT SERVICE FUNCS REALIZATION

  //****** protected

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  get ALLOW_ADD_ITEM() {
    return true;
  }

  get _USE_PAGINATION() {
    return true;
  }

  _getStateSlice = state => {
    return state.cookingTips;
  };
}

export const cookingTipsActions = new CookingTipsActions();
