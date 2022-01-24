import React from "react";
import PropTypes from "prop-types";
import { IProductView } from "../../redux/modules/productViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import { Panel } from "../../components/Panel/Panel";

export class ProductGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.product.id != "";

    let isEnabled = false;
    let tumblerCls = "block-set__tumbler animated";
    if (
      this.props.product.status &&
      this.props.product.status.name === "enabled"
    ) {
      isEnabled = true;
      tumblerCls = "block-set__tumbler active animated";
    }

    return (
      <Panel caption="General">
        <div className="block-set__item flex animated">
          {isEditExisting && (
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Popularity
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.product.popularity || 0}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__sub-title flex w100 animated">
              Priority number
            </div>
            <div className="block-set__content flex w100 animated">
              {/* -- add class ".small"-- */}
              <input
                className="block-set__input small animated"
                type="number"
                value={this.props.product.priority || 0}
                onChange={e => this.props.onChangePriority(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="block-set__item flex animated">
          {isEditExisting && (
            <>
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Defined Product ID
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {this.props.product.id}
                    </div>
                  </div>
                </div>
              </div>

              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Creation Date
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {dataFuncs.truncateDate(this.props.product.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {isEditExisting && (
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Status
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  {/* -- click - toggle class "active" and change text "Yes | No" in the next ".block-set__info--title"-- */}
                  <div
                    className={tumblerCls}
                    onClick={() => this.props.onTriggerStatus()}
                  />
                  <div className="block-set__info--title animated">
                    {isEnabled ? "Enabled" : "Disabled"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Panel>
    );
  }
}

ProductGeneral.propTypes = {
  product: IProductView,
  onChangePriority: PropTypes.func.isRequired,
  onTriggerStatus: PropTypes.func.isRequired
};
