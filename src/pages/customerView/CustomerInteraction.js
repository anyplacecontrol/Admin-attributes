import React from "react";
import PropTypes from "prop-types";

export class CustomerInteraction extends React.Component {

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Interaction Information (hardcoded)</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/*  Called Shop */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Called Shop
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    12345678 (hardcoded)
                  </div>
                </div>
              </div>
            </div>

            {/*   Wrote to Customer */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Wrote to Customer
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    No (hardcoded)
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/*  Loyalty Points */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Interacted with Help Chat
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

CustomerInteraction.propTypes = {
  
};
