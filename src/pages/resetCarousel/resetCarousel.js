import React from "react";
import * as consts from "../../consts/constants";
import {fetchJSON} from "../../utils/fetchUtils.js";
import {SelectBox} from "../../components/SelectBox/SelectBox";
import * as machinesApi from "../../api/machinesApi";

export class resetCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.initMachines();

    this.state = {
      machine: {},
      machines: [],
      refreshStatusText: '',
      rescanStatusText: '',
    };
  }

  initMachines = async () => {
    const machines = await machinesApi.getItems();
    this.setState({
      machines: machines.items,
    });
  };

  onChangeMachine = (item) => {
    this.setState({
      machine: item,
    });
  };

  onRescanButtonClick = async () => {
    this.setState({
      rescanStatusText: "Please wait...",
    });

    const response = await fetchJSON(
      `https://${consts.apiDomain}/machines_api/rescan`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          machineId: this.state.machine.id,
        })
      }
    );

    this.setState({
      rescanStatusText: "Rescan success!",
    });
  };

  onRefreshButtonClick = async () => {
    this.setState({
      refreshStatusText: "Please wait...",
    });

    const response = await fetchJSON(
      `https://${consts.apiDomain}/machines_api/refresh`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    this.setState({
      refreshStatusText: "Refresh success!",
    });
  };

  renderMachinesSelectBox = () => {
    let itemsArr = [];
    const machines = this.state.machines;

    for (let i = 0; i < machines.length; i++) {
      itemsArr.push({
        id: machines[i].id,
        text: machines[i].name,
        onClick: () => this.onChangeMachine(machines[i]),
      });
    }

    let currentText;
    if (this.state.machine.hasOwnProperty('name')) {
      currentText = this.state.machine.name;
    } else {
      currentText = 'Choose machine...';
    }

    return (
      <SelectBox
        style={{zIndex: 1}}
        className="w100"
        text={currentText}
        items={itemsArr}
      />
    );
  };

  render() {
    return (
      <div className="block-set__box flex animated">

        <div className="block-set__title animated">
          General
        </div>

        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__content flex w100 animated">
                {this.renderMachinesSelectBox()}
              </div>
            </div>
            <div className="block-set__item--inner flex w100 animated">
              <button
                className="buttons__main button--cancel animated"
                onClick={this.onRescanButtonClick}
              >
                Rescan
              </button>
            </div>
            <span className="mt-10">{this.state.rescanStatusText}</span>
          </div>

          {window.authEmail !== 'bheigl@cerestechnologies.com' && (
            <div className="block-set__item flex animated">
              <div className="block-set__sub-title flex w100 animated mt-20">
                Inventory Refresh
              </div>
              <div className="block-set__item--inner flex w100 animated">
                <button
                  className="buttons__main button--cancel animated"
                  onClick={this.onRefreshButtonClick}
                >
                  Refresh
                </button>
                <span style={{margin: '12px 0 0 25px', fontSize: '16px'}}>
                  Do not touch, if not sure
                </span>
              </div>
              <span className="mt-10">{this.state.refreshStatusText}</span>
            </div>
          )}

        </div>
      </div>

    );
  }
}

resetCarousel.propTypes = {};
