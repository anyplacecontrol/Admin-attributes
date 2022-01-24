import * as usersApi from "../../api/usersApi";
import * as tableColumns from "../../consts/tableColumns";
import * as tableFilters from "../../consts/tableFilters";
import * as uiActions from "./uiRedux";
import {ROUTE_NAMES} from "../../consts/routeNames";
import * as routing from "./routingRedux";
import {rolesAdminsActions} from "./rolesRedux";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes,
} from "./baseTableRedux";

//*******************************************************************************

const PREFIX = "users/";

//*******************************************************************************

export const usersInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_ID,
  columns: tableColumns.USERS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = usersInitialState, action = {}) {
  let result = BaseTableReducer(PREFIX, state, action, usersInitialState);

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class UsersActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Delete

  _deleteItem(userObj) {
    return async (dispatch, getState) => {
      await usersApi.deleteItem(userObj);
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
      let fetchedResponse = await usersApi.getItems(
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
      dispatch(routing.goto_EditItem(ROUTE_NAMES.userView, itemId));
    };
  }

  goto_addItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.userView));
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {

      let p1 = new Promise(async (resolve, reject) => {
        if (
          !getState().rolesAdmins.items ||
          getState().rolesAdmins.items.length === 0
        ) {
          try {
            await dispatch(
              rolesAdminsActions.fetchItems(0, false, false, null, true)
            );
          } catch (e) {
          }
        }
        resolve();
      });

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        {...tableFilters.FILTER_ID},
        {...tableFilters.FILTER_EMAIL},
        {...tableFilters.FILTER_FIRST_NAME},
        {...tableFilters.FILTER_LAST_NAME},
        {...tableFilters.FILTER_PHONE},

        {
          ...tableFilters.FILTER_ROLES,
          items: [...getState().rolesAdmins.items]
        },
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
    return ROUTE_NAMES.users;
  }

  _getStateSlice = state => {
    return state.users;
  };
}

export const usersActions = new UsersActions();
