import PropTypes from "prop-types";
import {ROUTE_NAMES} from "../../consts/routeNames";
import {machinesActions} from "./machinesRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as machinesApi from "../../api/machinesApi";
import * as statusViewRedux from "./statusViewRedux";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  BaseViewTypes,
  IBaseView
} from "./baseViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import {ILocationAddress} from "../../components/AddressPanel/AddressPanel";
import {IManufacturer, IModel} from "./kioskViewRedux";
import * as uiActions from "./uiRedux";
import {showException} from "./baseTableRedux";

//*******************************************************************************
export const IMachineView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  status: PropTypes.shape(statusViewRedux.IStatus).isRequired,
  inventoryNumber: PropTypes.string,
  manufacturerId: PropTypes.string,
  manufacturer: IManufacturer,
  modelId: PropTypes.string,
  model: IModel,
  addressId: PropTypes.number,
  address: ILocationAddress,
  details: PropTypes.string,
  inboundQueue: PropTypes.string,
  outboundQueue: PropTypes.string,
  //Not in DB: calculated in fetch
  temperature: PropTypes.shape({
    measuring_date: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  }),
  //Not in DB: calculated in fetch
  itemsInStock: PropTypes.number,
  //Not in DB (calculated for View Only: TODO)
  kioskIds: PropTypes.arrayOf(PropTypes.string),
  storeId: PropTypes.string
});

//*******************************************************************************
const PREFIX = "machineView/";

const CHANGE_SOME_FIELDS = PREFIX + "CHANGE_SOME_FIELDS";
const CHANGE_STATUS = PREFIX + "CHANGE_STATUS";

//*******************************************************************************

export const machineViewInitialState = {
  ...BaseViewInitialState,
  //IMachineView object
  id: "",
  storeId: "not Implemented",
  kioskIds: [],
  inventoryNumber: "",
  manufacturer: {name: ""},
  model: {name: ""},
  status: {id: 0, name: ""},
  address: {}, //ILocationAddress
  details: "",
  inboundQueue: "",
  outboundQueue: "",

  //required only for API provider
  prevModel: null,
  prevManufacturer: null,
  prevAddress: null
};

//*******************************************************************************

export default function reducer(state = machineViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, machineViewInitialState);

  if (result) return result;

  switch (action.type) {
    case CHANGE_SOME_FIELDS:
      return {
        ...state,
        //temperature: action.temperature,
        prevAddress: action.prevAddress,
        prevModel: action.property,
        prevManufacturer: action.prevManufacturer
      };

    case CHANGE_STATUS:
      return {...state, status: action.value};

    default:
      return state;
  }
}

//*******************************************************************************

class MachineViewActions extends BaseViewActions {
  // Public Action Creators


  // Protected Action Creators

  initializeView_end = () => {
    return async (dispatch, getState) => {
      //we need to remember some previous values,
      //because there is separate API to change them

      let machineObj = this._getStateSlice(getState());
      if (this._isNewItem(machineObj)) return;

      let existingMachine = dataFuncs.getItemById(
        machineObj.id,
        getState().machines.items
      );

      await dispatch({
        type: CHANGE_SOME_FIELDS,
        prevAddress: existingMachine.address,
        prevModel: existingMachine.model,
        prevManufacturer: existingMachine.manufacturer
      });
    };
  };

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.machines;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return machinesActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return machinesApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateMachineView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.id == "";
  }

  _getStateSlice = state => {
    return state.machineView;
  };
}

export const machineViewActions = new MachineViewActions();
