import React from "react";
import PropTypes from "prop-types";
import * as controlViewRedux from "../../../redux/modules/controlViewRedux";
import { controlViewActions } from "../../../redux/modules/controlViewRedux";
import { getNonTranslatableViewFieldClass } from "../../../utils/viewValidators";
import { connect } from "react-redux";
import * as dataFuncs from "../../../utils/dataFuncs";

export class RangeButtons_ extends React.Component {
  getTextMapping = (translationObj = this.props.control) => {
    if (translationObj && translationObj.textMapping)
      return translationObj.textMapping;
    else return {};
  };

  getRulesValue = (buttonIndex, fieldName) => {
    if (!this.props.control) return "";
    let rules = this.props.control.rules;
    if (!rules) return "";
    let values_transformed = rules.valuesText_transformed;
    if (!values_transformed) return "";
    let rangeCode = buttonIndex + 1;
    for (let i = 0; i < values_transformed.length; i++) {
      if (values_transformed[i].rangeCode == rangeCode) {
        let buttonRule = values_transformed[i];
        if (!buttonRule) return "";
        let result = buttonRule[fieldName];
        if (result >= 0) return result;
      }
    }
    return "";
  };

  renderButtonProperties = buttonIndex => {
    let id = buttonIndex + 1; //this.getId(buttonIndex);
    let text = [];
    let translatedTextMapping = dataFuncs.getTranslatedViewField(
      this.props.control,
      translationObj => this.getTextMapping(translationObj)
    );

    for (let i = 0; i < 3; i++) {
      let value =
        translatedTextMapping &&
        translatedTextMapping.valuesText &&
        translatedTextMapping.valuesText[buttonIndex] &&
        translatedTextMapping.valuesText[buttonIndex].text &&
        translatedTextMapping.valuesText[buttonIndex].text[i]
          ? translatedTextMapping.valuesText[buttonIndex].text[i]
          : "";
      text.push(value);
    }

    return (
      <div
        className="block-set__inner flex w100 animated"
        key={"button" + buttonIndex}
      >
        <div className="block-set-grid">
          <div style={{ width: "100px" }}>{"Range № " + id}</div>

          {this.props.control.language === "en" ? (
            <input
              placeholder="Min"
              style={{ width: "100px" }}
              className="block-set__input animated"
              type="text"
              value={this.getRulesValue(buttonIndex, "min")}
              // onChange={e =>
              //   this.props.onChangeRulesValue(
              //     e.target.value,
              //     buttonIndex,
              //     "min"
              //   )
              // }
            />
          ) : (
            <input
              placeholder="Min"
              style={{ width: "100px" }}
              type="text"
              readOnly
            />
          )}

          {this.props.control.language === "en" ? (
            <input
              placeholder="Max"
              style={{ width: "100px" }}
              className="block-set__input animated"
              type="text"
              value={this.getRulesValue(buttonIndex, "max")}
              // onChange={e =>
              //   this.props.onChangeRulesValue(
              //     e.target.value,
              //     buttonIndex,
              //     "min"
              //   )
              // }
            />
          ) : (
            <input
              placeholder="Max"
              style={{ width: "100px" }}
              type="text"
              readOnly
            />
          )}

          {/* --- Button Text --- */}

          <input
            style={{ width: "100px" }}
            className={
              text[0] === ""
                ? "block-set__input animated is--error"
                : "block-set__input animated"
            }
            placeholder="Button text"
            name="text0"
            type="text"
            value={text[0]}
            // onChange={e =>
            //   this.onChangeButtonsText(e.target.value, buttonIndex, 0)
            // }
          />

          <input
            style={{ width: "100px" }}
            className="block-set__input animated"
            type="text"
            placeholder="Text below button"
            name="text1"
            value={text[1]}
            // onChange={e =>
            //   this.onChangeButtonsText(e.target.value, buttonIndex, 1)
            // }
          />

          <input
            style={{ width: "100px" }}
            className="block-set__input animated"
            type="text"
            placeholder="Text below button"
            name="text2"
            value={text[2]}
            // onChange={e =>
            //   this.onChangeButtonsText(e.target.value, buttonIndex, 2)
            // }
          />

          {buttonIndex === translatedTextMapping.valuesText.length - 1 ? (
            <button className="back" />
          ) : null}
        </div>
      </div>
    );
  };

  renderValuesTexts = () => {
    if (
      !this.props.control ||
      !this.props.control.textMapping ||
      !this.props.control.textMapping.valuesText
    )
      return null;

    return this.props.control.textMapping.valuesText.map((valueItem, index) => {
      return this.renderButtonProperties(index);
    });
  };

  renderLabels = () => {
    return (
      <>
        <div className="block-set__input animated">Range №1</div>
        <div className="block-set__input animated">Range №2</div>
      </>
    );
  };

  renderInputs = (arrayName, fieldName) => {
    return (
      <>
        <input
          className="block-set__input animated"
          type="text"
          value="Text x"
        />
        <input
          className="block-set__input animated"
          type="text"
          value="Text x"
        />
      </>
    );
  };

  render() {
    let isEditExisting = this.props.control.id > 0;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Ranges and Buttons Text</div>

        <div className="block-set__inner flex w100 animated">
          <div className="payment-fields">
            <div className="payment-grid">
              <div className="payment-grid-inner">
                <div className="payment-grid-item">
                  <div className="brand-sub-title">Range Number</div>
                  <div className="brand-sub-title">Range №1</div>
                  <div className="brand-sub-title">Range №2</div>
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title">Range Min</div>
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="0"
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="0"
                  />
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title">Range Max</div>
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="1"
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="1"
                  />
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title">Button Text *</div>
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="Text x"
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="Text x"
                  />
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title">Text1 below</div>
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="Text x"
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="Text x"
                  />
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title">Text2 below</div>
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="Text x"
                  />
                  <div className="payment-grid-box">
                    <input
                      className="block-set__input animated"
                      type="text"
                      value="Text x"
                    />
                    <button
                      className="payment-grid-item-remove-btn"
                      type="button"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button className="btn-secondary" type="button">
              + Добавить оплату
            </button>
          </div>
        </div>
      </div>
    );
  }
}

RangeButtons_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  control: controlViewRedux.IControlView
};

function mapStateToProps(state) {
  return {
    control: state.controlView
  };
}

export const RangeButtons = connect(mapStateToProps)(RangeButtons_);
