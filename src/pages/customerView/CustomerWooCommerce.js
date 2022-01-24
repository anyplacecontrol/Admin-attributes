import React from "react";
import PropTypes from "prop-types";

export class CustomerWooCommerce extends React.Component {

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">WooCommerce Data Import (hardcoded)</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/*  WooCommerce E-commerce Username */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
               WooCommerce E-commerce User ID
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    11111111-1111-1111-1111-111111111 
                  </div>
                </div>
              </div>
            </div>

            {/*   WooCommerce Username */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                WooCommerce Username 
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    John Smith 
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/*  WooCommerce User Role */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                WooCommerce User Role
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    Customer
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

CustomerWooCommerce.propTypes = {
  
};
