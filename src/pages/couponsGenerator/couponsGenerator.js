import React from "react";
import { BaseView } from "../../components/BaseView/BaseView";

export class couponsGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { unit: "usd", value: 0, code: "" };
  }

  calculateCode = () => {
    let code = "Value should be >0";
    if (this.state.value > 0) 
        code=btoa(JSON.stringify({ unit: this.state.unit, value: this.state.value }));
    this.setState({
      code: code});
  };

  changeUnit = unit => {
    this.setState({ unit: unit });
    setTimeout(() => {
      this.calculateCode();
    }, 100);
  };

  changeValue = value => {
    try {
      value = parseInt(value);
    } catch (e) {
      value = 0;
    }
    if (value < 0) value = 0;
    this.setState({ value: value });
    setTimeout(() => {
      this.calculateCode();
    }, 100);
  };

  render() {
    let checkbox1_cls =
      this.state.unit === "usd"
        ? "radio__label flex animated"
        : "radio__label checked flex animated";

    let checkbox2_cls =
      this.state.unit === "usd"
        ? "radio__label checked flex animated"
        : "radio__label flex animated";

    return (
     <>
        <div className="block-set__box flex animated">
        
          <div className="block-set__title animated">General</div>
          <div className="block-set__inner flex w100 animated">
            <div className="block-set__item flex animated">
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Discount Unit
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
                        onClick={() => this.changeUnit("percents")}
                      />
                      <label className={checkbox1_cls} htmlFor="r-label1">
                        <span className="radio__label--icon animated" />
                        <span className="radio__label--text animated">
                          Percents
                        </span>
                      </label>
                    </div>
                    <div className="radio flex animated">
                      <input
                        className="radio__input"
                        id="r-label2"
                        type="radio"
                        name="tax-status"
                        onClick={() => this.changeUnit("usd")}
                      />
                      {/* -- click remove class ".checked" from other ".radio__label's"--
                                            -- add class ".checked" this ".radio__label"-- */}
                      <label className={checkbox2_cls} htmlFor="r-label2">
                        <span className="radio__label--icon animated" />
                        <span className="radio__label--text animated">Cents</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* ---Password--- */}
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Value
                </div>
                <div className="block-set__content flex w100 animated">
                  <input
                    className="block-set__input animated"
                    type="number"
                    value={this.state.value}
                    onChange={e => this.changeValue(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* ---Right Panel--- */}
            <div className="block-set__item flex animated">
              {/* ---Code --- */}
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Coupon Code
                </div>
                <div className="block-set__content flex w100 animated">
                  <textarea
                    className="block-set__text-area animated"
                    value={this.state.code}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        Generate Coupon code and <a href="http://online-barcode-generator.net/" target="blank">paste it here</a> to get barcode image.
     </>
    );
  }
}

couponsGenerator.propTypes = {};
