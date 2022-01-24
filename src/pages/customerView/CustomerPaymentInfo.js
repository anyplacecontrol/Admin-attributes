import React from "react";
import { IPaymentInfo } from "../../redux/modules/customerViewRedux";

export class CustomerPaymentInfo extends React.Component {
  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
         Payment Information (Emulated)
        </div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/*  Used Apple Pay */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Used Apple Pay
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.paymentInfo.usedApplePay ? "Yes":"No"}
                  </div>
                </div>
              </div>
            </div>

            {/*  Used Android Pay */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Used Android Pay
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.paymentInfo.usedAndroidPay ? "Yes":"No"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/*  Used EBT */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Used EBT
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.paymentInfo.usedEBT ? "Yes":"No"}
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

CustomerPaymentInfo.propTypes = {
  paymentInfo: IPaymentInfo
};
