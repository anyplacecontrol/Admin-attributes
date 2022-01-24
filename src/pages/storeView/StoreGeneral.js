import React from "react";
import PropTypes from "prop-types";
import {IStoreView} from "../../redux/modules/storeViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";

export class StoreGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.store.id != "";

    let isEnabled = false;
    let tumblerCls = "block-set__tumbler animated";
    if (
      this.props.store.status &&
      this.props.store.status.name === "active"
    ) {
      isEnabled = true;
      tumblerCls = "block-set__tumbler active animated";
    }

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          General
        </div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">

            {/* Name */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Name*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.store.isValidated ||
                    this.props.store.name != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.store.name || ""}
                  onChange={e => this.props.onChangeName(e.target.value)}
                />
              </div>
            </div>

            {isEditExisting && (
              <>
                {/* Creation Date */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Creation Date
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {dataFuncs.truncateDate(this.props.store.createdAt)}
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
                      {/* -- click - toggle class "active" and change text "Yes | No" in the next ".block-set__info--title"-- */}
                      <div
                        className={tumblerCls}
                        onClick={() => this.props.onTriggerStatus()}
                      />
                      <div className="block-set__info--title animated">
                        {isEnabled ? "Active" : "Disabled"}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">

            {/* Machine ID */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Machine ID
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  placeholder={'Not needed for mobile testing'}
                  value={this.props.store.machineId || ""}
                  onChange={e => this.props.onChangeMachineId(e.target.value)}
                />
              </div>
            </div>

            {isEditExisting && (
              <>
                {/* ID */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Store ID
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {this.props.store.id}
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

StoreGeneral.propTypes = {
  store: IStoreView,
  onChangeName: PropTypes.func.isRequired,
  onChangeSlug: PropTypes.func.isRequired,
  onChangeMachineId: PropTypes.func.isRequired,
  onTriggerStatus: PropTypes.func.isRequired
};
