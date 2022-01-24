import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {BaseView} from "../../components/BaseView/BaseView";
import {LogsGeneral} from "./LogsGeneral";
import * as logsViewRedux from "../../redux/modules/logsViewRedux";

export class logsView_ extends React.Component {
  render() {
    return (
      <BaseView
        viewName="Log"
        actionsProvider={logsViewRedux.logsViewActions}
      >

        {/* -- General-- */}
        <LogsGeneral
          log={this.props.logs}
        />

      </BaseView>
    );
  }
}

logsView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  logs: logsViewRedux.ILogsView,
};

function mapStateToProps(state) {
  return {
    logs: state.logsView,
  };
}

export const logsView = connect(mapStateToProps)(logsView_);
