import * as logsApi from "../../api/logsApi";
import * as tableColumns from "../../consts/tableColumns";
import * as routing from "./routingRedux";
import {ROUTE_NAMES} from "../../consts/routeNames";
import * as uiActions from "./uiRedux";
import * as tableFilters from "../../consts/tableFilters";
import {machinesActions} from "./machinesRedux";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes
} from "./baseTableRedux";

//*******************************************************************************
const PREFIX = "logs/";

//*******************************************************************************

export const logsInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_ID,
  columns: tableColumns.LOGS_COLUMNS,
};

//*******************************************************************************

export default function reducer(state = logsInitialState, action = {}) {
  let result = BaseTableReducer(PREFIX, state, action, logsInitialState);

  if (result) {
    return result;
  }

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class LogsActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  _deleteItem(logObj) {
    return async (dispatch, getState) => {
      //   await logsApi.deleteItem(logObj);
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {

      let p1 = new Promise(async (resolve, reject) => {
        if (
          !getState().machines.items ||
          getState().machines.items.length <= getState().ui.itemsPerPage
        ) {
          try {
            let res = await dispatch(
              machinesActions.fetchItems(0, false, true, null, true)
            );
          } catch (e) {
            // todo
          }
        }
        resolve(null);
      });

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        {...tableFilters.FILTER_PERIOD},
        {
          ...tableFilters.FILTER_MACHINES_BY_ID,
          items: [
            ...getState().machines.items,
          ],
        },
        {...tableFilters.FILTER_LIMIT, items: ['10', '25', '100', '500', '1000']},
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
      let fetchedResponse = await logsApi.getItems(
        filter,
        topRowNumber,
        itemsPerPage
        // sortBy,
        // sortOrder
      );

      let machines = getState().machines.items;

      fetchedResponse.items.forEach((logObj, i) => {
        let machine = machines.find(machine => machine.id === logObj.MachineId);
        fetchedResponse.items[i].machine = machine;
      });

      return fetchedResponse;
    };
  }

  goto_editItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_EditItem(ROUTE_NAMES.logsView, itemId));
    };
  }

  goto_addItem() {
    //do nothing
  }

  //------------------------------------------------------------------------------
  // ABSTRACT SERVICE FUNCS REALIZATION

  //****** protected

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  get ALLOW_ADD_ITEM() {
    return false;
  }

  get _USE_PAGINATION() {
    return false;
  }

  _getStateSlice = state => {
    return state.logs;
  };
}

export const logsActions = new LogsActions();
