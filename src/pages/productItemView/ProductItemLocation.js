import React from "react";
import PropTypes from "prop-types";
import { IProductItemView } from "../../redux/modules/productItemViewRedux";

export class ProductItemLocation extends React.Component {
  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Location</div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item v2 flex animated">
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Machine ID
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.productItem.machineId}
                  </div>
                </div>
              </div>
            </div>
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Store
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">~</div>
                  <div className="block-set__info--more animated">
                    / ~
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

ProductItemLocation.propTypes = {
  productItem: IProductItemView.isRequired
};
