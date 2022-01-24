import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as roleViewRedux from "../../redux/modules/roleViewRedux";
import {ROUTE_NAMES} from "../../consts/routeNames";
// import { StatusGeneral } from "./StatusGeneral"; todo: RoleGeneral component
import {BaseView} from "../../components/BaseView/BaseView";

export class roleView_ extends React.Component {

  getActionProvider() {
    switch (this.props.roleKind) {

      case ROUTE_NAMES.rolesAdminsView:
        return roleViewRedux.rolesAdminsViewActions;

      default:
        throw "unknown roleKind " +
        this.props.roleKind +
        " in roleView_.componentDidMount()";
    }
  }

  onChangeName = newValue => {
    // this.props.dispatch(this.roleViewActions.changeName(newValue));
  };

  onChangeDescription = newValue => {
    // this.props.dispatch(this.roleViewActions.changeDescription(newValue));
  };

  getCaption = () => {
    let roleName;
    switch (this.props.roleKind) {

      case ROUTE_NAMES.rolesAdminsView:
        roleName = "Order";
        break;

      default:
        throw "unknown roleKind " +
        this.props.roleKind +
        " in roleView_.getCaption()";
    }

    let caption = roleName + " Role";
    if (this.props.role.id > 0) {
      caption = roleName + " Role";
    }
    return caption;
  };

  render() {
    return (
      <BaseView
        viewName={this.getCaption()}
        actionsProvider={this.getActionProvider()}
      >

        {/*<StatusGeneral*/}
        {/*  status={this.props.status}*/}
        {/*  onChangeName={this.onChangeName}*/}
        {/*  onChangeDescription={this.onChangeDescription}*/}
        {/*/>*/}

      </BaseView>
    );
  }
}

roleView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  role: roleViewRedux.IRoleView,
  roleKind: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    role: state.roleView,
    roleKind: state.router.location.pathname
  };
}

export const roleView = connect(mapStateToProps)(roleView_);
