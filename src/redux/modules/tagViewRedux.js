import PropTypes from "prop-types";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { tagsActions } from "./tagsRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as tagsApi from "../../api/tagsApi";
import * as dataFuncs from "../../utils/dataFuncs";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";


//*******************************************************************************

export const ITagView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  attribute: PropTypes.string.isRequired,
});

//*******************************************************************************
const PREFIX = "tagView/";

//*******************************************************************************

export const tagViewInitialState = {
  ...BaseViewInitialState,
  isChecked: false,
  //ITagView object  
  id: 0,
  name: "",  
};

//*******************************************************************************

export default function reducer(state = tagViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, tagViewInitialState);

  if (result) return result;

  switch (action.type) {
             
    default:
      return state;
  }
}

//*******************************************************************************

class TagViewActions extends BaseViewActions {
  // Public Action Creators

 
  // Protected Action Creators


  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.tags;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return tagsActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return tagsApi;
  }  

  _validateView(itemObj) {
    return viewValidators.validateTagView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.id === 0;
  }

  _getStateSlice = state => {
    return state.tagView;
  };

}

export const tagViewActions = new TagViewActions();
