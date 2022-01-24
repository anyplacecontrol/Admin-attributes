import * as statusesApi from "../../api/statusesApi";
import * as tableColumns from "../../consts/tableColumns";
import * as routing from "./routingRedux";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,  
} from "./baseTableRedux";

export const statusesProducts = "statusesProducts";
export const statusesProductItems = "statusesProductItems";
export const statusesOrders = "statusesOrders";
export const statusesStores = "statusesStores";
export const statusesMachines = "statusesMachines";
export const statusesKiosks = "statusesKiosks";
export const statusesCustomers = "statusesCustomers";

//*******************************************************************************

export const statusesInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_NAME,
  columns: tableColumns.STATUSES_COLUMNS
};

//*******************************************************************************
export default function getReducer(statusKind) {
  const PREFIX = statusKind + "/";

  return function reducer(state = statusesInitialState, action = {}) {
    let result = BaseTableReducer(PREFIX, state, action, statusesInitialState);

    if (result) return result;

    switch (action.type) {
      default:
        return state;
    }
  };
}

//*******************************************************************************

class StatusesActions extends BaseTableActions {
  constructor(statusKind) {
    super();
    this.statusKind = statusKind;
  }

  // ABSTRACT ACTIONS REALIZATION


  goto_editItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_EditStatus(itemId, this.statusKind));
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
      let fetchedItems = [];
      
      fetchedItems = await statusesApi.getItems(this.statusKind);

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
    const PREFIX = this.statusKind + "/";
    return PREFIX;
  }

  get ALLOW_ADD_ITEM() {
    return false;
  }

  _getStateSlice = state => {
    switch (this.statusKind) {
      case statusesProducts:
        return state.statusesProducts;
      case statusesProductItems:
        return state.statusesProductItems;
      case statusesOrders:
        return state.statusesOrders;
      case statusesStores:
        return state.statusesStores;
      case statusesMachines:
        return state.statusesMachines;
      case statusesKiosks:
        return state.statusesKiosks;        
      case statusesCustomers:
        return state.statusesCustomers;        
      default:
        throw "status kind is not processed in statusesRedux - _getStateSlice";
    }
  };
}

export const statusesProductsActions = new StatusesActions(statusesProducts);
export const statusesProductItemsActions = new StatusesActions(
  statusesProductItems
);
export const statusesOrdersActions = new StatusesActions(statusesOrders);
export const statusesStoresActions = new StatusesActions(statusesStores);
export const statusesMachinesActions = new StatusesActions(statusesMachines);
export const statusesKiosksActions = new StatusesActions(statusesKiosks);
export const statusesCustomersActions = new StatusesActions(statusesCustomers);