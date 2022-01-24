import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BaseView } from "../../components/BaseView/BaseView";
import { TaxGeneral } from "./TaxGeneral";
import { AddressPanel } from "../../components/AddressPanel/AddressPanel";

export class taxView_ extends React.Component {
  onChangeCountry = () => {};

  onChangeState = () => {};

  onChangeCity = () => {};
  
  render() {
    return (
      <BaseView viewName="Tax" actionsProvider={null}>
        {/* -- Description-- */}
        <TaxGeneral />

        {/* -- Address -- */}
        <AddressPanel
          address={{}}
          onChangeCountry={this.onChangeCountry}
          onChangeState={this.onChangeState}
          onChangeCity={this.onChangeCity}
        />
      </BaseView>
    );
  }
}

taxView_.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    //tax: state.taxView
  };
}

export const taxView = connect(mapStateToProps)(taxView_);
