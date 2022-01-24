import * as metricsApi from "../../api/metricsApi";
import * as tableColumns from "../../consts/tableColumns";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes
} from "./baseTableRedux";
import * as tableFilters from "../../consts/tableFilters";
import * as routing from "./routingRedux";
import * as uiActions from "./uiRedux";
import * as productsApi from "../../api/productsApi";
import { ROUTE_NAMES } from "../../consts/routeNames";

//*******************************************************************************
const PREFIX = "metrics/";

//*******************************************************************************

export const metricsInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_NAME,
  columns: tableColumns.METRICS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = metricsInitialState, action = {}) {
  let result = BaseTableReducer(PREFIX, state, action, metricsInitialState);

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class MetricsActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Delete
  _deleteItem(metricObj) {
    return async (dispatch, getState) => {
      const metricId = metricObj.id;

      //if any product has this metric
      // let filter = {
      //   [tableFilters.FILTER_METRICS.apiParamName]: [metricObj.id]
      // };
      
      // let productsResponse = await productsApi.getItems(filter, 0, 1);

      // if (productsResponse.maxItemsQty > 0) {
      //   throw "Unable to delete metric '" +
      //     metricObj.name +
      //     "', because there are some Products associated with it";
      // }

      await metricsApi.deleteItem(metricObj);
    };
  }

  loadFilterItems() {
    return async dispatch => {};
  }

  _fetchItemsFromNetwork() {
    return async (dispatch, getState) => {
      let fetchedResponse = await metricsApi.getItems();

      return fetchedResponse;
    };
  }

  goto_editItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_EditItem(ROUTE_NAMES.metricView, itemId));
    };
  }

  goto_addItem() {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.metricView));
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
    return false;
  }

  _getStateSlice = state => {
    return state.metrics;
  };
}

export const metricsActions = new MetricsActions();
