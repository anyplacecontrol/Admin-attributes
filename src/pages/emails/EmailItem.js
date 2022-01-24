import React from "react";
import PropTypes from "prop-types";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import * as dataFuncs from "../../utils/dataFuncs";

export class EmailItem extends React.Component {
  convertPrice = price => {
    return (price / 100).toFixed(2);
  };

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Emails (hardcoded)</div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">

            {/* ---Template Name--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Template Name
              </div>
              <div className="block-set__content flex w100 animated">
                <SelectBox
                  className="w100"
                  style={{ zIndex: 2 }}
                  text={"Inventory"}
                  items={dataFuncs.createMultiSelectBoxItems(
                    [
                      { name: "Inventory", id: "Inventory" },
                      { name: "Low Inventory", id: "Low Inventory" },
                      { name: "Customers", id: "Customers" },
                      {
                        name: "Kiosk Tech Conditions",
                        id: "Kiosk Tech Conditions"
                      }
                    ],
                    [],
                    "name",
                    "id"
                    // this.props.onChangeCategory
                  )}
                />
              </div>
            </div>

            {/* ---Recepient Type--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Recepient Type
              </div>
              <div className="block-set__content flex animated">
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
                    className="radio__label checked flex animated"
                    htmlFor="r-label1"
                  >
                    <span className="radio__label--icon animated" />
                    <span className="radio__label--text animated">User</span>
                  </label>
                </div>
                <div className="radio flex animated">
                  <input
                    className="radio__input"
                    id="r-label2"
                    type="radio"
                    name="tax-status"
                  />
                  <label
                    className="radio__label flex animated"
                    htmlFor="r-label2"
                  >
                    <span className="radio__label--icon animated" />
                    <span className="radio__label--text animated">
                      Customer
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* ---From email--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                From email
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  type="text"
                  value="emailaddress@gmail.com"
                  onChange={() => {}}
                />
              </div>
            </div>

            {/* ---From name--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                From name
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  type="text"
                  value="Kavin Jackson"
                  onChange={() => {}}
                />
              </div>
            </div>

            {/* ---Subject--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Subject of Email
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  type="text"
                  value="Subject of email"
                  onChange={() => {}}
                />
              </div>

              {/* ---Body--- */}
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Body
                </div>
                <div className="block-set__content flex w100 animated">
                  <input
                    className="block-set__input animated"
                    type="text"
                    value=""
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EmailItem.propTypes = {};
