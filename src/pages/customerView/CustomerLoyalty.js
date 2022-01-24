import React from "react";
import PropTypes from "prop-types";
import { ILoyaltyInfo } from "../../redux/modules/customerViewRedux";

export class CustomerLoyalty extends React.Component {
  renderList = strArr => {
    if (!strArr || strArr.length === 0) return null;
    return strArr.map((value, index) => {
      return (
        <div key={index}>
          {value} <br />
        </div>
      );
    });
  };

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Coupons and Loyalty (Emulated)</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/*  Loyalty Program Token or Identifier */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Loyalty Program Token or Identifier
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.loyaltyInfo.loyaltyToken}
                  </div>
                </div>
              </div>
            </div>

            {/*  Loyalty Program Token or Identifier */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Non-Loyalty Coupons Offered
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.renderList(this.props.loyaltyInfo.couponsOffered)}
                  </div>
                </div>
              </div>
            </div>

            {/*  Loyalty Program Token or Identifier */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Non-Loyalty Coupons Redeemed
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.renderList(this.props.loyaltyInfo.couponsRedeemed)}
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
                Loyalty Points
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.loyaltyInfo.loyaltyPoints}
                  </div>
                </div>
              </div>
            </div>

            {/*  Loyalty Offers Made */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Loyalty Offers Made
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.loyaltyInfo.LoyaltyOffersMade}
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

CustomerLoyalty.propTypes = {
  loyaltyInfo: ILoyaltyInfo
};
