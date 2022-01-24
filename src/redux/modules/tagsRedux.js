import * as tagsApi from "../../api/tagsApi";
import * as tableColumns from "../../consts/tableColumns";
import * as routing from "./routingRedux";
import { ROUTE_NAMES } from "../../consts/routeNames";
import * as uiActions from "./uiRedux";
import * as tableFilters from "../../consts/tableFilters";
import * as productsApi from "../../api/productsApi";

import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes
} from "./baseTableRedux";

//*******************************************************************************
const PREFIX = "tags/";

//*******************************************************************************

export const tagsInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_NAME,
  columns: tableColumns.TAGS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = tagsInitialState, action = {}) {
  let result = BaseTableReducer(PREFIX, state, action, tagsInitialState);

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class TagsActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  _deleteItem(tagObj) {
    return async (dispatch, getState) => {
      //if any product has this tag
      let filter = {
        [tableFilters.FILTER_TAGS.apiParamName]: [tagObj.id]
      };
      
      let productsResponse = await productsApi.getItems(filter, 0, 1);

      if (productsResponse.maxItemsQty > 0) {
        throw "Unable to delete tag '" +
            tagObj.id +
            "', because there are some Products associated with it"        
      }
      
      await tagsApi.deleteItem(tagObj);
    };
  }

  loadFilterItems() {
    return async dispatch => {};
  }

  _fetchItemsFromNetwork(
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder
  ) {
    return async (dispatch, getState) => {
      let fetchedResponse = await tagsApi.getItems();
      
      return fetchedResponse;
    };
  }

  goto_editItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_EditItem(ROUTE_NAMES.tagView, itemId));
    };
  }

  goto_addItem() {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.tagView));
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

  _getStateSlice = state => {
    return state.tags;
  };
}

export const tagsActions = new TagsActions();
