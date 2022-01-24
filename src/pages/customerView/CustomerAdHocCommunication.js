import React from "react";
import PropTypes from "prop-types";

export class CustomerAdHocCommunication extends React.Component {

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Ad-Hoc Communication Preferences (hardcoded)</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/*  Phone */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
               Phone
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    Yes (hardcoded)
                  </div>
                </div>
              </div>
            </div>

            {/*   Email */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
               Email
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    Yes (hardcoded)
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/*  Text */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Text
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    Yes (hardcoded)
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

CustomerAdHocCommunication.propTypes = {
  
};
