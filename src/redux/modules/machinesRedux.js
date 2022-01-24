import * as machinesApi from "../../api/machinesApi";
import * as kiosksApi from "../../api/kiosksApi";
import * as storesApi from "../../api/storesApi";
import * as tableColumns from "../../consts/tableColumns";
import { statusesMachinesActions } from "./statusesRedux";
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

//*******************************************************************************
const PREFIX = "machines/";

//*******************************************************************************

export const machinesInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_INVENTORY_NUMBER,
  columns: tableColumns.MACHINES_COLUMNS
};

//*******************************************************************************

export default function reducer(state = machinesInitialState, action = {}) {
  let result = BaseTableReducer(PREFIX, state, action, machinesInitialState);

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class MachinesActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Delete
  _deleteItem(machineObj) {
    return async (dispatch, getState) => {
      const machineId = machineObj.id;

      //if Kiosk connected to this machine exists
      let filter = {
        [tableFilters.FILTER_MACHINE_ID.apiParamName]: machineId
      };

      let kiosksResponse = await kiosksApi.getItems(filter, 0, 1); //throw exception inside

      if (kiosksResponse.maxItemsQty > 0) {
        throw "Unable to delete machine '" +
          machineObj.id +
          "', because there are some Kiosks associated with it";
      }

      //if Store associated with this machine exists
      let storesResponse = await storesApi.getItems(filter, 0, 1); //throw exception inside

      if (storesResponse.maxItemsQty > 0) {
        throw "Unable to delete machine '" +
          machineObj.id +
          "', because there are some Store associated with it";
      }

      await machinesApi.deleteItem(machineObj);
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {
      try {
        if (
          !getState().statusesMachines.items ||
          getState().statusesMachines.items.length === 0
        ) {
          await dispatch(statusesMachinesActions.fetchItems());
        }
      } catch (error) {}

      let filterItems = [
        { ...tableFilters.FILTER_ID },
        { ...tableFilters.FILTER_KIOSK_ID }, //not in DB
        { ...tableFilters.FILTER_STORE_ID }, //not in DB
        {
          ...tableFilters.FILTER_STATUSES,
          items: [...getState().statusesMachines.items]
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
      let fetchedResponse = await machinesApi.getItems(
        filter,
        topRowNumber,
        itemsPerPage,
        sortBy,
        sortOrder
      );

      //Fetch temperature for every machine
      let promisses = [];
      for (let i = 0; i < fetchedResponse.items.length; i++) {
        let machineObj = fetchedResponse.items[i];

        let promisse1 = new Promise(async (resolve, reject) => {
          machineObj.temperature = null;
          try {
            let temperatureObj = await machinesApi.getTemperature(
              machineObj.id
            );
            if (temperatureObj.Time && temperatureObj.Data)
              machineObj.temperature = {
                measuring_date: temperatureObj.Time.Seconds,
                value: temperatureObj.Data.Message
              };
          } catch (e) {}

          resolve();
        });

        promisses.push(promisse1);  
        
        let promisse2 = new Promise(async (resolve, reject) => {
          machineObj.itemsLeft = null;
          try {
            let heartbeatObj = await machinesApi.getHeartbeat(
              machineObj.id
            );
            if (heartbeatObj.Data)
              machineObj.itemsInStock = heartbeatObj.Data.ItemsLeft
          } catch (e) {}

          resolve();
        });

        promisses.push(promisse2);  
      }
      await Promise.all(promisses);

      return fetchedResponse;
    };
  }

  goto_editItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_EditItem(ROUTE_NAMES.machineView, itemId));
    };
  }

  goto_addItem() {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.machineView));
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
    return state.machines;
  };
}

export const machinesActions = new MachinesActions();
