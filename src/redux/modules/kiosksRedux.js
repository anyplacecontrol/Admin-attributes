import * as kiosksApi from "../../api/kiosksApi";
import * as tableColumns from "../../consts/tableColumns";
import { statusesKiosksActions } from "./statusesRedux";
import { machinesActions } from "./machinesRedux";
import { ROUTE_NAMES } from "../../consts/routeNames";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes
} from "./baseTableRedux";
import * as tableFilters from "../../consts/tableFilters";
import * as routing from "./routingRedux";
import * as uiActions from "./uiRedux";
import { ALL_COUNTRIES } from "../../consts/countries";
import { ALL_STATES } from "../../consts/states";
import * as consts from "../../consts/constants";

//*******************************************************************************
const PREFIX = "kiosks/";

//*******************************************************************************

export const kiosksInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_ID,
  columns: tableColumns.KIOSKS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = kiosksInitialState, action = {}) {
  let result = BaseTableReducer(PREFIX, state, action, kiosksInitialState);

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class KiosksActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Delete
  _deleteItem(kioskObj) {
    return async (dispatch, getState) => {      
      await kiosksApi.deleteItem(kioskObj);
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {     

      let p1 = new Promise(async (resolve, reject) => {
        if (
          !getState().statusesKiosks.items ||
          getState().statusesKiosks.items.length === 0
        ) {
          try {
            await dispatch(
              statusesKiosksActions.fetchItems(0, false, false, null, true)
            );
          } catch (e) {
          }
        }
        resolve();
      });

      let p2 = new Promise(async (resolve, reject) => {
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
      await Promise.all([p1, p2]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        { ...tableFilters.FILTER_ID },        
        { ...tableFilters.FILTER_MACHINES_BY_ID,
          items: [{name: consts.anyValue, machineId: null}, ...getState().machines.items] 
        },
        { ...tableFilters.FILTER_STORE_ID }, //not in DB
        {
          ...tableFilters.FILTER_STATUSES,
          items: [...getState().statusesKiosks.items]
        },
        { ...tableFilters.FILTER_INVENTORY_NUMBER },
        { ...tableFilters.FILTER_MANUFACTURER_NAME },
        { ...tableFilters.FILTER_MODEL_NAME },

        { ...tableFilters.FILTER_COUNTRY, items: [...ALL_COUNTRIES] },
        { ...tableFilters.FILTER_STATE, items: [...ALL_STATES] },
        { ...tableFilters.FILTER_CITY },
        { ...tableFilters.FILTER_ZIP },
        { ...tableFilters.FILTER_PERSON }
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
      let fetchedResponse = await kiosksApi.getItems(
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
      dispatch(routing.goto_EditItem(ROUTE_NAMES.kioskView, itemId));
    };
  }

  goto_addItem() {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.kioskView));
    };
  }

  //------------------------------------------------------------------------------
  // ABSTRACT FUNCS REALIZATION

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
    return state.kiosks;
  };
}

export const kiosksActions = new KiosksActions();
