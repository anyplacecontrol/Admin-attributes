import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as userViewRedux from "../../redux/modules/userViewRedux";
import {IRoleView} from "../../redux/modules/roleViewRedux";
import {userViewActions} from "../../redux/modules/userViewRedux";
import {BaseView} from "../../components/BaseView/BaseView";
import {UserGeneral} from "./UserGeneral";
// import { AddressPanel } from "../../components/AddressPanel/AddressPanel";

export class userView_ extends React.Component {

  onChange_FirstName = newValue => {
    this.props.dispatch(
      userViewActions.changeFirstName(newValue)
    );
  };

  onChange_LastName = newValue => {
    this.props.dispatch(
      userViewActions.changeLastName(newValue)
    );
  };

  onChange_Email = newValue => {
    this.props.dispatch(
      userViewActions.changeEmail(newValue)
    );
  };

  onChange_Password = newValue => {
    this.props.dispatch(
      userViewActions.changePassword(newValue)
    );
  };

  onChange_Phone = newValue => {
    this.props.dispatch(
      userViewActions.changePhone(newValue)
    );
  };

  onChange_Role = newRole => {
    this.props.dispatch(
      userViewActions.changeRole(newRole)
    );
    this.props.dispatch(
      userViewActions.changeRoleId(newRole.id)
    );
  };

  render() {
    return (
      <BaseView
        viewName="Admin User"
        actionsProvider={userViewActions}
      >
        <UserGeneral
          user={this.props.user}
          roles={this.props.roles || []}

          onChangeFirstName={this.onChange_FirstName}
          onChangeLastName={this.onChange_LastName}
          onChangeEmail={this.onChange_Email}
          onChangePassword={this.onChange_Password}
          onChangePhone={this.onChange_Phone}
          onChangeRole={this.onChange_Role}
        />

        {/* --Address-- */}
        {/*<AddressPanel*/}
        {/*  caption="Address"*/}
        {/*  address={{}}*/}
        {/*  onChangeCountry={value => this.onChange_Country(value)}*/}
        {/*  onChangeState={value => this.onChange_State(value)}*/}
        {/*  onChangeCity={value => this.onChange_City(value)}*/}
        {/*  onChangeZip={value => this.onChange_Zip(value)}*/}
        {/*  onChangeStreet={value => this.onChange_Street(value)}*/}
        {/*  onChangeFirstName={value => this.onChange_FirstName(value)}*/}
        {/*  onChangeLastName={value => this.onChange_LastName(value)}*/}
        {/*  onChangeEmail={value => this.onChange_Email(value)}*/}
        {/*  onChangePhone={value => this.onChange_Phone(value)}*/}
        {/*/>*/}

      </BaseView>
    );
  }
}

userView_.propTypes = {
  dispatch: PropTypes.func.isRequired,

  user: userViewRedux.IUserView,
  roles: PropTypes.arrayOf(IRoleView)
};

function mapStateToProps(state) {
  return {
    user: state.userView,
    roles: state.rolesAdmins.items,
  };
}

export const userView = connect(mapStateToProps)(userView_);
