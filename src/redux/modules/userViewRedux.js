import PropTypes from "prop-types";
import {ROUTE_NAMES} from "../../consts/routeNames";
import {IStatus} from "./statusViewRedux";
import {usersActions} from "./usersRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as usersApi from "../../api/usersApi";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";

//*******************************************************************************
export const IUserView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  cognitoUserId: PropTypes.string,
  createdAt: PropTypes.string,
  roleId: PropTypes.number.isRequired,
  // role: PropTypes.shape(IStatus),
});

//*******************************************************************************
const PREFIX = "userView/";

const CHANGE_PREV_FIELDS = PREFIX + "CHANGE_PREV_FIELDS";
const CHANGE_STATUS = PREFIX + "CHANGE_STATUS";

//*******************************************************************************

export const userViewInitialState = {
  ...BaseViewInitialState,
  //IUserView object
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  cognitoUserId: "",
  roleId: 0,
  // role: {id: 0, name: ""},
};

//*******************************************************************************

export default function reducer(state = userViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, userViewInitialState);

  if (result) return result;

  switch (action.type) {

    case CHANGE_PREV_FIELDS:
      return {
        ...state,
        // prevAddress: action.prevAddress,
      };

    // case CHANGE_STATUS:
    //   return {...state, status: action.value};

    default:
      return state;
  }
}

//*******************************************************************************

class UserViewActions extends BaseViewActions {
  // Public Action Creators


  // Protected Action Creators
  initializeView_end = () => {
    return async (dispatch, getState) => {
      //we need to remember some previous values,
      //because there is separate API to change them

      let userObj = this._getStateSlice(getState());
      if (this._isNewItem(userObj)) {
        return;
      }

      let existingUser = dataFuncs.getItemById(
        userObj.id,
        getState().users.items
      );

      if (existingUser)
        await dispatch({
          type: CHANGE_PREV_FIELDS,
        });
    };
  };

  // triggerStatus() {
  //   return async (dispatch, getState) => {
  //     let status = getState().userView.status;
  //     let statuses = getState().rolesAdmins.items;
  //     if (!status || !statuses) {
  //       return;
  //     }
  //
  //     let newStatusName = (status.name === "disabled") ? "active" : "disabled";
  //     let newStatus = null;
  //     for (let i = 0; i < statuses.length; i++) {
  //       if (statuses[i].name === newStatusName) {
  //         newStatus = statuses[i];
  //         break;
  //       }
  //     }
  //
  //     if (!newStatus) {
  //       return;
  //     }
  //
  //     dispatch({type: CHANGE_STATUS, value: newStatus});
  //   }
  // }

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.users;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return usersActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    //TODO:
    return usersApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateUserView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.id == "";
  }

  _getStateSlice = state => {
    return state.userView;
  };
}

export const userViewActions = new UserViewActions();
