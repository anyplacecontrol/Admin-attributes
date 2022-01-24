import React from "react";
import PropTypes from "prop-types";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import * as dataFuncs from "../../utils/dataFuncs";
import { DateRangeBox } from "../../components/DateRangeBox/DateRangeBox";

export class PromotionSettings extends React.Component {
 
  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Promotion Settings</div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
            {/*  Last Updated */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Duration of Promotion
              </div>
              <div
                className="block-set__content flex w100 animated"
                style={{ zIndex: 3 }}
              >
                <DateRangeBox
                  filterItem={{
                    value: { startDate: new Date(), endDate: new Date() }
                  }}
                  onValueChange={() => {}}
                  className="filter__calendar w100r animated"
                />
              </div>
            </div>

            {/* Store */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Store
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

            {/* Category */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Category
              </div>
              <div className="block-set__content flex w100 animated">
                <SelectBox
                  className="w100"
                  style={{ zIndex: 1 }}
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

            {/* Product */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Product
              </div>
              <div className="block-set__content flex w100 animated">
                <SelectBox
                  className="w100"
                  style={{ zIndex: 0 }}
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

            {/*  Last Updated */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Discount, %
              </div>
              <div className="block-set__content flex w100 animated">
                <input className="block-set__input animated" value="40" />
              </div>
            </div>
          </div>

          {/* ---Right Panel--- */}
          <div className="block-set__item flex animated">
            {/*  empty */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated"></div>
              <div className="block-set__content flex w100 animated"></div>
            </div>
            {/*   Selected Stores */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Selected Stores
              </div>
              <div className="block-set__content flex w100 animated">5</div>
            </div>
            {/*   Selected Categories */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Selected Categories
              </div>
              <div className="block-set__content flex w100 animated">5</div>
            </div>
            {/*   Selected Products */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Selected Products
              </div>
              <div className="block-set__content flex w100 animated">5</div>
            </div>
            {/*  Require QR Code? */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Require QR Code?
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__tumbler active animated" />
                  <div className="block-set__info--title animated">Yes</div>
                </div>
              </div>
            </div>
            {/*  Generate QR Code */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                <button className="schedule__button flex animated">
                  Generate QR Code
                </button>
              </div>              
            </div>
             {/*   QR Code ID */}
             <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
              QR Code ID
              </div>
              <div className="block-set__content flex w100 animated">1294856738930</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PromotionSettings.propTypes = {};
