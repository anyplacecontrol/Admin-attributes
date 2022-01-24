import PropTypes from "prop-types";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { kiosksActions } from "./kiosksRedux";
import { statusesKiosksActions } from "./statusesRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as kiosksApi from "../../api/kiosksApi";
import * as statusViewRedux from "./statusViewRedux";
import {
  BaseViewTypes,
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import { ILocationAddress } from "../../components/AddressPanel/AddressPanel";

//*******************************************************************************

export const IManufacturer = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.any,
  addressId:PropTypes.number,    
  homePage:PropTypes.string,
  phone:PropTypes.string,
});

export const IModel = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string
});

export const IKioskView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.string.isRequired,  
  inventoryNumber: PropTypes.string,
  machineId:  PropTypes.string,
  manufacturer: IManufacturer,
  model: IModel,
  address: ILocationAddress,
  details: PropTypes.string,
  status: PropTypes.shape(statusViewRedux.IStatus).isRequired,    
  hideSleepScreen: PropTypes.bool.isRequired, 

  storeId: PropTypes.string, //not in DB 
  //TODO: IP address    
});

//*******************************************************************************
const PREFIX = "kioskView/";

const CHANGE_HIDE_SLEEP_SCREEN = PREFIX + "CHANGE_HIDE_SLEEP_SCREEN";
const CHANGE_PREV_FIELDS = PREFIX + "CHANGE_PREV_FIELDS";

//*******************************************************************************

export const kioskViewInitialState = {
  ...BaseViewInitialState,
  //IKioskView object
  id: "",
  inventoryNumber: "",
  machineId: "",
  manufacturer: { id: "", name: "" },
  model: { name: "" },
  address: {}, //ILocationAddress
  details: "",  
  status: {id: 0, name: ""},    
  storeId: "not Implemented",            
  hideSleepScreen: false,

  //required only for API provider
  prevModel: null,
  prevManufacturer: null,
  prevAddress: null
};

//*******************************************************************************

export default function reducer(state = kioskViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, kioskViewInitialState);

  if (result) return result;

  switch (action.type) {        

    case CHANGE_HIDE_SLEEP_SCREEN:
      return {...state, hideSleepScreen: action.value}

    case CHANGE_PREV_FIELDS:
      return {
        ...state,

        prevAddress: action.prevAddress,
        prevModel: action.property,
        prevManufacturer: action.prevManufacturer
      };

    default:
      return state;
  }
}

//*******************************************************************************

class KioskViewActions extends BaseViewActions {
  // Public Action Creators 
  
  triggerHideSleepScreen = () => {
    return (dispatch, getState) => {
      let currentValue = this._getStateSlice(getState()).hideSleepScreen;
      dispatch({
        type: CHANGE_HIDE_SLEEP_SCREEN,
        value: !currentValue       
      });
    }
  }  

  // Protected Action Creators

  initializeView_end = () => {
    return async (dispatch, getState) => {
      //we need to remember some previous values,
      //because there is separate API to change them

      let kioskObj = this._getStateSlice(getState());
      if (this._isNewItem(kioskObj)) return;

      let existingKiosk = dataFuncs.getItemById(
        kioskObj.id,
        getState().kiosks.items
      );

      if (existingKiosk)
        await dispatch({
          type: CHANGE_PREV_FIELDS,
          prevAddress: existingKiosk.address,
          prevModel: existingKiosk.model,
          prevManufacturer: existingKiosk.manufacturer
        });
    };
  };

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.kiosks;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return kiosksActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {    
    return kiosksApi;
  }

  _validateView(itemObj) {    
    return viewValidators.validateKioskView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.id == "";
  }

  _getStateSlice = state => {
    return state.kioskView;
  };
}

export const kioskViewActions = new KioskViewActions();
