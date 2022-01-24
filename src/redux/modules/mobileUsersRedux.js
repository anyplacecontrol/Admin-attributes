import * as mobileUsersApi from "../../api/mobileUsersApi";
import * as tableColumns from "../../consts/tableColumns";
import * as tableFilters from "../../consts/tableFilters";
// import * as uiActions from "./uiRedux";
import {ROUTE_NAMES} from "../../consts/routeNames";
import * as routing from "./routingRedux";
// import {statusesCustomersActions} from "./statusesRedux"; // todo: add statusesMobileCustomers
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes,
} from "./baseTableRedux";

//*******************************************************************************
const PREFIX = "mobileCustomers/";

//*******************************************************************************

export const mobileUsersInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_ROW_NUMBER,
  columns: tableColumns.MOBILE_USERS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = mobileUsersInitialState, action = {}) {
  let result = BaseTableReducer(PREFIX, state, action, mobileUsersInitialState);
  if (result) {
    return result;
  }

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class MobileUsersActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Delete

  _deleteItem(mobileUserObj) {
    return async (dispatch, getState) => {
      await mobileUsersApi.deleteItem(mobileUserObj);
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
      let fetchedResponse = await mobileUsersApi.getItems(
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
      dispatch(routing.goto_EditItem(ROUTE_NAMES.mobileUserView, itemId));
    };
  }

  goto_addItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.mobileUserView));
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {
      // let p1 = new Promise(async (resolve, reject) => {
      //   if (
      //     !getState().statusesCustomers.items ||
      //     getState().statusesCustomers.items.length === 0
      //   ) {
      //     try {
      //       await dispatch(
      //         statusesCustomersActions.fetchItems(0, false, false, null, true)
      //       );
      //     } catch (e) {
      //       //
      //     }
      //   }
      //   resolve();
      // });

      // dispatch(uiActions.showBackdrop(true));
      // await Promise.all([p1]);
      // dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        {...tableFilters.FILTER_ID},
        {...tableFilters.FILTER_EMAIL},
        {...tableFilters.FILTER_PHONE},
        // {
        //   ...tableFilters.FILTER_STATUSES,
        //   items: [...getState().statusesCustomers.items]
        // },
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
    return ROUTE_NAMES.mobileUsers;
  }

  _getStateSlice = state => {
    return state.mobileUsers;
  };
}

export const mobileUsersActions = new MobileUsersActions();
