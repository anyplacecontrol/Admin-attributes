import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as kioskViewRedux from "../../redux/modules/kioskViewRedux";
import { kioskViewActions } from "../../redux/modules/kioskViewRedux";
import { AddressPanel } from "../../components/AddressPanel/AddressPanel";
import { KioskGeneral } from "./KioskGeneral";
import { BaseView } from "../../components/BaseView/BaseView";

export class kioskView_ extends React.Component {
  onChangeInventoryNumber = newValue => {
    this.props.dispatch(kioskViewActions.changeInventoryNumber(newValue));
  };

  onChangeManufacturerName = newValue => {
    this.props.dispatch(kioskViewActions.changeManufacturerName(newValue));
  };

  onChangeModelName = newValue => {
    this.props.dispatch(kioskViewActions.changeModelName(newValue));
  };

  onChangeDetails = newValue => {
    this.props.dispatch(kioskViewActions.changeDetails(newValue));
  };

  onChangeContactPerson = newValue => {
    this.props.dispatch(kioskViewActions.changeAddress_ContactPerson(newValue));
  };

  onChangeCoordinates = newValue => {
    this.props.dispatch(kioskViewActions.changeAddress_Coordinates(newValue));
  };

  onChangeCountry = newValue => {
    this.props.dispatch(kioskViewActions.changeAddress_Country(newValue));
  };

  onChangeState = newValue => {
    this.props.dispatch(kioskViewActions.changeAddress_State(newValue));
  };

  onChangeCity = newValue => {
    this.props.dispatch(kioskViewActions.changeAddress_City(newValue));
  };

  onChangeZip = newValue => {
    this.props.dispatch(kioskViewActions.changeAddress_Zip(newValue));
  };

  onChangeStreet = newValue => {
    this.props.dispatch(kioskViewActions.changeAddress_Street(newValue));
  };

  onChangePhone = newValue => {
    this.props.dispatch(kioskViewActions.changeAddress_Phone(newValue));
  };

  onChangeMachineId = newValue => {
    this.props.dispatch(kioskViewActions.changeMachineId(newValue));
  };

  onTriggerHideSleepScreen = () => {
    this.props.dispatch(kioskViewActions.triggerHideSleepScreen());
  }

  render() {
    return (
      <BaseView
        viewName="Kiosk"
        actionsProvider={kioskViewActions}
      >
        <KioskGeneral
          kiosk={this.props.kiosk}
          onChangeInventoryNumber={this.onChangeInventoryNumber}
          onChangeManufacturerName={this.onChangeManufacturerName}
          onChangeModelName={this.onChangeModelName}
          onChangeDetails={this.onChangeDetails}
          onChangeMachineId={this.onChangeMachineId}
          onTriggerHideSleepScreen={this.onTriggerHideSleepScreen}
        />

        {/* -- Address -- */}
        <AddressPanel
          address={this.props.kiosk.address || {}}
          onChangeCoordinates={this.onChangeCoordinates}
          onChangeCountry={this.onChangeCountry}
          onChangeState={this.onChangeState}
          onChangeCity={this.onChangeCity}
          onChangeZip={this.onChangeZip}
          onChangeStreet={this.onChangeStreet}
          onChangeContactPerson={this.onChangeContactPerson}
          onChangePhone={this.onChangePhone}
        />
      </BaseView>
    );
  }
}

kioskView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  kiosk: kioskViewRedux.IKioskView,  
};

function mapStateToProps(state) {
  return {
    kiosk: state.kioskView
  };
}

export const kioskView = connect(mapStateToProps)(kioskView_);
