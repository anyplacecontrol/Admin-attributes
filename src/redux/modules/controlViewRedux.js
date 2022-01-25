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
  IBaseView,
  translateField
} from "./baseViewRedux";
import { modifyRule, deleteLastValueText } from "../../pages/controlView/constsAndFuncs";

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
const CHANGE_TEXTMAPPING_FIELD = PREFIX + "CHANGE_TEXTMAPPING_FIELD";
const CHANGE_RULES_VALUE = PREFIX + "CHANGE_RULES_VALUE";
const ADD_VALUE_TEXT = PREFIX + "ADD_VALUE_TEXT";
const DELETE_LAST_VALUE_TEXT = PREFIX + "DELETE_LAST_VALUE_TEXT";

//*******************************************************************************

export const defaults = {
  rangeButtons: {
    textMapping: {
      valuesText: [{ attributeValue: 1 }, { attributeValue: 2 }]
    },
    rules: {
      type: "range",
      valuesText_transformed: []
    }
  },
  valueButtons: {
    textMapping: {
      valuesText: [{ attributeValue: "" }, { attributeValue: "" }]
    },
    rules: {
      type: "value"
    }
  }
};

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
    case CHANGE_CONTROL_TYPE: {
      let result = {
        ...controlViewInitialState,
        controlType: action.controlType,
        ...defaults[action.controlType]
      };
      return result;
    }

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

    case CHANGE_TEXTMAPPING_FIELD: {
      return translateField(
        state,
        (item, newValue) => {
          item.textMapping = { ...item.textMapping }; //create metricUi if does not exist
          item.textMapping[action.fieldName] = newValue;
        },
        action.value
      );
    }

    //For "range" only
    case CHANGE_RULES_VALUE: {
      let newRules = JSON.parse(JSON.stringify(state.rules)) || {
        type: "range",
        valuesText_transformed: []
      };

      modifyRule(newRules, action.rangeCode, action.fieldName, action.newValue);

      return {
        ...state,
        rules: newRules
      };
    }

    //For rangeButtons and valueButtons
    case ADD_VALUE_TEXT: {
      let newTextMapping = JSON.parse(JSON.stringify(state.textMapping)) || {
        title: "",
        valuesText: []
      };

      newTextMapping.valuesText.push({
        attributeValue: action.attributeValue,
        text: [null, null, null]
      });

      return {
        ...state,
        textMapping: newTextMapping
      };
    }

    case DELETE_LAST_VALUE_TEXT: {      
      let newState = deleteLastValueText(state);

      return {
        ...newState,        
      };
    }

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

  changeRulesValue(newValue, rangeCode, fieldName) {
    return {
      type: CHANGE_RULES_VALUE,
      newValue,
      rangeCode,
      fieldName
    };
  }

  triggerDisplayInCart() {
    return {
      type: TRIGGER_DISPLAY_IN_CART
    };
  }

  changeMultiLanguageTextMappingField(fieldName, value) {
    return {
      type: CHANGE_TEXTMAPPING_FIELD,
      value,
      fieldName
    };
  }

  addValueText(attributeValue) {
    return {
      type: ADD_VALUE_TEXT,
      attributeValue
    };
  }

  deleteLastValueText() {
    return {
      type: DELETE_LAST_VALUE_TEXT,      
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
