import React from "react";
import PropTypes from "prop-types";
import {IProductItemView} from "../../redux/modules/productItemViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";

export class ProductItemDetails extends React.Component {
  render() {
    let categoryName = dataFuncs.categoriesAsString(
      this.props.productItem.product.categories
    );

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          Details
        </div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Product Name
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div
                    className="block-set__info--title animated"
                    style={{textTransform: "capitalize"}}
                  >
                    {this.props.productItem.product.name}
                  </div>
                </div>
              </div>
            </div>

            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Defined Product ID
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.productItem.product.id}
                  </div>
                </div>
              </div>
            </div>

            {this.props.productItem.orderId && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Order ID
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {this.props.productItem.orderId}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {this.props.productItem.lot && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  LOT ID
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {this.props.productItem.lot}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!!this.props.productItem.cutThickness && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Cut Thickness
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {this.props.productItem.cutThickness}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {this.props.productItem.marbling && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Marbling
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {dataFuncs.marblingToString(
                        this.props.productItem.marbling
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {this.props.productItem.weight && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Weight
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {this.props.productItem.weight}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {this.props.productItem.tied != null && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Tied
                </div>

                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {dataFuncs.tiedToString(this.props.productItem.tied)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {this.props.productItem.GS1 && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  GS1
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {this.props.productItem.GS1}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {this.props.productItem.position && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Position
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {JSON.stringify(this.props.productItem.position)}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
          <div className="block-set__item flex animated">
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Product Category
              </div>

              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {categoryName}
                  </div>
                </div>
              </div>
            </div>

            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Product Tags
              </div>

              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {dataFuncs.tagsAsString(
                      this.props.productItem.product.tags
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Description
              </div>

              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.productItem.product.description}
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

ProductItemDetails.propTypes = {
  productItem: IProductItemView.isRequired
};
