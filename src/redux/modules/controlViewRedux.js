import PropTypes from "prop-types";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { controlsActions } from "./controlsRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as controlsApi from "../../api/controlsApi";
import * as dataFuncs from "../../utils/dataFuncs";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";

//*******************************************************************************

export const IControlView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  displayInCart: PropTypes.bool.isRequired,
  controlType: PropTypes.string,
  description: PropTypes.string,
  textMapping: PropTypes.object,
  rules: PropTypes.object
});

//*******************************************************************************
const PREFIX = "controlView/";
const CHANGE_CONTROL_TYPE = PREFIX + "CHANGE_CONTROL_TYPE";
const CHANGE_ATTRIBUTE = PREFIX + "CHANGE_ATTRIBUTE";
const TRIGGER_DISPLAY_IN_CART = PREFIX + "TRIGGER_DISPLAY_IN_CART";

//*******************************************************************************

export const controlViewInitialState = {
  ...BaseViewInitialState,
  isChecked: false,
  //IControlView object
  id: 0,
  attribute: "",
  name: "",
  displayInCart: true,
  controlType: null,
  description: "",
  textMapping: null,
  rules: null
};

//*******************************************************************************

export default function reducer(state = controlViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, controlViewInitialState);

  if (result) return result;

  switch (action.type) {
    case CHANGE_CONTROL_TYPE:
      return {
        ...controlViewInitialState,
        controlType: action.controlType
      };

    case CHANGE_ATTRIBUTE:
      return {
        ...state,
        attribute: action.attribute
      };

    case TRIGGER_DISPLAY_IN_CART:
      return {
        ...state,
        displayInCart: !state.displayInCart
      };
    default:
      return state;
  }
}

//*******************************************************************************

class ControlViewActions extends BaseViewActions {
  //  Action Creators

  changeControlType(name) {
    return {
      type: CHANGE_CONTROL_TYPE,
      controlType: name
    };
  }

  changeAttribute(value) {
    return {
      type: CHANGE_ATTRIBUTE,
      attribute: value
    };
  }

  triggerDisplayInCart() {
    return {
      type: TRIGGER_DISPLAY_IN_CART
    };
  }

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.controls;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return controlsActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return controlsApi;
  }

  _validateView(itemObj) {
    //return viewValidators.validateControlView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.id === 0;
  }

  _getStateSlice = state => {
    return state.controlView;
  };
}

export const controlViewActions = new ControlViewActions();
