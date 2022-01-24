import PropTypes from "prop-types";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { categoriesActions } from "./categoriesRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as categoriesApi from "../../api/categoriesApi";
import * as dataFuncs from "../../utils/dataFuncs";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView,
  translateField
} from "./baseViewRedux";
import { IImage } from "../../components/ImagesPanel/ImagesPanel";

//*******************************************************************************

export const ICategoryView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired,
  description: PropTypes.string,
  image: IImage
  //other fields skipped
});

//*******************************************************************************
const PREFIX = "categoryView/";

const CHANGE_PREV_FIELDS = PREFIX + "CHANGE_PREV_FIELDS";
const CHANGE_MULTILANGUAGE_NAME = PREFIX + "CHANGE_MULTILANGUAGE_NAME";

//*******************************************************************************

export const categoryViewInitialState = {
  ...BaseViewInitialState,
  //IOrderView object
  id: 0,
  name: "",
  slug: "",
  priority: 0,
  description: "",
  image: null,

  //required only for API provider
  prevImage: null
};

//*******************************************************************************

export default function reducer(state = categoryViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, categoryViewInitialState);

  if (result) return result;

  switch (action.type) {
    case CHANGE_PREV_FIELDS:
      return {
        ...state,
        prevImage: action.prevImage
      };

    case CHANGE_MULTILANGUAGE_NAME: {
      return translateField(
        state, 
        (item, newValue) => { item.name = newValue},
        action.value);
    }
    
    default:
      return state;
  }
}

//*******************************************************************************

class CategoryViewActions extends BaseViewActions {
  // Public Action Creators

  // Protected Action Creators

  initializeView_end = () => {
    return async (dispatch, getState) => {
      //we need to remember previous value of image,
      //because there is separate API to change it

      let categoryObj = this._getStateSlice(getState());
      if (this._isNewItem(categoryObj)) return;

      let existingCategory = dataFuncs.getItemById(
        categoryObj.id,
        getState().categories.items
      );

      if (existingCategory)
        await dispatch({
          type: CHANGE_PREV_FIELDS,
          prevImage: existingCategory.image
        });
    };
  };

  changeMultiLanguageName(newValue) {
    return { type: CHANGE_MULTILANGUAGE_NAME, value: newValue };
  }

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.categories;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return categoriesActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return categoriesApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateCategoryView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.id === 0;
  }

  _getStateSlice = state => {
    return state.categoryView;
  };
}

export const categoryViewActions = new CategoryViewActions();
