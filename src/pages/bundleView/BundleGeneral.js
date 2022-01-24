import React from "react";
import PropTypes from "prop-types";

export class BundleGeneral extends React.Component {
  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">General (hardcoded)</div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
            {/* ---Bundle Name--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Bundle Name
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  type="text"
                  value="Barbecue Set"
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
                  {this.props.status && (
                    <>
                      <div className="block-set__tumbler active animated" />
                      <div className="block-set__info--title animated">
                        Enabled
                      </div>
                    </>
                  )}
                  {!this.props.status && (
                    <>
                      <div className="block-set__tumbler animated" />

                      <div className="block-set__info--title animated">
                        Disabled
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ---Right Panel--- */}
          <div className="block-set__item flex animated">

            {/* ---Date--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Date
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    Oct 10, 2019
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

BundleGeneral.propTypes = {
  status: PropTypes.bool
};
