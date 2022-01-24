import React from "react";
import PropTypes from "prop-types";
import * as constants from "../../consts/constants";

export class StepButtons extends React.Component {
  //-----------------------------------------------------------------------------
  render() {
    return (
      <>        
          {/* !-- Active button-- */}
          <button
            onClick={() => this.props.onChangeStep(constants.REPORT_DAILY)}
            className={
              this.props.step === constants.REPORT_DAILY
                ? "schedule__button flex is--active animated"
                : "schedule__button flex animated"
            }
          >
            Days
          </button>
          <button
            onClick={() => this.props.onChangeStep(constants.REPORT_MONTHLY)}
            className={
              this.props.step === constants.REPORT_MONTHLY
                ? "schedule__button flex is--active animated"
                : "schedule__button flex animated"
            }
          >
            Months
          </button>
          <button
            onClick={() => this.props.onChangeStep(constants.REPORT_ANNUAL)}
            className={
              this.props.step === constants.REPORT_ANNUAL
                ? "schedule__button flex is--active animated"
                : "schedule__button flex animated"
            }
          >
            Years
          </button>
        </>      
    );
  }
}

StepButtons.propTypes = {
  step: PropTypes.string.isRequired,
  onChangeStep: PropTypes.func //argument is string (period type)
};
