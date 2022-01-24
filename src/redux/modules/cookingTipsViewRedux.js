import PropTypes from "prop-types";
import {ROUTE_NAMES} from "../../consts/routeNames";
import {cookingTipsActions} from "./cookingTipsRedux";
import {IProductView} from "./productViewRedux";
import {IStatus} from "./statusViewRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as cookingTipsApi from "../../api/cookingTipsApi";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";


//*******************************************************************************
export const ICookingProductCategories = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
});

export const ICookingProduct = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(ICookingProductCategories)
});

export const ICookingTipsView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  product: PropTypes.shape(ICookingProduct),
  // status: PropTypes.shape(IStatus).isRequired,
});

//*******************************************************************************
const PREFIX = "cookingTipsView/";

//*******************************************************************************

export const cookingTipsViewInitialState = {
  ...BaseViewInitialState,
  isChecked: false,
  //ICookingTipsView object
  id: 0,
  title: "",
  text: "",
  product: {},
  // status: {id: 0, name: ""}
};

//*******************************************************************************

export default function reducer(state = cookingTipsViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, cookingTipsViewInitialState);
  if (result) {
    return result;
  }

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class CookingTipsViewActions extends BaseViewActions {
  // Public Action Creators


  // Protected Action Creators


  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.cookingTips;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return cookingTipsActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return cookingTipsApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateCookingTipsView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.id === 0;
  }

  _getStateSlice = state => {
    return state.cookingTipsView;
  };

}

export const cookingTipsViewActions = new CookingTipsViewActions();
