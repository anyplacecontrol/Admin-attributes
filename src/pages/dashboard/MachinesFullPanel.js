import React from "react";
import {IMachineView} from "../../redux/modules/machineViewRedux";
import PropTypes from "prop-types";
import * as dataFuncs from "../../utils/dataFuncs";
import {IMachineSensor} from "../../redux/modules/dashboardRedux";

export class MachinesFullPanel extends React.Component {

  sensors =  [
    'Shelf_1_Temp',
    'Shelf_2_Temp',
    'Shelf_3_Temp',
    'Shelf_4_Temp',
    'Shelf_5_Temp',
    'Shelf_6_Temp',
    'Shelf_7_Temp',
    'Shelf_8_Temp',
  ];

  renderMachineTemperatureRow = (machine) => {
    let jsx = [];

    for (let i in this.sensors) {
      const sensorData = this.props.machinesSensors
        .find(o => (o.machine === machine.id && o.sensorType === this.sensors[i]));

      let temperature = '---';
      if (sensorData && sensorData.temperature !== '---') {
        temperature = (
          <span>
            <strong style={{marginRight: '5px'}}>
              {sensorData.temperature}°
            </strong>
            <em style={{fontSize: '.9rem'}}>
              ({sensorData.dateStr})
            </em>
          </span>
        );
      }

      jsx.push(
        <div key={"temperature" + i} className="dashboard__td temperature-cell animated">
          <div className="dashboard__td--inner animated">
            <div className="dashboard__table--info animated">
              <div className="dashboard__info--sub-title dashboard-sub-text animated">
                {temperature}
              </div>
              {/* <img
                  className="dashboard__temperature animated"
                  src={require("../../assets/img/svg/temperature-ok.svg")}
                  alt="dashboard info temperature"
                /> */}
            </div>
          </div>
        </div>
      );
    }

    return jsx;
  };

  renderMachineValuesRows = () => {
    let rowNumber = 0;
    if (!this.props.machines || this.props.machines.length === 0) {
      return null;
    }

    let jsx = [];

    while (rowNumber < 5 && rowNumber < this.props.machines.length) {
      let machine = this.props.machines[rowNumber];

      jsx.push(
        <div key={"row" + rowNumber} className="dashboard__tr animated">
          <div className="dashboard__td animated">
            <div className="dashboard__td--inner animated">
              {machine.name
                ? dataFuncs.truncateString(machine.name, 25)
                : ""}
            </div>
          </div>

          {this.renderMachineTemperatureRow(machine)}

        </div>
      );

      rowNumber += 1;
    }

    return jsx;
  };


  renderMachineTemperatureTitleRow = () => {
    let jsx = [];

    for (let i in this.sensors) {
      jsx.push(
        <div key={"temperature-title" + i} className="dashboard__td temperature-cell animated">
          <div className="dashboard__td--inner animated">
            <div className="dashboard__table--info animated">
              <div className="dashboard__info--sub-title dashboard-sub-text font-bold animated">
                {this.sensors[i]}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return jsx;
  };

  renderMachineTitlesRows = () => {
    if (!this.props.machines || this.props.machines.length === 0) {
      return null;
    }

    let jsx = [];

    jsx.push(
      <div className="dashboard__tr animated">
        <div className="dashboard__td animated">
          <div className="dashboard__td--inner font-bold animated">
            Machine
          </div>
        </div>

        {this.renderMachineTemperatureTitleRow()}
      </div>
    );

    return jsx;
  };

  render() {
    return (
      <>
        {/* ---Machines--- */}
        <div className="dashboard-full-panel dashboard__full-info--box animated">
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

            <div className="dashboard__block">
              <div className="dashboard__table animated">
                <div className="dashboard__tbody animated">
                  {this.renderMachineTitlesRows()}
                </div>
              </div>
              <div className="dashboard__table animated">
                <div className="dashboard__tbody animated">
                  {this.renderMachineValuesRows()}
                </div>
              </div>
            </div>

          </div>
        </div>
      </>
    );
  }
}

MachinesFullPanel.propTypes = {
  machines: PropTypes.arrayOf(IMachineView),
  machinesSensors: PropTypes.arrayOf(IMachineSensor),
  onDetailsClick: PropTypes.func.isRequired
};
