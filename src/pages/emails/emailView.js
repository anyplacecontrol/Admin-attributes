import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import * as emailViewRedux from "../../redux/modules/emailViewRedux";
import { BaseView } from "../../components/BaseView/BaseView";
import { EmailGeneral } from "./EmailGeneral";
import { EmailItem } from "./EmailItem";

export class emailView_ extends React.Component {
  onChangeFilterValue = () => {};

  onValueChange = (filterItem, newValue) => {
    this.onChangeFilterValue(filterItem, newValue);
  };

  setStartDate = () => {};

  render() {
    return (
      <BaseView
        viewName="Email"
        // actionsProvider={emailViewRedux.emailViewActions}
      >
        <EmailItem />
        {/* -- Block set-- */}
        <EmailGeneral
          filterItems={{
            apiParamName: "period",
            type: "advancedDateRange",
            defaultValue: {
              endDate: null,
              startDate: null
            },
            labelText: "Period",
            value: {
              endDate: null,
              startDate: null
            }
          }}
          onChangeFilterValue={this.onChangeFilterValue}
          startDate={new Date()}
          setStartDate={this.setStartDate}
        />
      </BaseView>
    );
  }
}

emailView_.propTypes = {
  dispatch: PropTypes.func.isRequired
  // email: emailViewRedux.IemailView.isRequired,
};

function mapStateToProps(state) {
  return {
    email: state.emailView
  };
}

export const emailView = connect(mapStateToProps)(emailView_);
