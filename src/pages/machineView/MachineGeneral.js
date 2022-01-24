import React from "react";
import PropTypes from "prop-types";
import {IMachineView} from "../../redux/modules/machineViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import * as consts from "../../consts/constants";
import {SelectBox} from "../../components/SelectBox/SelectBox";
import {IStatusView} from "../../redux/modules/statusViewRedux";

export class MachineGeneral extends React.Component {

  renderStatusesSelectBox = () => {
    let itemsArr = this.props.statuses.map((status, index) => {
      return {
        text: status.name,
        onClick: () => this.props.onChangeStatus(status),
      };
    });

    let currentText = this.props.machine.status
      ? this.props.machine.status.name
      : consts.chooseStr;

    return (
      <SelectBox
        style={{zIndex: 2}}
        className="w100"
        text={currentText}
        items={itemsArr}
      />
    );
  };

  render() {
    let isEditExisting = this.props.machine.id != "";

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          General
        </div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* Inventory Number */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Inventory Number*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.machine.isValidated ||
                    this.props.machine.inventoryNumber != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.machine.inventoryNumber || ""}
                  onChange={e =>
                    this.props.onChangeInventoryNumber(e.target.value)
                  }
                />
              </div>
            </div>

            {/* Name */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Name*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.machine.isValidated ||
                    (this.props.machine.name && this.props.machine.name != "")
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.machine.name || ""}
                  onChange={e => this.props.onChangeName(e.target.value)}
                />
              </div>
            </div>

            {/* Kiosk IDs */}

            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Kiosk IDs
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {/*TODO: obtain via Kiosk API (filter by machineID)*/}
                    Not Implemented
                  </div>
                </div>
              </div>
            </div>

            {isEditExisting && (
              <>
                {/* Store ID */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Store ID
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {/*TODO: Obtain via Store API (filter by machine)*/}
                        Not Implemented
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Status
                  </div>
                  <div className="block-set__content flex w100 animated">
                    {this.renderStatusesSelectBox()}
                  </div>
                </div>

                {/* Installation Date */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Installation Date
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        Not Implemented
                      </div>
                    </div>
                  </div>
                </div>

                {/* IP Address */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    IP Address
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        Not Implemented
                      </div>
                    </div>
                  </div>
                </div>

                {/* Temperature */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    <span>Temperature</span>
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {/*{!this.props.machine.temperature ||*/}
                        {/*!this.props.machine.temperature.value*/}
                        {/*  ? "0"*/}
                        {/*  : this.props.machine.temperature.value +*/}
                        {/*  "° (" +*/}
                        {/*  dataFuncs.timestampToDateTime(*/}
                        {/*    this.props.machine.temperature.measuring_date*/}
                        {/*  ) +*/}
                        {/*  ")"}*/}
                        <a
                          className="pointer"
                          onClick={() => this.props.onTemperatureHistoryClick()}
                        >
                          View History
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sensors */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    <span>Sensors</span>
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        <a
                          className="pointer"
                          onClick={() => this.props.onSensorsHistoryClick()}
                        >
                          View History
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/* Manufacturer Name */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Manufacturer Name (emulated)
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={
                    this.props.machine.manufacturer &&
                    this.props.machine.manufacturer.name
                      ? this.props.machine.manufacturer.name
                      : ""
                  }
                  onChange={e =>
                    this.props.onChangeManufacturerName(e.target.value)
                  }
                />
              </div>
            </div>

            {/* Model Name */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Model Name (emulated)
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={
                    this.props.machine.model && this.props.machine.model.name
                      ? this.props.machine.model.name
                      : ""
                  }
                  onChange={e => this.props.onChangeModelName(e.target.value)}
                />
              </div>
            </div>

            {/* Details */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Details
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  className="block-set__text-area"
                  value={this.props.machine.details || ""}
                  onChange={e => this.props.onChangeDetails(e.target.value)}
                />
              </div>
            </div>

            {isEditExisting && (
              <>
                {/* inboundQueue */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Inbound Queue URL
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {this.props.machine.inboundQueue || ""}
                      </div>
                    </div>
                  </div>
                </div>

                {/* OutboundQueue */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Outbound Queue URL
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {this.props.machine.outboundQueue || ""}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Machine ID */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Machine ID
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {this.props.machine.id}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

MachineGeneral.propTypes = {
  machine: IMachineView,
  statuses: PropTypes.arrayOf(IStatusView).isRequired,

  onChangeInventoryNumber: PropTypes.func.isRequired,
  onChangeManufacturerName: PropTypes.func.isRequired,
  onChangeModelName: PropTypes.func.isRequired,
  onChangeDetails: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onTemperatureHistoryClick: PropTypes.func.isRequired,
  onSensorsHistoryClick: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
};
