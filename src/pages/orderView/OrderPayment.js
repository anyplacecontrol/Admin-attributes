import React from "react";
import * as orderViewActions from "../../redux/modules/orderViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import PropTypes from "prop-types";

export class OrderPayment extends React.Component {
  convertPrice = price => {
    return (price / 100).toFixed(2);
  };

  getCardType = () => {
    if (
      this.props.order.paymentInformation &&
      this.props.order.paymentInformation.RStream &&
      this.props.order.paymentInformation.RStream.TranResponse &&
      this.props.order.paymentInformation.RStream.TranResponse.CardType
    )
      return this.props.order.paymentInformation.RStream.TranResponse.CardType
        ._text;
    else return "Card Type";
  };

  getTerminalID = () => {
    if (
      this.props.order.paymentInformation &&
      this.props.order.paymentInformation.RStream &&
      this.props.order.paymentInformation.RStream.TranResponse &&
      this.props.order.paymentInformation.RStream.TranResponse.TerminalID
    )
      return this.props.order.paymentInformation.RStream.TranResponse.TerminalID
        ._text;
    else return "Unavailable";
  };

  getRefNo = () => {
    if (
      this.props.order.paymentInformation &&
      this.props.order.paymentInformation.RStream &&
      this.props.order.paymentInformation.RStream.TranResponse &&
      this.props.order.paymentInformation.RStream.TranResponse.RefNo
    )
      return this.props.order.paymentInformation.RStream.TranResponse.RefNo
        ._text;
    else return "Unavailable";
  };

  getInvoiceNo = () => {
    if (
      this.props.order.paymentInformation &&
      this.props.order.paymentInformation.RStream &&
      this.props.order.paymentInformation.RStream.TranResponse &&
      this.props.order.paymentInformation.RStream.TranResponse.InvoiceNo
    )
      return this.props.order.paymentInformation.RStream.TranResponse.InvoiceNo
        ._text;
    else return "Unavailable";
  };

  getCardNumber = () => {
    let regex = "\\d{4}$";
    if (
      this.props.order.paymentInformation &&
      this.props.order.paymentInformation.RStream &&
      this.props.order.paymentInformation.RStream.TranResponse &&
      this.props.order.paymentInformation.RStream.TranResponse.AcctNo
    )
      return "...." + this.props.order.paymentInformation.RStream.TranResponse.AcctNo._text.match(
        regex
      )[0];
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
              ${this.convertPrice(this.props.order.total)}
            </div>
            {this.renderOrderStatus()}
          </div>
          <div className="block-set__right flex">
          </div>
        </div>
        <div className="block-set__bottom flex w100 animated">
          <div className="block-set__bottom--box order-machine flex animated">
            <div className="order__info flex animated">
              <div className="order__info--item flex animated">
                <div className="order__payment--title animated">
                  Date
                </div>
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
                <div className="order__payment--title animated">
                  Customer
                </div>
                {/* -- add class ".gold"-- */}
                <div className="order__payment--value gold animated">
                  ~
                </div>
                <div className="order__payment--item v2 animated">
                  <div className="order__payment--title animated">
                    {this.getCardType()}
                  </div>
                  {/* -- add class ".flex" and ".v2"-- */}
                  <div className="order__payment--value flex v2 animated">
                    <img
                      className="order__payment--icon"
                      src={require("../../assets/img/del/card.png")}
                      alt="card icon"
                    />
                    <div className="order__payment--text animated">
                      {this.getCardNumber()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="block-set__bottom--box order-summary flex animated">
            <div className="order__info flex animated">
              <div className="order__info--item flex animated">
                <div className="order__payment--title animated">
                  Invoice No
                </div>
                <div className="order__payment--value animated">
                  {this.getInvoiceNo()}
                </div>
              </div>
              <div className="order__payment--item v2 animated">
                <div className="order__payment--title animated">
                  Terminal ID
                </div>
                <div className="order__payment--value animated">
                  {this.getTerminalID()}
                </div>
              </div>
              <div className="order__payment--item v2 animated">
                <div className="order__payment--title animated">
                  Ref No
                </div>
                <div className="order__payment--value animated">
                  {this.getRefNo()}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

OrderPayment.propTypes = {
  order: orderViewActions.IOrderView,
};
