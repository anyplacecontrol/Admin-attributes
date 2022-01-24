import React from "react";
import { IMachineView } from "../../redux/modules/machineViewRedux";
import PropTypes from "prop-types";
import * as dataFuncs from "../../utils/dataFuncs";

export class MachinesPanel extends React.Component {
  renderMachineRow = () => {
    let rowNumber = 0;
    if (!this.props.machines || this.props.machines.length === 0) {
      return null;
    }

    let jsx = [];
    while (rowNumber < 5 && rowNumber < this.props.machines.length) {
      const machine = this.props.machines[rowNumber];

      jsx.push(
        <div key={rowNumber} className="dashboard__tr flex animated">
          <div className="dashboard__td flex animated">
            <div className="dashboard__td--inner animated">
              {" "}
              {machine.name}{" "}
            </div>
          </div>
          <div className="dashboard__td flex animated">
            <div className="dashboard__td--inner animated">
              <div className="dashboard__table--info animated">
                <div className="dashboard__info--sub-title dashboard-sub-text animated">
                  {!machine.temperature
                    ? "-"
                    : machine.temperature.value + "°"}
                </div>
                {/* <img
                  className="dashboard__temperature animated"
                  src={require("../../assets/img/svg/temperature-ok.svg")}
                  alt="dashboard info temperature"
                /> */}
              </div>
            </div>
          </div>
          <div className="dashboard__td flex animated">
            <div className="dashboard__td--inner dashboard-sub-text animated">
              {machine.temperature
                ? dataFuncs.timestampToTime(machine.temperature.measuring_date)
                : "-"}
            </div>
          </div>
          <div className="dashboard__td flex animated">
            <div className="dashboard__td--inner animated">
              {machine.temperature
                ? dataFuncs.timestampToDate(machine.temperature.measuring_date)
                : "-"}
            </div>
          </div>
        </div>
      );

      rowNumber++;
    }

    return jsx;
  };

  render() {
    return (
      <>
        {/* ---Machines--- */}
        <div className="dashboard__full-info--box animated">
          <div className="dashboard__full-info--item bg-dashboard-item animated">
            <div className="dashboard__full-info--top flex animated">
              <div className="dashboard__full-info--title dashboard-h3 animated">
                Machine Temperature
              </div>
              <div className="dashboard__full-info--view flex animated">
              <a
                  className="dashboard__full-info--link pointer animated"
                  onClick={this.props.onDetailsClick}
                >
                  View Details
                </a>
              </div>
            </div>
            <div className="dashboard__table flex animated">
              <div className="dashboard__tbody flex animated">
                {this.renderMachineRow()}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

MachinesPanel.propTypes = {
  machines: PropTypes.arrayOf(IMachineView),
  onDetailsClick: PropTypes.func.isRequired
};
