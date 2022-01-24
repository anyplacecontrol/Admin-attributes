import React from "react";
import PropTypes from "prop-types";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import { FAKE_CATEGORIES_RESPONSE } from "../../fakeDb/fakeCategories";
import { FAKE_PRODUCTS_RESPONSE } from "../../fakeDb/fakeProducts";
import { BundleProduct } from "./BundleProduct";

import * as dataFuncs from "../../utils/dataFuncs";

export class BundleProducts extends React.Component {
  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          Bundle Products (hardcoded)
        </div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
            {/* ---Product Category--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Product Category
              </div>
              <div className="block-set__content flex w100 animated">
                <SelectBox
                  className="w100"
                  style={{ zIndex: 3 }}
                  text={"All Categories"}
                  items={dataFuncs.createMultiSelectBoxItems(
                    FAKE_CATEGORIES_RESPONSE.items,
                    [],
                    "name",
                    "id"
                    // this.props.onChangeCategory
                  )}
                />
              </div>
            </div>

            {/* ---Product--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Product
              </div>
              <div className="block-set__content flex w100 animated">
                <SelectBox
                  className="w100"
                  style={{ zIndex: 2 }}
                  text={"All Products"}
                  items={dataFuncs.createMultiSelectBoxItems(
                    FAKE_PRODUCTS_RESPONSE.items,
                    [],
                    "name",
                    "id"
                    // this.props.onChangeProduct
                  )}
                />
              </div>
            </div>

            {/* ---Tied--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Tied
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  {this.props.status && (
                    <>
                      <div className="block-set__tumbler active animated" />
                      <div className="block-set__info--title animated">
                        {/* Enabled */}
                      </div>
                    </>
                  )}
                  {!this.props.status && (
                    <>
                      <div className="block-set__tumbler animated" />

                      <div className="block-set__info--title animated">
                        {/* Disabled */}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ---Thickness--- */}
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Thickness
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="radio flex animated">
                    <input
                      className="radio__input"
                      id="r-label1"
                      type="radio"
                      name="tax-status"
                      checked
                      readOnly
                    />
                    <label
                      className="radio__label checked flex animated"
                      htmlFor="r-label1"
                    >
                      <span className="radio__label--icon animated" />
                      <span className="radio__label--text animated">
                        1 Inch
                      </span>
                    </label>
                  </div>
                  <div className="radio flex animated">
                    <input
                      className="radio__input"
                      id="r-label2"
                      type="radio"
                      name="tax-status"
                    />
                    <label
                      className="radio__label flex animated"
                      htmlFor="r-label2"
                    >
                      <span className="radio__label--icon animated" />
                      <span className="radio__label--text animated">
                        1.5 Inch
                      </span>
                    </label>
                  </div>
                  <div className="radio flex animated">
                    <input
                      className="radio__input"
                      id="r-label2"
                      type="radio"
                      name="tax-status"
                    />
                    <label
                      className="radio__label flex animated"
                      htmlFor="r-label2"
                    >
                      <span className="radio__label--icon animated" />
                      <span className="radio__label--text animated">
                        2 Inch
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---Right Panel--- */}
          <div className="block-set__item flex animated">
            {/* ---Weight--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Weight
              </div>
              <div className="block-set__content flex w100 animated">
                <SelectBox
                  className="w100"
                  style={{ zIndex: 3 }}
                  text={"0.5 lb"}
                  items={dataFuncs.createMultiSelectBoxItems(
                    [{ name: "0.5 lb", id: "0.5" }],
                    [],
                    "name",
                    "id"
                    // this.props.onChangeCategory
                  )}
                />
              </div>
            </div>

            {/* ---Fat Level--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Fat Level
              </div>
              <div className="block-set__content flex w100 animated">
                <SelectBox
                  className="w100"
                  style={{ zIndex: 2 }}
                  text={"Medium"}
                  items={dataFuncs.createMultiSelectBoxItems(
                    [{ name: "Medium", id: "Medium" }],
                    [],
                    "name",
                    "id"
                    // this.props.onChangeCategory
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <BundleProduct />
      </div>
    );
  }
}

BundleProducts.propTypes = {
  status: PropTypes.bool
};
