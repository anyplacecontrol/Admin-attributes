import React from "react";
import PropTypes from "prop-types";
import {IProductItemView} from "../../redux/modules/productItemViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";

export class ProductItemGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.productItem.id != "";
    let tumblerCls = this.props.productItem.forbiddenToSell
      ? "block-set__tumbler active animated"
      : "block-set__tumbler animated";

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          General
        </div>
        <div className="block-set__inner flex w100 animated">

          <div className="block-set__item flex animated">
            {isEditExisting && (
              <>
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Cloud ID
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {this.props.productItem.id}
                      </div>
                    </div>
                  </div>
                </div>

                {this.props.productItem.carrierId && (
                  <div className="block-set__item--inner flex w100 animated">
                    <div className="block-set__sub-title flex w100 animated">
                      Carrier ID
                    </div>
                    <div className="block-set__content flex w100 animated">
                      <div className="block-set__info flex animated">
                        <div className="block-set__info--title animated">
                          {this.props.productItem.carrierId}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Production Date
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {dataFuncs.truncateDate(
                          this.props.productItem.production_date
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Forbidden To Sell
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div
                        className={tumblerCls}
                        onClick={() => this.props.onTriggerForbiddenToSell()}
                      />
                      <div className="block-set__info--title animated">
                        {this.props.productItem.forbiddenToSell ? "Unblock" : "Block"}
                      </div>
                    </div>
                  </div>
                </div>

              </>
            )}
          </div>

          <div className="block-set__item flex animated">
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Status
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.productItem.status.name}
                  </div>
                </div>
              </div>
            </div>

            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Expiration date
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {dataFuncs.truncateDate(this.props.productItem.expiration_date)}
                  </div>
                </div>
              </div>
            </div>

            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Last Update
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {dataFuncs.truncateDate(this.props.productItem.updatedAt)}
                    {dataFuncs.getGmtTimeFormat(this.props.productItem.updatedAt)}
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

ProductItemGeneral.propTypes = {
  productItem: IProductItemView.isRequired,
  onTriggerForbiddenToSell: PropTypes.func.isRequired
};
