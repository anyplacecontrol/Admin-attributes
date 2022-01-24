import PropTypes from "prop-types";
import {ROUTE_NAMES} from "../../consts/routeNames";
import {mobileUsersActions} from "./mobileUsersRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as mobileUsersApi from "../../api/mobileUsersApi";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";
// import {IStatus} from "./statusViewRedux";

//*******************************************************************************
// export const ICustomerRole = PropTypes.shape({
//   id: PropTypes.number.isRequired,
//   cardType: PropTypes.string,
//   hash: PropTypes.string,
// });

export const IMobileUserView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  cognitoUserId: PropTypes.string,
  deviceEndpoint: PropTypes.string,
  stripeCustomerId: PropTypes.string,
  // notifications: PropTypes.bool,
  // homeStore: null,
  // DOB: null,
  // settings: {},
  statusId: PropTypes.number,
  // status: PropTypes.shape(IStatus).isRequired,
  // companyId: null,
  // roleId: null,
  // addressId: null,
});

//*******************************************************************************
const PREFIX = "mobileUserView/";

//*******************************************************************************

export const mobileUserViewInitialState = {
  ...BaseViewInitialState,
  //IMobileUserView object
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  cognitoUserId: "",
  deviceEndpoint: "",
  stripeCustomerId: "",
  // notifications: false,
  // homeStore: null,
  // DOB: null,
  // settings: {},
  // createdAt: "",
  // updatedAt: "",
  statusId: 0,
  // companyId: null,
  // roleId: null,
  // addressId: null,
};

//*******************************************************************************

export default function reducer(state = mobileUserViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, mobileUserViewInitialState);
  if (result) {
    return result;
  }

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class MobileUserViewActions extends BaseViewActions {
  // Protected Action Creators
  initializeView_end = () => {
    return async (dispatch, getState) => {
      let mobileUser = getState().mobileUserView;

      //remove spaces
      await dispatch(this.changeEmail(mobileUser.email.replace(/\s+/g, "")));
      await dispatch(this.changePhone(mobileUser.phone.replace(/\s+/g, "")));
    };
  };

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.mobileUsers;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return mobileUsersActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return mobileUsersApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateMobileUserView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.id === "";
  }

  _getStateSlice = state => {
    return state.mobileUserView;
  };
}

export const mobileUserViewActions = new MobileUserViewActions();
