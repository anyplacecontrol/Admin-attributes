import PropTypes from "prop-types";
import { ROUTE_NAMES } from "../../consts/routeNames";
import * as viewValidators from "../../utils/viewValidators";
import * as statusesApi from "../../api/statusesApi";
import { BaseViewActions, BaseViewReducer } from "./baseViewRedux";
import * as statusesRedux from "./statusesRedux";
import {  
  IBaseView
} from "./baseViewRedux";

//*******************************************************************************

export const IStatus = {  
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string
};

export const IStatusView = PropTypes.shape({
  ...IBaseView,
  ...IStatus
});

//*******************************************************************************
const PREFIX = "statusView/"; //common for all status views


//*******************************************************************************

export const statusViewInitialState = {
  //IStatus object
  id: 0,
  name: "",
  description: ""
};

//*******************************************************************************
export default function reducer(state = statusViewInitialState, action = {}) {

  let result = BaseViewReducer(PREFIX, state, action, statusViewInitialState);

  if (result) return result;

  switch (action.type) {
    
    default:
      return state;
  }
}

//*******************************************************************************

class StatusViewActions extends BaseViewActions {
  constructor(statusViewKind) {
    super();
    this.statusViewKind = statusViewKind;
  }

  // Public Action Creators


  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    switch (this.statusViewKind) {
      case ROUTE_NAMES.statusesProductsView:
        return ROUTE_NAMES.statusesProducts;
      case ROUTE_NAMES.statusesProductItemsView:
        return ROUTE_NAMES.statusesProductItems;
      case ROUTE_NAMES.statusesOrdersView:
        return ROUTE_NAMES.statusesOrders;
      case ROUTE_NAMES.statusesStoresView:
        return ROUTE_NAMES.statusesStores;        
      case ROUTE_NAMES.statusesMachinesView:
        return ROUTE_NAMES.statusesMachines;                
      case ROUTE_NAMES.statusesKiosksView:
        return ROUTE_NAMES.statusesKiosks;
      case ROUTE_NAMES.statusesCustomersView:
        return ROUTE_NAMES.statusesCustomers;
      default:
        throw "unknown statusViewKind in StatusViewActions._TABLE_ROUTE"
    }
  }

  get _TABLE_ACTIONS_PROVIDER() {
    switch (this.statusViewKind) {
      case ROUTE_NAMES.statusesProductsView:
        return statusesRedux.statusesProductsActions;
      case ROUTE_NAMES.statusesProductItemsView:
        return statusesRedux.statusesProductItemsActions;
      case ROUTE_NAMES.statusesOrdersView:
        return statusesRedux.statusesOrdersActions;
      case ROUTE_NAMES.statusesStoresView:
        return statusesRedux.statusesStoresActions;        
      case ROUTE_NAMES.statusesMachinesView:
        return statusesRedux.statusesMachinesActions;                
      case ROUTE_NAMES.statusesKiosksView:
        return statusesRedux.statusesKiosksActions;                        
      case ROUTE_NAMES.statusesCustomersView:
        return statusesRedux.statusesCustomersActions;                                
      default:
      throw "unknown statusViewKind in StatusViewActions._TABLE_ACTIONS_PROVIDER"
    }
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  // get _API_PROVIDER() {
  //   return statusesApi;
  // }

  // _validateView(itemObj) {
    // let result = {...viewValidators.validateStatusView(itemObj)};
    // result.statusKind = this.statusViewKind; //pass statusKind to API Provider
    // return result;
  // }

  _isNewItem(itemObj) {
    return itemObj.id === 0;
  }

  _getStateSlice = state => {
    return state.statusView;
  };
}

export const statusesProductsViewActions = new StatusViewActions(
  ROUTE_NAMES.statusesProductsView
);
export const statusesProductItemsViewActions = new StatusViewActions(
  ROUTE_NAMES.statusesProductItemsView
);
export const statusesOrdersViewActions = new StatusViewActions(
  ROUTE_NAMES.statusesOrdersView
);
export const statusesStoresViewActions = new StatusViewActions(
  ROUTE_NAMES.statusesStoresView
);
export const statusesMachinesViewActions = new StatusViewActions(
  ROUTE_NAMES.statusesMachinesView
);
export const statusesKiosksViewActions = new StatusViewActions(
  ROUTE_NAMES.statusesKiosksView
);
export const statusesCustomersViewActions = new StatusViewActions(
  ROUTE_NAMES.statusesCustomersView
);
