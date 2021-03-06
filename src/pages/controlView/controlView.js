import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as controlViewRedux from "../../redux/modules/controlViewRedux";
import { controlViewActions } from "../../redux/modules/controlViewRedux";
import { ControlTypeSelector } from "./ControlTypeSelector";
import { BaseView } from "../../components/BaseView/BaseView";
import { ControlGeneral } from "./ControlGeneral";
import { ControlValuesText } from "./ControlValuesText";

export class controlView_ extends React.Component {
  render() {
    return (
      <BaseView
        viewName="Control"
        actionsProvider={controlViewActions}
        stateSlice={this.props.control}
      >
        {/* -- ControlTypeSelector-- */}
        <ControlTypeSelector />

        {this.props.control.controlType ? (
          <>
            <ControlGeneral />
            <ControlValuesText />
          </>
        ) : null}
      </BaseView>
    );
  }
}

controlView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  control: controlViewRedux.IControlView
};

function mapStateToProps(state) {
  return {
    control: state.controlView
  };
}

export const controlView = connect(mapStateToProps)(controlView_);
