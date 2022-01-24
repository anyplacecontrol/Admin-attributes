import * as rolesApi from "../../api/rolesApi";
import * as tableColumns from "../../consts/tableColumns";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
} from "./baseTableRedux";

export const rolesAdmins = "rolesAdmins";

//*******************************************************************************

export const rolesInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_NAME,
  columns: tableColumns.ROLES_COLUMNS
};

//*******************************************************************************
export default function getReducer(roleKind) {
  const PREFIX = roleKind + "/";

  return function reducer(state = rolesInitialState, action = {}) {
    let result = BaseTableReducer(PREFIX, state, action, rolesInitialState);

    if (result) return result;

    switch (action.type) {
      default:
        return state;
    }
  };
}

//*******************************************************************************

class RolesActions extends BaseTableActions {
  constructor(roleKind) {
    super();
    this.roleKind = roleKind;
  }

  // ABSTRACT ACTIONS REALIZATION

  goto_editItem(itemId) {
    return null;
    // return async dispatch => {
    //   dispatch(routing.goto_EditStatus(itemId, this.roleKind));
    // };
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
      let fetchedItems = [];

      fetchedItems = await rolesApi.getItems(this.roleKind);

      return {
        items: fetchedItems,
        itemsQty: fetchedItems.length,
        topRowNumber: 0
      };
    };
  }

  loadFilterItems() {
    return async dispatch => {};
  }

  //------------------------------------------------------------------------------
  // ABSTRACT FUNCS REALIZATION

  get _ACTION_TYPE_PREFIX() {
    const PREFIX = this.roleKind + "/";
    return PREFIX;
  }

  get ALLOW_ADD_ITEM() {
    return false;
  }

  _getStateSlice = state => {
    switch (this.roleKind) {

      case rolesAdmins:
        return state.rolesAdmins;

      default:
        throw "roles kind is not processed in rolesRedux - _getStateSlice";
    }
  };
}


export const rolesAdminsActions = new RolesActions(rolesAdmins);
