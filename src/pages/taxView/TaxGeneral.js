import React from "react";
import PropTypes from "prop-types";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import { IProductView } from "../../redux/modules/productViewRedux";

export class TaxGeneral extends React.Component {
  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">General (hardcoded)</div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
            {/* ---Name--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Name
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  type="text"
                  value="hardcoded"
                  onChange={() => {}}
                />
              </div>
            </div>

            {/* ---Status--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Status
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    not implemented
                  </div>
                </div>
              </div>
            </div>

            {/* ---ID--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">ID</div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    111111-1111-1111-1111-111111
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---Right Panel--- */}
          <div className="block-set__item flex animated">
            {/* ---Type--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Type
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="radio__container flex animated">
                  {/* -- checked radio button-- */}
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
                        Amount
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
                    {/* -- click remove class ".checked" from other ".radio__label's"--
                                            -- add class ".checked" this ".radio__label"-- */}
                    <label
                      className="radio__label flex animated"
                      htmlFor="r-label2"
                    >
                      <span className="radio__label--icon animated" />
                      <span className="radio__label--text animated">
                        Percentage
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* ---Value--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Value
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  type="text"
                  value="10 (hardcoded)"
                  onChange={() => {}}
                />
              </div>
            </div>

            {/* ---Date--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">ID</div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    Oct 15, 2019 (hardcoded)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TaxGeneral.propTypes = {
  
};
