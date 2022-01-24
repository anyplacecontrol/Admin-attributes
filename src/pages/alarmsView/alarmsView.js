import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {BaseView} from "../../components/BaseView/BaseView";
import {AlarmsGeneral} from "./AlarmsGeneral";
import * as alarmsViewRedux from "../../redux/modules/alarmsViewRedux";

export class alarmsView_ extends React.Component {

  render() {
    return (
      <BaseView
        viewName="Alarm"
        actionsProvider={alarmsViewRedux.alarmsViewActions}
      >

        {/* -- General-- */}
        <AlarmsGeneral
          alarm={this.props.alarms}
        />

      </BaseView>
    );
  }
}

alarmsView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  alarms: alarmsViewRedux.IAlarmsView,
};

function mapStateToProps(state) {
  return {
    alarms: state.alarmsView,
  };
}

export const alarmsView = connect(mapStateToProps)(alarmsView_);
