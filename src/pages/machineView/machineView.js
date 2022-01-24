import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as machineViewRedux from "../../redux/modules/machineViewRedux";
import {machineViewActions} from "../../redux/modules/machineViewRedux";
import {reportTemperatureHistoryActions} from "../../redux/modules/reportTemperatureHistoryRedux";
import {reportSensorsHistoryActions} from "../../redux/modules/reportSensorsHistoryRedux";
import {AddressPanel} from "../../components/AddressPanel/AddressPanel";
import {MachineGeneral} from "./MachineGeneral";
import {BaseView} from "../../components/BaseView/BaseView";
import {IStatusView} from "../../redux/modules/statusViewRedux";
import * as routingRedux from "../../redux/modules/routingRedux";
import {ROUTE_NAMES} from "../../consts/routeNames";

export class machineView_ extends React.Component {

  onChangeInventoryNumber = newValue => {
    this.props.dispatch(
      machineViewActions.changeInventoryNumber(newValue)
    );
  };

  onChangeManufacturerName = newValue => {
    this.props.dispatch(
      machineViewActions.changeManufacturerName(newValue)
    );
  };

  onChangeModelName = newValue => {
    this.props.dispatch(
      machineViewActions.changeModelName(newValue)
    );
  };

  onChangeDetails = newValue => {
    this.props.dispatch(machineViewActions.changeDetails(newValue));
  };

  onChangeName = newValue => {
    this.props.dispatch(
      machineViewActions.changeName(newValue)
    );
  };

  onChangeContactPerson = newValue => {
    this.props.dispatch(
      machineViewActions.changeAddress_ContactPerson(newValue)
    );
  };

  onChangeCoordinates = newValue => {
    this.props.dispatch(
      machineViewActions.changeAddress_Coordinates(newValue)
    );
  };

  onChangeCountry = newValue => {
    this.props.dispatch(
      machineViewActions.changeAddress_Country(newValue)
    );
  };

  onChangeState = newValue => {
    this.props.dispatch(
      machineViewActions.changeAddress_State(newValue)
    );
  };

  onChangeCity = newValue => {
    this.props.dispatch(
      machineViewActions.changeAddress_City(newValue)
    );
  };

  onChangeZip = newValue => {
    this.props.dispatch(
      machineViewActions.changeAddress_Zip(newValue)
    );
  };

  onChangeStreet = newValue => {
    this.props.dispatch(
      machineViewActions.changeAddress_Street(newValue)
    );
  };

  onChangePhone = newValue => {
    this.props.dispatch(
      machineViewActions.changeAddress_Phone(newValue)
    );
  };

  onChangeStatus = newStatus => {
    this.props.dispatch(
      machineViewActions.changeStatus(newStatus)
    );
  };

  onTemperatureHistoryClick = async () => {
    let itemId = this.props.machine.id;
    await this.props.dispatch(routingRedux.goto_EditItem(ROUTE_NAMES.reportsTemperature, itemId));
    this.props.dispatch(reportTemperatureHistoryActions.changeMachineId(itemId));
  };

  onSensorsHistoryClick = async () => {
    let itemId = this.props.machine.id;
    await this.props.dispatch(routingRedux.goto_EditItem(ROUTE_NAMES.reportsSensor, itemId));
    this.props.dispatch(reportSensorsHistoryActions.changeMachineId(itemId));
  };

  render() {
    return (
      <BaseView viewName="Machine" actionsProvider={machineViewActions}>
        <MachineGeneral
          machine={this.props.machine}
          statuses={this.props.statuses}
          onChangeInventoryNumber={this.onChangeInventoryNumber}
          onChangeManufacturerName={this.onChangeManufacturerName}
          onChangeModelName={this.onChangeModelName}
          onChangeDetails={this.onChangeDetails}
          onTemperatureHistoryClick={this.onTemperatureHistoryClick}
          onSensorsHistoryClick={this.onSensorsHistoryClick}
          onChangeName={this.onChangeName}
          onChangeStatus={this.onChangeStatus}
        />

        {/* -- Address -- */}
        <AddressPanel
          address={this.props.machine.address || {}}
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

machineView_.propTypes = {
  dispatch: PropTypes.func.isRequired,

  machine: machineViewRedux.IMachineView,
  statuses: PropTypes.arrayOf(IStatusView),
};

function mapStateToProps(state) {
  return {
    machine: state.machineView,
    statuses: state.statusesMachines.items,
  };
}

export const machineView = connect(mapStateToProps)(machineView_);
