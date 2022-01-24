import PropTypes from "prop-types";
import {ROUTE_NAMES} from "../../consts/routeNames";
import {BaseViewActions, BaseViewReducer} from "./baseViewRedux";
import * as rolesRedux from "./rolesRedux";
import {
  IBaseView
} from "./baseViewRedux";

//*******************************************************************************

export const IRole = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  isSuperAdmin: PropTypes.bool
};

export const IRoleView = PropTypes.shape({
  ...IBaseView,
  ...IRole
});

//*******************************************************************************

const PREFIX = "roleView/"; //common for all role views

//*******************************************************************************

export const roleViewInitialState = {
  //IRole object
  id: 0,
  name: "",
  description: "",
  isSuperAdmin: false
};

//*******************************************************************************
export default function reducer(state = roleViewInitialState, action = {}) {

  let result = BaseViewReducer(PREFIX, state, action, roleViewInitialState);

  if (result) return result;

  switch (action.type) {

    default:
      return state;
  }
}

//*******************************************************************************

class RoleViewActions extends BaseViewActions {
  constructor(roleViewKind) {
    super();
    this.roleViewKind = roleViewKind;
  }

  // Public Action Creators


  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    switch (this.roleViewKind) {

      case ROUTE_NAMES.rolesAdminsView:
        return ROUTE_NAMES.rolesAdmins;

      default:
        throw "unknown roleViewKind in RoleViewActions._TABLE_ROUTE"
    }
  }

  get _TABLE_ACTIONS_PROVIDER() {
    switch (this.roleViewKind) {

      case ROUTE_NAMES.rolesAdminsView:
        return rolesRedux.rolesAdminsActions;

      default:
        throw "unknown roleViewKind in RoleViewActions._TABLE_ACTIONS_PROVIDER"
    }
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  _isNewItem(itemObj) {
    return itemObj.id === 0;
  }

  _getStateSlice = state => {
    return state.roleView;
  };
}

export const rolesAdminsViewActions = new RoleViewActions(
  ROUTE_NAMES.rolesAdminsView
);
