import PropTypes from "prop-types";
import {ROUTE_NAMES} from "../../consts/routeNames";
import {logsActions} from "./logsRedux";
import * as logsApi from "../../api/logsApi";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";

//*******************************************************************************

export const ILogData = PropTypes.shape({
  Message: PropTypes.string.isRequired,
  Timestamp: PropTypes.string.isRequired,
  Level: PropTypes.string.isRequired,
});

export const ILogsView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.number.isRequired,
  Date: PropTypes.number.isRequired,
  Log: PropTypes.shape(ILogData),
});

//*******************************************************************************

const PREFIX = "logsView/";

//*******************************************************************************

export const logsViewInitialState = {
  ...BaseViewInitialState,
  isChecked: false,
  //ILogsView object
  id: 0,
  Date: 0,
  Log: {
    Message: "",
    Timestamp: "",
    Level: "",
  },
};

//*******************************************************************************

export default function reducer(state = logsViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, logsViewInitialState);
  if (result) {
    return result;
  }

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class LogsViewActions extends BaseViewActions {
  // Public Action Creators


  // Protected Action Creators


  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.logs;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return logsActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return logsApi;
  }

  _validateView(itemObj) {
    //
  }

  _isNewItem(itemObj) {
    return false;
  }

  _getStateSlice = state => {
    return state.logsView;
  };

}

export const logsViewActions = new LogsViewActions();
