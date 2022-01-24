import React from "react";
import PropTypes from "prop-types";

export class BundleDiscount extends React.Component {
  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          Bundle Discount (hardcoded)
        </div>
        <div className="block-set__inner flex w100 animated">
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
              <span className="radio__label--text animated">No Discount</span>
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
            <label className="radio__label flex animated" htmlFor="r-label2">
              <span className="radio__label--icon animated" />
              <span className="radio__label--text animated">Fixed Price</span>
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
            <label className="radio__label flex animated" htmlFor="r-label2">
              <span className="radio__label--icon animated" />
              <span className="radio__label--text animated">Percentage</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

BundleDiscount.propTypes = {};
