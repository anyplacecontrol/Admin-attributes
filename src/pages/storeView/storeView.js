import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as storeViewRedux from "../../redux/modules/storeViewRedux";
import {storeViewActions} from "../../redux/modules/storeViewRedux";
import {StoreGeneral} from "./StoreGeneral";
import {StoreWorkingHours} from "./StoreWorkingHours";
import {AddressPanel} from "../../components/AddressPanel/AddressPanel";
import {ImagesPanel} from "../../components/ImagesPanel/ImagesPanel";
import {BaseView} from "../../components/BaseView/BaseView";

export class storeView_ extends React.Component {
  onChangeName = newValue => {
    this.props.dispatch(storeViewActions.changeName(newValue));
  };

  onChangeSlug = newValue => {
    this.props.dispatch(storeViewActions.changeSlug(newValue));
  };

  onChangeMachineId = newValue => {
    this.props.dispatch(storeViewActions.changeMachineId(newValue));
  };

  onChangeContactPerson = newValue => {
    this.props.dispatch(storeViewActions.changeAddress_ContactPerson(newValue));
  };

  onChangeLatitude = newValue => {
    this.props.dispatch(storeViewActions.changeAddress_Latitude(newValue));
  };

  onChangeLongitude = newValue => {
    this.props.dispatch(storeViewActions.changeAddress_Longitude(newValue));
  };

  onChangeCountry = newValue => {
    this.props.dispatch(storeViewActions.changeAddress_Country(newValue));
  };

  onChangeState = newValue => {
    this.props.dispatch(storeViewActions.changeAddress_State(newValue));
  };

  onChangeCity = newValue => {
    this.props.dispatch(storeViewActions.changeAddress_City(newValue));
  };

  onChangeZip = newValue => {
    this.props.dispatch(storeViewActions.changeAddress_Zip(newValue));
  };

  onChangeStreet = newValue => {
    this.props.dispatch(storeViewActions.changeAddress_Street(newValue));
  };

  onChangePhone = newValue => {
    this.props.dispatch(storeViewActions.changeAddress_Phone(newValue));
  };

  onTriggerStatus = () => {
    this.props.dispatch(storeViewActions.triggerStatus());
  };

  onAddImage = base64file => {
    this.props.dispatch(storeViewActions.changeImage(base64file));
  };

  onDeleteImage = index => {
    this.props.dispatch(storeViewActions.changeImage(null));
  };

  changeOpenTime = (workDay, value) => {
    let newWorkDay = JSON.parse(JSON.stringify(workDay));
    newWorkDay.openTime = value;
    this.props.dispatch(storeViewActions.replaceWorkDay(newWorkDay));
  };

  changeCloseTime = (workDay, value) => {
    let newWorkDay = JSON.parse(JSON.stringify(workDay));
    newWorkDay.closeTime = value;
    this.props.dispatch(storeViewActions.replaceWorkDay(newWorkDay));
  };

  changeDayName = (workDay, value) => {
    let newWorkDay = JSON.parse(JSON.stringify(workDay));
    newWorkDay.name = value;
    this.props.dispatch(storeViewActions.replaceWorkDay(newWorkDay));
  };

  changeSpecialDate = (workDay, value) => {
    let newWorkDay = JSON.parse(JSON.stringify(workDay));
    if (value) {
      newWorkDay.specialDate = new Date(value).toISOString();
    } else newWorkDay.specialDate = null;
    newWorkDay.isDefault = false;
    this.props.dispatch(storeViewActions.replaceWorkDay(newWorkDay));
  };

  triggerDayOff = workDay => {
    let newWorkDay = JSON.parse(JSON.stringify(workDay));
    newWorkDay.isDayOff = !newWorkDay.isDayOff;
    this.props.dispatch(storeViewActions.replaceWorkDay(newWorkDay));
  };

  deleteDay = workDay => {
    this.props.dispatch(storeViewActions.deleteWorkDay(workDay));
  };

  addSpecialDay = () => {
    this.props.dispatch(storeViewActions.addSpecialDay(this.props.store.id));
  };

  render() {
    return (
      <BaseView viewName="Store" actionsProvider={storeViewActions}>
        {/* -- General-- */}
        <StoreGeneral
          store={this.props.store}
          onChangeName={this.onChangeName}
          onChangeSlug={this.onChangeSlug}
          onChangeMachineId={this.onChangeMachineId}
          onChangeWorkHours={this.onChangeWorkHours}
          onTriggerStatus={this.onTriggerStatus}
        />

        {/* -- Address -- */}
        <AddressPanel
          address={this.props.store.address || {}}
          onChangeLatitude={this.onChangeLatitude}
          onChangeLongitude={this.onChangeLongitude}
          onChangeCountry={this.onChangeCountry}
          onChangeState={this.onChangeState}
          onChangeCity={this.onChangeCity}
          onChangeZip={this.onChangeZip}
          onChangeStreet={this.onChangeStreet}
          onChangeContactPerson={this.onChangeContactPerson}
          onChangePhone={this.onChangePhone}
          caption={(
            <span>
              <span style={{marginRight: '7px'}}>Address</span>
              <span style={{color: '#999'}}>(Mobile app will not function if store information is not filled in)</span>
            </span>
          )}
        />

        {/* -- Working Hours-- */}
        <StoreWorkingHours
          WorkHours={this.props.store.WorkHours}
          changeOpenTime={this.changeOpenTime}
          changeCloseTime={this.changeCloseTime}
          triggerDayOff={this.triggerDayOff}
          changeDayName={this.changeDayName}
          changeSpecialDate={this.changeSpecialDate}
          deleteDay={this.deleteDay}
          addSpecialDay={this.addSpecialDay}
        />

        {/* -- Images-- */}
        <ImagesPanel
          allowMultipleImages={false}
          caption="Images (PNG or JPG)"
          images={this.props.store.image ? [this.props.store.image] : []}
          onDeleteImage={this.onDeleteImage}
          onAddImage={this.onAddImage}
        />
      </BaseView>
    );
  }
}

storeView_.propTypes = {
  dispatch: PropTypes.func.isRequired,

  store: storeViewRedux.IStoreView
};

function mapStateToProps(state) {
  return {
    store: state.storeView
  };
}

export const storeView = connect(mapStateToProps)(storeView_);
