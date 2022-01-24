import React from "react";
import PropTypes from "prop-types";
import { IProductItemView } from "../../redux/modules/productItemViewRedux";

export class ProductItemPricing extends React.Component {
  convertPrice = (price) => {
    return (price / 100).toFixed(2)
  }

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Pricing</div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Regular Price/LB 
              </div>

              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                  ${this.convertPrice(this.props.productItem.product.price)}
                  </div>
                </div>
              </div>
              
            </div>
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Sale Price/LB ($)
              </div>
              
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                  ~
                  </div>
                </div>
              </div>

            </div>
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Sale Price Dates
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                  ~
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="block-set__item flex animated">
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Tax Status
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                  ~
                  </div>
                </div>
              </div>
            </div>
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Tax Class
              </div>

              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                  ~
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

ProductItemPricing.propTypes = {
  productItem: IProductItemView.isRequired,  
};
