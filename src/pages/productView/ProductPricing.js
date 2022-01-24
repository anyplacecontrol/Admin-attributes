import React from "react";
import PropTypes from "prop-types";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import { IProductView } from "../../redux/modules/productViewRedux";
import {Panel} from "../../components/Panel/Panel";
import * as dataFuncs from "../../utils/dataFuncs";

export class ProductPricing extends React.Component {

  render() {
    return (
      <Panel caption="Pricing">
          <div className="block-set__item flex animated">
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Regular Price $/Lb*
              </div>
              <div className="block-set__content flex w100 animated">
                <input                  
                  className={
                    !this.props.product.isValidated ||
                    this.props.product.price > 0
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }                  
                  placeholder="0.00"                  
                  value = {this.props.price}
                  onChange={e => this.props.onChangePrice(e.target.value)}                 
                />
              </div>
            </div>
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Promotion Applied
              </div>
              <div className="block-set__content flex w100 animated">
              <SelectBox
                  className="w100"
                  style={{ zIndex: 0 }}
                  text={"Select"}
                  items={dataFuncs.createMultiSelectBoxItems(
                    [{ name: "~", id: "0923834" }],
                    [],
                    "name",
                    "id"
                    // this.props.onChangeCategory
                  )}
                  isCheckboxItems={false}
                />
              </div>
            </div>
           
          </div>
          <div className="block-set__item flex animated">
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Tax Status
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="radio__container flex animated">
                  {/* -- checked radio button-- */}
                  <div className="radio flex animated">
                    <input
                      className="radio__input"
                      id="r-label1"
                      type="radio"
                      name="tax-status"
                      checked
                      readOnly
                    />
                    <label
                      className="radio__label flex animated"
                      htmlFor="r-label1"
                    >
                      <span className="radio__label--icon animated" />
                      <span className="radio__label--text animated">
                        Taxable
                      </span>
                    </label>
                  </div>
                  <div className="radio flex animated">
                    <input
                      className="radio__input"
                      id="r-label2"
                      type="radio"
                      name="tax-status"
                    />
                    {/* -- click remove class ".checked" from other ".radio__label's"--
                                            -- add class ".checked" this ".radio__label"-- */}
                    <label
                      className="radio__label flex animated"
                      htmlFor="r-label2"
                    >
                      <span className="radio__label--icon animated" />
                      <span className="radio__label--text animated">
                        Non-Taxable
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Tax Class
              </div>
              <div className="block-set__content flex w100 animated">
              <SelectBox
                  className="w100"
                  style={{ zIndex: 1 }}
                  text={"Select"}
                  items={dataFuncs.createMultiSelectBoxItems(
                    [{ name: "~", id: "0923834" }],
                    [],
                    "name",
                    "id"
                    // this.props.onChangeCategory
                  )}
                  isCheckboxItems={false}
                />
               
              </div>
            </div>
          </div>
      </Panel>
    );
  }
}

ProductPricing.propTypes = {
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  product: IProductView,  
  onChangePrice: PropTypes.func.isRequired,
};
