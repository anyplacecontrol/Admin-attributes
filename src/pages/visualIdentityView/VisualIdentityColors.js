import React from "react";
import PropTypes from "prop-types";

export class VisualIdentityColors extends React.Component {
  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Colors</div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
            {/* Header Background */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Header Background
              </div>
              <div className="block-set__content flex w100 animated">
                <input className="block-set__input animated" value="#2F3D57" />
              </div>
            </div>
            {/* Footer Background */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Footer Background
              </div>
              <div className="block-set__content flex w100 animated">
                <input className="block-set__input animated" value="#2F3D57" />
              </div>
            </div>
            {/* Dark Background */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Dark Background
              </div>
              <div className="block-set__content flex w100 animated">
                <input className="block-set__input animated" value="#2F3D57" />
              </div>
            </div>
            {/* Light Background */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Light Background
              </div>
              <div className="block-set__content flex w100 animated">
                <input className="block-set__input animated" value="#2F3D57" />
              </div>
            </div>
            {/* Primar  Text Color */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Primar Text Color
              </div>
              <div className="block-set__content flex w100 animated">
                <input className="block-set__input animated" value="#2F3D57" />
              </div>
            </div>
          </div>

          {/* ---Right Panel--- */}
          <div className="block-set__item flex animated">
            {/* Secondary Text Color */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Secondary Text Color
              </div>
              <div className="block-set__content flex w100 animated">
                <input className="block-set__input animated" value="#2F3D57" />
              </div>
            </div>

            {/* Additional Text Color */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Additional Text Color
              </div>
              <div className="block-set__content flex w100 animated">
                <input className="block-set__input animated" value="#2F3D57" />
              </div>
            </div>

            {/* Primary Button Color */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Primary Button Color
              </div>
              <div className="block-set__content flex w100 animated">
                <input className="block-set__input animated" value="#2F3D57" />
              </div>
            </div>

             {/* Secondary Button Color */}
             <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Secondary Button Color
              </div>
              <div className="block-set__content flex w100 animated">
                <input className="block-set__input animated" value="#2F3D57" />
              </div>
            </div>

            {/* Additional Button Color */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
              Additional Button Color
              </div>
              <div className="block-set__content flex w100 animated">
                <input className="block-set__input animated" value="#2F3D57" />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

VisualIdentityColors.propTypes = {};
