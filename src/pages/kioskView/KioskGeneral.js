import React from "react";
import PropTypes from "prop-types";
import { IKioskView } from "../../redux/modules/kioskViewRedux";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import * as dataFuncs from "../../utils/dataFuncs";

export class KioskGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.kiosk.id != "";

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">General</div>
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
                    !this.props.kiosk.isValidated ||
                    this.props.kiosk.inventoryNumber != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.kiosk.inventoryNumber}
                  onChange={e =>
                    this.props.onChangeInventoryNumber(e.target.value)
                  }
                />
              </div>
            </div>

            {/* Machine ID */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Machine ID
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={this.props.kiosk.machineId || ""}
                  onChange={e => this.props.onChangeMachineId(e.target.value)}
                />
              </div>
            </div>

            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Hide Sleep Screen
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  {/* -- click - toggle class "active" and change text "Yes | No" in the next ".block-set__info--title"-- */}
                  <div
                    className={
                      this.props.kiosk.hideSleepScreen
                        ? "block-set__tumbler active animated"
                        : "block-set__tumbler animated"
                    }
                    onClick={this.props.onTriggerHideSleepScreen}
                  />
                  <div className="block-set__info--title animated">
                    {this.props.kiosk.hideSleepScreen ? "Yes" : "No"} (not
                    implemented )
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
                        TODO: get from stores API and machines API
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
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {this.props.kiosk.status.name}
                      </div>
                    </div>
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
              </>
            )}
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/* Manufacturer Name */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Manufacturer Name (not implemented)
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={
                    this.props.kiosk.manufacturer &&
                    this.props.kiosk.manufacturer.name
                      ? this.props.kiosk.manufacturer.name
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
                Model Name (not implemented)
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"                 
                  value={
                    this.props.kiosk.model &&
                    this.props.kiosk.model.name
                      ? this.props.kiosk.model.name
                      : ""
                  }
                  onChange={e => this.props.onChangeModelName(e.target.value)}
                />
              </div>
            </div>

            {/* Details */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Description
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  className="block-set__text-area"
                  value={this.props.kiosk.details || ""}
                  onChange={e => this.props.onChangeDetails(e.target.value)}
                />
              </div>
            </div>

            {isEditExisting && (
              <>
                {/* Kiosk ID */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Kiosk ID
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {this.props.kiosk.id}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

              {/* Identity Preset */}
              <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Identity Preset~
              </div>
              <div className="block-set__content flex w100 animated">
                <SelectBox
                  className="w100"
                  style={{ zIndex: 2 }}
                  text={"Select"}
                  items={dataFuncs.createMultiSelectBoxItems(
                    [{ name: "Default Preset", id: "1" }],
                    [],
                    "name",
                    "id"
                    // this.props.onChangeCategory
                  )}
                  isCheckboxItems={false}
                />
              </div>
            </div>

            {/* Sleep Screen Preset */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
              Sleep Screen Preset~
              </div>
              <div className="block-set__content flex w100 animated">
                <SelectBox
                  className="w100"
                  style={{ zIndex: 1 }}
                  text={"Select"}
                  items={dataFuncs.createMultiSelectBoxItems(
                    [{ name: "Default Preset", id: "1" }],
                    [],
                    "name",
                    "id"
                    // this.props.onChangeCategory
                  )}
                  isCheckboxItems={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

KioskGeneral.propTypes = {
  kiosk: IKioskView,
  onChangeInventoryNumber: PropTypes.func.isRequired,
  onChangeMachineId: PropTypes.func.isRequired,
  onChangeManufacturerName: PropTypes.func.isRequired,
  onChangeModelName: PropTypes.func.isRequired,
  onChangeDetails: PropTypes.func.isRequired,
  onTriggerHideSleepScreen: PropTypes.func.isRequired
};
