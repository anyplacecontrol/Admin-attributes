import React from "react";
import PropTypes from "prop-types";

export class PromotionGeneral extends React.Component {

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">General</div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
            {/* Promotion Name */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Promotion Name
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
            {/*   Sale ID */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Sale ID
              </div>
              <div className="block-set__content flex w100 animated">
                1234567
              </div>
            </div>
          </div>

          {/* ---Right Panel--- */}
          <div className="block-set__item flex animated">
            {/*  Last Updated */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Last Updated
              </div>
              <div className="block-set__content flex w100 animated">
                Oct 10, 2021, 4:38 PM
              </div>
            </div>

            {/* Description */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Promotion Description
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

PromotionGeneral.propTypes = {};
