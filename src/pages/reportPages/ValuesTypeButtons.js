import React from "react";
import PropTypes from "prop-types";
import * as constants from "../../consts/constants";

export class ValuesTypeButtons extends React.Component {
  //-----------------------------------------------------------------------------
  render() {
    return (
      <>        
          
            {/* !-- Active button-- */}
            <button
              onClick={() =>
                this.props.onChangeValuesType(constants.REPORT_TOTAL)
              }
              className={
                this.props.valuesType === constants.REPORT_TOTAL
                  ? "schedule__button flex is--active animated"
                  : "schedule__button flex animated"
              }
            >
              Total
            </button>
            <button
              onClick={() =>
                this.props.onChangeValuesType(constants.REPORT_AVERAGE)
              }
              className={
                this.props.valuesType === constants.REPORT_AVERAGE
                  ? "schedule__button flex is--active animated"
                  : "schedule__button flex animated"
              }
            >
              Average
            </button>
            <button
              onClick={() =>
                this.props.onChangeValuesType(constants.REPORT_MEDIAN)
              }
              className={
                this.props.valuesType === constants.REPORT_MEDIAN
                  ? "schedule__button flex is--active animated"
                  : "schedule__button flex animated"
              }
            >
              Median
            </button>          
      </>
    );
  }
}

ValuesTypeButtons.propTypes = {
  valuesType: PropTypes.string.isRequired,
  onChangeValuesType: PropTypes.func //argument is string (values type)
};
