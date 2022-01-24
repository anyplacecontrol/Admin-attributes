import PropTypes from "prop-types";
import {ROUTE_NAMES} from "../../consts/routeNames";
import {alarmsActions} from "./alarmsRedux";
import * as alarmsApi from "../../api/alarmsApi";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";

//*******************************************************************************

export const IAlarmData = PropTypes.shape({
  Message: PropTypes.string.isRequired,
});

export const IAlarmsView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.number.isRequired,
  Date: PropTypes.number.isRequired,
  Data: PropTypes.shape(IAlarmData),
  AlarmID: PropTypes.string.isRequired,
  AlarmType: PropTypes.string.isRequired,
});

//*******************************************************************************

const PREFIX = "alarmsView/";

//*******************************************************************************

export const alarmsViewInitialState = {
  ...BaseViewInitialState,
  isChecked: false,
  //IAlarmsView object
  id: 0,
  Date: 0,
  Data: {Message: ""},
  AlarmID: "",
  AlarmType: "",
};

//*******************************************************************************

export default function reducer(state = alarmsViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, alarmsViewInitialState);
  if (result) {
    return result;
  }

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class AlarmsViewActions extends BaseViewActions {
  // Public Action Creators


  // Protected Action Creators


  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.alarms;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return alarmsActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return alarmsApi;
  }

  _validateView(itemObj) {
    //
  }

  _isNewItem(itemObj) {
    return false;
  }

  _getStateSlice = state => {
    return state.alarmsView;
  };

}

export const alarmsViewActions = new AlarmsViewActions();
