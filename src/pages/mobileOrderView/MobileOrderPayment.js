import React from "react";
import * as mobileOrderViewActions from "../../redux/modules/mobileOrderViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import PropTypes from "prop-types";

export class MobileOrderPayment extends React.Component {
  // convertPrice = price => {
  //   return (price / 100).toFixed(2);
  // };

  getCardNumber = () => {
    if (this.props.order.credit_card)
      return "...." + this.props.order.credit_card;
    else return "Unavailable";
  };

  renderOrderStatus = () => {
    if (!this.props.order.status) {
      return <div className="order__status animated">Unknown Status</div>;
    }

    let clsName;

    switch (this.props.order.status.name) {
      case "complete":
      case "delivered":
      case "pickUp":
      case "payed":
        clsName = "completed";
        break;

      case "in_progress":
        clsName = "expired";
        break;

      case "cancelled":
        clsName = "sold";
        break;

      case "refunded":
        clsName = "refunded";
        break;

      default:
        clsName = "";
    }

    return (
      <div className={"order__status " + clsName + " animated"}>
        {this.props.order.status.name}
      </div>
    );
  };

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          Payment
        </div>
        {/* -- add class ".v2"-- */}
        <div className="block-set__inner flex w100 v2 animated">
          <div className="block-set__left flex">
            <div className="order__main-price animated">
              <input
                className="filter__input mobile-order__total animated"
                type="text"
                placeholder="9.99"
                value={this.props.order.total}
                onChange={e =>
                  this.props.onChangeTotal(e.target.value)
                }
              />
            </div>
            {this.renderOrderStatus()}
          </div>
          <div className="block-set__right flex">
            {this.props.order.created_via != "kiosk" && (
              <div>
                <button
                  className="payment-button animated"
                  type="button"
                  onClick={() => this.props.readyInStore()}
                >
                  Ready in Store
                </button>
                <button
                  className="payment-button animated"
                  type="button"
                  onClick={() => this.props.closeOrder()}
                >
                  Save & Close Order
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="block-set__bottom flex w100 animated">
          <div className="block-set__bottom--box order-machine flex animated">
            <div className="order__info flex animated">
              <div className="order__info--item flex animated">
                <div className="order__payment--title animated">Date</div>
                <div className="order__payment--value animated">
                  {dataFuncs.truncateDate(this.props.order.date_paid)}
                  {dataFuncs.getGmtTimeFormat(this.props.order.date_paid)}
                </div>
              </div>
            </div>
          </div>
          <div className="block-set__bottom--box order-discount flex animated">
            <div className="order__info flex animated">
              <div className="order__info--item flex animated">
                <div className="order__payment--title animated">User ID</div>
                {/* -- add class ".gold"-- */}
                <div className="order__payment--value gold animated">
                  {this.props.order.userId}
                </div>
                <br/>
                <br/>
                <div className="order__payment--title animated">Card</div>
                {/* -- add class ".gold"-- */}
                <div className="order__payment--value gold animated">
                  {this.getCardNumber()}
                </div>
                <br/>
                <br/>
                <div className="order__payment--title animated">Comments</div>
                {/* -- add class ".gold"-- */}

                <div className="mobile-order block-set__content flex mt-10 w100 animated">
                  <textarea
                    className="block-set__text-area"
                    value={this.props.order.comments || ""}
                    onChange={e =>
                      this.props.onChangeDescription(e.target.value)
                    }
                  />
                  <button
                    className="payment-button mt-10 animated"
                    onClick={() => this.props.saveComments()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>


          <div className="block-set__bottom--box order-summary flex animated">
            <div className="order__info flex animated">
              <div className="order__info--item flex animated">
                <div className="order__payment--title animated">
                  Transaction Id
                </div>
                <div className="order__payment--value animated">
                  {this.props.order.transactionId}
                </div>
              </div>
              <div className="order__payment--item v2 animated">
                <div className="order__payment--title animated">
                  Pay in Store
                </div>
                <div className="order__payment--value animated">
                  {this.props.order.payInStore ? "Yes" : "No"}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
}

MobileOrderPayment.propTypes = {
  order: mobileOrderViewActions.IMobileOrderView,
  readyInStore: PropTypes.func,
  closeOrder: PropTypes.func,
  onChangeDescription: PropTypes.func,
  onChangeTotal: PropTypes.func,
  saveComments: PropTypes.func
};
