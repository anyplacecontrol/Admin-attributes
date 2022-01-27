import * as controlsApi from "../../api/controlsApi";
import * as tableColumns from "../../consts/tableColumns";
import * as routing from "./routingRedux";
import { ROUTE_NAMES } from "../../consts/routeNames";

import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes
} from "./baseTableRedux";

import {arrangeValuesText} from "../../utils/controlsFuncs";

//*******************************************************************************
const PREFIX = "controls/";

//*******************************************************************************

export const controlsInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_ID,
  columns: tableColumns.CONTROLS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = controlsInitialState, action = {}) {
  let result = BaseTableReducer(PREFIX, state, action, controlsInitialState);

  if (result) {
    return result;
  }

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class ControlsActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  _deleteItem(cookingTipObj) {
    return async (dispatch, getState) => {
      await controlsApi.deleteItem(cookingTipObj);
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {
      let filterItems = [];

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
      let fetchedResponse = await controlsApi.getItems(
        filter,
        topRowNumber,
        itemsPerPage,
        sortBy,
        sortOrder
      );

      //sort valuesText array by attributeValue for all languages
      arrangeValuesText(fetchedResponse);

      return fetchedResponse;
    };
  }

  goto_editItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_EditItem(ROUTE_NAMES.controlView, itemId));
    };
  }

  goto_addItem() {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.controlView));
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
    return state.controls;
  };
}

export const controlsActions = new ControlsActions();
