import React from "react";
import PropTypes from "prop-types";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import * as dataFuncs from "../../utils/dataFuncs";

export class SleepScreenGeneral extends React.Component {
  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">General</div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
            {/* Sleep Screen Name */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Sleep Screen Name
              </div>
              <div className="block-set__content flex w100 animated">
                <input className="block-set__input animated" value="" />
              </div>
            </div>
            {/* Status */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Status
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__tumbler active animated" />
                  <div className="block-set__info--title animated">Active</div>
                </div>
              </div>
            </div>
            {/* Sleep Screen ID */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Sleep Screen ID
              </div>
              <div className="block-set__content flex w100 animated">
                1234567
              </div>
            </div>
            {/* Kiosk */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Kiosk
              </div>
              <div className="block-set__content flex w100 animated">
                <SelectBox
                  className="w100"
                  style={{ zIndex: 2 }}
                  text={"Select"}
                  items={dataFuncs.createMultiSelectBoxItems(
                    [{ name: "All", id: "0923834" }],
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

          {/* ---Right Panel--- */}
          <div className="block-set__item flex animated">
            {/*  Selected Kiosks */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Selected Kiosks
              </div>
              <div className="block-set__content flex w100 animated">
                5 kiosks
              </div>
            </div>

            {/*  Date */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
              Date
              </div>
              <div className="block-set__content flex w100 animated">
                Oct 10, 2021, 4:38 PM
              </div>
            </div>

            {/* Description */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Description
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea className="block-set__text-area" value="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SleepScreenGeneral.propTypes = {};
