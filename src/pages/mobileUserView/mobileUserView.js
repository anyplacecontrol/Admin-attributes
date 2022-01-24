import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as mobileUserViewRedux from "../../redux/modules/mobileUserViewRedux";
import {BaseView} from "../../components/BaseView/BaseView";
import {MobileUserGeneral} from "./MobileUserGeneral";

export class mobileUserView_ extends React.Component {

  //-------------------------------------------------------------------
  //For General Panel
  onChangeFirstName = newValue => {
    this.props.dispatch(
      mobileUserViewRedux.mobileUserViewActions.changeFirstName(newValue)
    );
  };

  onChangeLastName = newValue => {
    this.props.dispatch(
      mobileUserViewRedux.mobileUserViewActions.changeLastName(newValue)
    );
  };

  onChangeEmail = newValue => {
    this.props.dispatch(
      mobileUserViewRedux.mobileUserViewActions.changeEmail(newValue)
    );
  };

  onChangePhone = newValue => {
    this.props.dispatch(
      mobileUserViewRedux.mobileUserViewActions.changePhone(newValue)
    );
  };

  //-------------------------------------------------------------------

  render() {
    return (
      <BaseView
        viewName="Mobile Customer"
        actionsProvider={mobileUserViewRedux.mobileUserViewActions}
      >

        <MobileUserGeneral
          mobileUser={this.props.mobileUser}
          onChangeFirstName={this.onChangeFirstName}
          onChangeLastName={this.onChangeLastName}
          onChangeEmail={this.onChangeEmail}
          onChangePhone={this.onChangePhone}
        />

      </BaseView>
    );
  }
}

mobileUserView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mobileUser: mobileUserViewRedux.IMobileUserView
};

function mapStateToProps(state) {
  return {
    mobileUser: state.mobileUserView
  };
}

export const mobileUserView = connect(mapStateToProps)(mobileUserView_);
