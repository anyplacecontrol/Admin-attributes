import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as controlViewRedux from "../../redux/modules/controlViewRedux";
import { controlViewActions } from "../../redux/modules/controlViewRedux";
import { ControlTypeSelector } from "./ControlTypeSelector";
import { BaseView } from "../../components/BaseView/BaseView";
import { ControlGeneral } from "./ControlGeneral";
import { RangeButtons } from "./valuesText/RangeButtons";

export class controlView_ extends React.Component {
  onChangeLanguage = lang => {
    this.props.dispatch(controlViewActions.changeLanguage(lang));
  };

  render() {
    return (
      <BaseView
        viewName="Control"
        actionsProvider={controlViewActions}
        stateSlice={this.props.control}
      >
        {/* -- ControlTypeSelector-- */}
        <ControlTypeSelector />

        {this.props.control.controlType ? <ControlGeneral /> : null}

        {this.props.control.controlType === "rangeButtons" ? (
          <RangeButtons onChangeLanguage={this.onChangeLanguage} />
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
