import React from "react";
import * as mobileOrderViewActions from "../../redux/modules/mobileOrderViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import PropTypes from "prop-types";
import {IProductView} from "../../redux/modules/productViewRedux";

export class MobileOrderProducts extends React.Component {
  getTotalQty = () => {
    return this.props.order.web_products.length;
  };

  getTotalTaxAmount = () => {
    let taxes = this.props.order.taxes;
    if (!taxes || taxes.length === 0) return 0;
    let result = 0;
    for (let i = 0; i < taxes.length; i++) {
      result = result + taxes[i].amount;
    }
    return dataFuncs.convertPrice(result);
  };

  getTotalCost = () => {
    let totalCost = this.props.order.grandTotal;
    return totalCost || 0;
  };

  getSubTotal = () => {
    let subTotal = this.props.order.total;
    return subTotal ? dataFuncs.convertPrice(subTotal) : 0;
  };

  getDiscountCoupon = () => {
    let discountCoupon = this.props.order.discountCoupon;
    return discountCoupon ? this.props.order.discountCoupon.amount : 0;
  };

  getDiscountLoyaltyCard = () => {
    let discountLoyaltyCard = this.props.order.discountLoyaltyCard;
    return discountLoyaltyCard
      ? this.props.order.discountLoyaltyCard.amount
      : 0;
  };

  getTotalDiscount = () => {
    let discountCoupon = this.getDiscountCoupon();
    let discountLoyaltyCard = this.getDiscountLoyaltyCard();
    return discountCoupon + discountLoyaltyCard;
  };

  renderRows = () => {
    return this.props.order.web_products.map((web_product, index) => {
      let product = {price:0, name: "Unknown", categories: [], tags: []};
      for (let i=0; i<this.props.allProducts.length; i++) {
        if (this.props.allProducts[i].id === web_product.productId) {
          product = this.props.allProducts[i];
        }
      }

      return (
        <div
          key={index}
          className="product__table--tr flex animated"
          style={{ textTransform: "capitalize" }}
        >
          {/* -- add class ".v2"-- */}
          <div className="name v2 animated">
            <div className="product__item flex animated">
              {product.images &&
                product.images.length > 0 &&
                product.images[0].src && (
                  <img
                    className="product__image animated"
                    src={product.images[0].src}
                    alt="product image"
                  />
                )}

              {(!product.images ||
                product.images.length == 0) && (
                <div className="product__image animated" />
              )}

              <div className="product__info flex animated">
                <a className="product__title animated" href="">
                  {product.name}
                </a>
                {web_product.weight && (
                  <div className="product__info--item animated">
                    Weight Id: {web_product.weight}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="category animated">
            <div className="product__table--td animated">
              {dataFuncs.categoriesAsString(product.categories)}
            </div>
          </div>
          <div className="tag animated">
            <div className="product__table--td animated">
              {dataFuncs.tagsAsString(product.tags)}
            </div>
          </div>

          <div className="price animated">
            <div className="product__table--td animated">
              {/*${dataFuncs.withCoins(product.price)}*/}
              ${dataFuncs.getProductItemPrice(product)}
            </div>
          </div>

        </div>
      );
    });
  };

  render() {
    let discountCoupon = dataFuncs.withCoins(
      dataFuncs.convertPrice(this.getDiscountCoupon())
    );
    let discountLoyaltyCard = dataFuncs.withCoins(
      dataFuncs.convertPrice(this.getDiscountLoyaltyCard())
    );
    let subTotal = dataFuncs.withCoins(this.getSubTotal());
    let totalDiscount = dataFuncs.withCoins(
      dataFuncs.convertPrice(this.getTotalDiscount())
    );
    let totalTaxAmount = dataFuncs.withCoins(this.getTotalTaxAmount());
    let totalCost = dataFuncs.withCoins(this.getTotalCost());

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Order Products</div>
        {/* -- add class ".no-padding"-- */}
        <div className="block-set__inner flex w100 no-padding animated">
          <div className="product__table animated">
            <div className="product__table--inner flex animated">
              <div className="product__table--thead animated">
                <div className="product__table--tr main flex animated">
                  {/* -- add class ".v2"-- */}
                  <div className="name v2 animated">
                    <div className="product__table--td animated">Product</div>
                  </div>
                  <div className="category animated">
                    <div className="product__table--td animated">Category</div>
                  </div>
                  <div className="tag animated">
                    <div className="product__table--td animated">Tag</div>
                  </div>
                  <div className="price animated">
                    <div className="product__table--td animated">Price per Lb</div>
                  </div>

                </div>
                {this.renderRows()}
              </div>
            </div>
          </div>
        </div>
        <div className="block-set__bottom flex w100 animated">
          <div className="block-set__bottom--box order-machine flex animated">
            <div className="order__info flex animated">
              <div className="order__info--item flex animated">
                <div className="order__info--title animated">ID</div>
                <div className="order__info--value animated">
                  {this.props.order.id}
                </div>
              </div>
              <div className="order__info--item flex animated">
                <div className="order__info--title animated">Platform</div>
                <div className="order__info--value animated">
                  {this.props.order.created_via}
                </div>
              </div>
              <div className="order__info--item flex animated">
                <div className="order__info--title animated">Total Qty</div>
                <div className="order__info--value animated">
                  {this.getTotalQty()}
                </div>
              </div>
            </div>
          </div>
          <div className="block-set__bottom--box order-discount flex animated">
            <div className="order__info flex animated">
              <div className="order__info--item flex animated">
                <div className="order__info--title animated">
                  Loyalty Club Membership
                </div>
                <div className="order__info--value animated">
                  ${discountLoyaltyCard}
                </div>
              </div>
              <div className="order__info--item flex animated">
                <div className="order__info--title animated">
                  Coupon Discount
                </div>
                <div className="order__info--value animated">
                  ${discountCoupon}
                </div>
              </div>
              <div className="order__info--item flex animated">
                <div className="order__info--title animated">Subtotal</div>
                <div className="order__info--value animated">${subTotal}</div>
              </div>
            </div>
          </div>
          <div className="block-set__bottom--box order-summary flex animated">
            <div className="order__info flex animated">
              <div className="order__info--item flex animated">
                <div className="order__info--title animated">
                  Total Tax Amount:
                </div>
                <div className="order__info--value animated">
                  ${totalTaxAmount}
                </div>
              </div>
              <div className="order__info--item flex animated">
                <div className="order__info--title animated">
                  Total Discount:
                </div>
                <div className="order__info--value animated">
                  ${totalDiscount}
                </div>
              </div>
              <div className="order__info--item flex animated">
                <div className="order__info--title animated">Total Cost:</div>
                <div className="order__info--value animated">
                  ${dataFuncs.convertPrice(totalCost)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MobileOrderProducts.propTypes = {
  order: mobileOrderViewActions.IMobileOrderView.isRequired,
  allProducts: PropTypes.arrayOf(IProductView),
};
