import PropTypes from "prop-types";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { metricsActions } from "./metricsRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as metricsApi from "../../api/metricsApi";
import * as dataFuncs from "../../utils/dataFuncs";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView,
  translateField
} from "./baseViewRedux";

//*******************************************************************************
export const IMetricButtons = PropTypes.shape({
  title: PropTypes.string,
  isChecked: PropTypes.bool,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.arrayOf(PropTypes.string)
    })
  )
});

export const IMetricRulesValue = PropTypes.shape({  
  min: PropTypes.string,
  max: PropTypes.string,
});

export const IMetricView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  metricUi: PropTypes.shape({
    priceMeasure: PropTypes.string,
    totalWeight: PropTypes.arrayOf(PropTypes.string),
    weight: IMetricButtons,
    thickness: IMetricButtons,
    marbling: IMetricButtons
  }).isRequired,
  translations: PropTypes.object,

  rules: PropTypes.shape({
    weight: PropTypes.shape({
      type: PropTypes.string,
      values_transformed: PropTypes.arrayOf(IMetricRulesValue)      
    })
  })
});

//*******************************************************************************
const PREFIX = "metricView/";

const CHANGE_MULTILANGUAGE_TOTAL_WEIGHT_FIELD =
  PREFIX + "CHANGE_MULTILANGUAGE_TOTAL_WEIGHT_FIELD";
const CHANGE_TOTAL_WEIGHT = PREFIX + "CHANGE_TOTAL_WEIGHT";
// const CHANGE_WEIGHT = PREFIX + "CHANGE_WEIGHT";
// const CHANGE_THICKNESS = PREFIX + "CHANGE_THICKNESS";
// const CHANGE_MARBLING = PREFIX + "CHANGE_MARBLING";
const CHANGE_PRICE_MEASURE = PREFIX + "CHANGE_PRICE_MEASURE";
const CHANGE_MULTILANGUAGE_BUTTONS_FIELD =
  PREFIX + "CHANGE_MULTILANGUAGE_BUTTONS_FIELD";
const CHANGE_WEIGHT_RULES_VALUE = PREFIX + "CHANGE_WEIGHT_RULES_VALUE";

//*******************************************************************************

export const metricViewInitialState = {
  ...BaseViewInitialState,
  isChecked: false,
  //IMetricView object
  id: 0,
  name: "",
  description: "",
  metricUi: {
    priceMeasure: "Lb",
    totalWeight: null,
    weight: null,
    thickness: null,
    marbling: null
  },
  rules: {
    weight: {
      type: "range",
      values_transformed: [{min:"", max:""}, {min:"", max:""}, {min:"", max:""}]     
    }
  }
};

//*******************************************************************************

export default function reducer(state = metricViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, metricViewInitialState);

  if (result) return result;

  switch (action.type) {
    case CHANGE_PRICE_MEASURE: {
      return translateField(
        state,
        (item, newValue) => {
          item.metricUi = { ...item.metricUi }; //create metricUi if does not exist
          item.metricUi.priceMeasure = newValue;
        },
        action.value
      );
    }

    case CHANGE_MULTILANGUAGE_BUTTONS_FIELD: {
      if (!action.payload.isTranslatable) {
        let metricUi = JSON.parse(JSON.stringify(state.metricUi || {}));
        modifyMetricField(
          metricUi,
          action.payload.pathToField,
          action.payload.newValue
        );
        return {
          ...state,
          metricUi: { ...metricUi }
        };
      } else {
        let result = translateField(
          state,
          (item, newValue) => {
            item.metricUi = JSON.parse(JSON.stringify(item.metricUi || {}));
            modifyMetricField(
              item.metricUi,
              action.payload.pathToField,
              newValue
            );
          },
          action.payload.newValue
        );
        return result;
      }
    }

    case CHANGE_MULTILANGUAGE_TOTAL_WEIGHT_FIELD: {
      return translateField(
        state,
        (item, newValue) => {
          item.metricUi = JSON.parse(JSON.stringify(item.metricUi || {}));
          if (!item.metricUi.totalWeight) item.metricUi.totalWeight = ["", ""];
          item.metricUi.totalWeight[action.payload.arrayIndex] = newValue;
        },
        action.payload.value
      );
    }

    case CHANGE_TOTAL_WEIGHT: {
      let translations = state.translations;
      //Set or delete totalWeight field for every foreign language;
      if (translations) {
        translations = JSON.parse(JSON.stringify(state.translations));
        for (var lang in translations) {
          let metricUi = translations[lang].metricUi;
          if (!metricUi) continue;
          metricUi.totalWeight = action.value;
        }
      }

      //Set or delete totalWeight field for English;
      return {
        ...state,
        metricUi: { ...state.metricUi, totalWeight: action.value },
        translations
      };
    }

    case CHANGE_WEIGHT_RULES_VALUE: {
      let newRules = JSON.parse(JSON.stringify(state.rules));
      let newValue = action.payload.newValue;
      let buttonIndex = action.payload.buttonIndex;
      let fieldName = action.payload.fieldName;
      newRules.weight.values_transformed[buttonIndex][fieldName] = newValue;
      return {
        ...state,
        rules: newRules
      }
    }

    // case CHANGE_WEIGHT:
    //   return {
    //     ...state,
    //     metricUi: { ...state.metricUi, weight: action.value }
    //   };

    // case CHANGE_THICKNESS:
    //   return {
    //     ...state,
    //     metricUi: { ...state.metricUi, thickness: action.value }
    //   };

    // case CHANGE_MARBLING:
    //   return {
    //     ...state,
    //     metricUi: { ...state.metricUi, marbling: action.value }
    //   };

    default:
      return state;
  }
}

//*******************************************************************************

class MetricViewActions extends BaseViewActions {
  // Public Action Creators

  changeMultiLanguagePriceMeasure(value) {
    return {
      type: CHANGE_PRICE_MEASURE,
      value
    };
  }

  changeMultiLanguageTotalWeightField(arrayIndex, value) {
    return {
      type: CHANGE_MULTILANGUAGE_TOTAL_WEIGHT_FIELD,
      payload: { arrayIndex, value }
    };
  }

  changeTotalWeight(value) {
    return {
      type: CHANGE_TOTAL_WEIGHT,
      value
    };
  }

  changeMultiLanguageButtonsField(pathToField, newValue, isTranslatable) {
    return {
      type: CHANGE_MULTILANGUAGE_BUTTONS_FIELD,
      payload: { pathToField, newValue, isTranslatable }
    };
  }

  changeWeightRulesValue(newValue, buttonIndex, fieldName) {
    return {
      type: CHANGE_WEIGHT_RULES_VALUE,
      payload: { newValue, buttonIndex, fieldName }
    };
  }

  // changeWeight(value) {
  //   return {
  //     type: CHANGE_WEIGHT,
  //     value
  //   };
  // }

  // changeThickness(value) {
  //   return {
  //     type: CHANGE_THICKNESS,
  //     value
  //   };
  // }

  // changeMarbling(value) {
  //   return {
  //     type: CHANGE_MARBLING,
  //     value
  //   };
  // }

  // Protected Action Creators

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.metrics;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return metricsActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return metricsApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateMetricView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.id === 0;
  }

  _getStateSlice = state => {
    return state.metricView;
  };
}

//-------------------------------------------------------------------------------
//Service Funcs

function modifyMetricField(metricUi, pathToField, newValue) {
  let endNode = metricUi;
  for (let i = 0; i < pathToField.length; i++) {
    let childField = pathToField[i];
    if (!endNode[childField]) endNode[childField] = {};
    if (i === pathToField.length - 1) endNode[childField] = newValue;
    endNode = endNode[childField];
  }
}

export const metricViewActions = new MetricViewActions();
