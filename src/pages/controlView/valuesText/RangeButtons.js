import React from "react";
import PropTypes from "prop-types";
import * as controlViewRedux from "../../../redux/modules/controlViewRedux";
import { controlViewActions } from "../../../redux/modules/controlViewRedux";
import { getNonTranslatableViewFieldClass } from "../../../utils/viewValidators";
import { connect } from "react-redux";
import * as dataFuncs from "../../../utils/dataFuncs";
import { LanguageButtons } from "../../../components/LanguageButtons/LanguageButtons";
import { MultiLanguageInput } from "../../../components/MultiLanguageInput/MultiLanguageInput";
import {
  getRulesValue,
  getTextMapping,
  fillRangeValuesTexts
} from "../constsAndFuncs";

export class RangeButtons_ extends React.Component {
  //------------------------------------------------------------------------------------

  onChangeTitle = newValue => {
    this.props.dispatch(
      controlViewActions.changeMultiLanguageTextMappingField("title", newValue)
    );
  };

  //------------------------------------------------------------------------------------

  onChangeRulesValue = (newValue, rangeCode, fieldName) => {
    this.props.dispatch(
      controlViewActions.changeRulesValue(newValue, rangeCode, fieldName)
    );
  };

  //------------------------------------------------------------------------------------

  onChangeButtonsText = (changedText, buttonIndex, textIndex) => {
    let buttonsCount = this.props.control.textMapping.valuesText.length;

    let translatedTextMapping = dataFuncs.getTranslatedViewField(
      this.props.control,
      translationObj => getTextMapping(translationObj)
    );

    let translatedValuesText = fillRangeValuesTexts(
      translatedTextMapping,
      buttonsCount
    );
    translatedValuesText[buttonIndex].text[textIndex] = changedText;

    this.props.dispatch(
      controlViewActions.changeMultiLanguageTextMappingField(
        "valuesText",
        translatedValuesText
      )
    );
  };

  //------------------------------------------------------------------------------------

  onAddValueText = () => {
    let buttonsCount = this.props.control.textMapping.valuesText.length;
    this.props.dispatch(controlViewActions.addValueText(buttonsCount + 1));
  };

  //------------------------------------------------------------------------------------

  onDeleteLastValueText = attributeValue => {
    this.props.dispatch(controlViewActions.deleteLastValueText(attributeValue));
  };

  //------------------------------------------------------------------------------------

  renderValuesTexts = renderFunc => {
    if (
      !this.props.control ||
      !this.props.control.textMapping ||
      !this.props.control.textMapping.valuesText
    )
      return null;

    return this.props.control.textMapping.valuesText.map((valueItem, index) => {
      return renderFunc(index);
    });
  };

  renderRangeNumber = index => {
    return <div className="brand-sub-title">Range №{index + 1}</div>;
  };

  renderRangeValue = (buttonIndex, fieldName = "min") => {
    return (
      <>
        {this.props.control.language === "en" ? (
          <input
            placeholder={fieldName}
            className="block-set__input animated"
            type="text"
            value={getRulesValue(this.props.control, buttonIndex, fieldName)}
            onChange={e =>
              this.onChangeRulesValue(
                e.target.value,
                buttonIndex + 1,
                fieldName
              )
            }
          />
        ) : (
          <input
            style={{ border: "1px solid white", boxShadow: "0 1px 3px white" }}
            placeholder={fieldName}
            className="block-set__input animated"
            type="text"
            value={getRulesValue(this.props.control, buttonIndex, fieldName)}
            readOnly
          />
        )}
      </>
    );
  };

  renderButtonText = (buttonIndex, textIndex) => {
    let translatedTextMapping = dataFuncs.getTranslatedViewField(
      this.props.control,
      translationObj => getTextMapping(translationObj)
    );

    let text =
      translatedTextMapping &&
      translatedTextMapping.valuesText &&
      translatedTextMapping.valuesText[buttonIndex] &&
      translatedTextMapping.valuesText[buttonIndex].text &&
      translatedTextMapping.valuesText[buttonIndex].text[textIndex]
        ? translatedTextMapping.valuesText[buttonIndex].text[textIndex]
        : "";

    let input = (
      <input
        className={
          text === ""
            ? "block-set__input animated is--error"
            : "block-set__input animated"
        }
        placeholder="translated text"
        type="text"
        value={text}
        onChange={e =>
          this.onChangeButtonsText(e.target.value, buttonIndex, textIndex)
        }
      />
    );

    return textIndex == 2 &&
      buttonIndex > 1 &&
      buttonIndex == this.props.control.textMapping.valuesText.length - 1 ? (
      <div className="payment-grid-box">
        {input}
        <button
          className="payment-grid-item-remove-btn"
          type="button"
          onClick={() => this.onDeleteLastValueText(buttonIndex + 1)}
        />
      </div>
    ) : (
      input
    );
  };

  //=====================================================================================
  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__inner flex w100 animated">
          <LanguageButtons
            language={this.props.control.language}
            onChangeLanguage={this.props.onChangeLanguage}
          />
        </div>

        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__sub-title flex w100 animated translatable">
              Buttons Title*
            </div>
            <div
              className="block-set__content flex w100 animated"
              style={{ width: "390px" }}
            >
              <MultiLanguageInput
                placeholder="translated title"
                viewItem={this.props.control}
                getFieldValue={item =>
                  item.textMapping && item.textMapping.title
                    ? item.textMapping.title
                    : ""
                }
                onChange={this.onChangeTitle}
              />
            </div>
          </div>
        </div>

        <div className="block-set__title animated">Buttons Text for Ranges</div>

        <div className="block-set__inner flex w100 animated">
          <div className="payment-fields">
            <div className="payment-grid">
              <div className="payment-grid-inner">
                <div
                  className="payment-grid-item"
                  style={{ width: "80px", minWidth: "80px" }}
                >
                  <div className="brand-sub-title" style={{ height: "15px" }} />
                  {this.renderValuesTexts(this.renderRangeNumber)}
                </div>
                <div
                  className="payment-grid-item"
                  style={{ width: "100px", minWidth: "100px" }}
                >
                  <div className="brand-sub-title">Range Min *</div>
                  {this.renderValuesTexts(index =>
                    this.renderRangeValue(index, "min")
                  )}
                </div>
                <div
                  className="payment-grid-item"
                  style={{ width: "100px", minWidth: "100px" }}
                >
                  <div className="brand-sub-title">Range Max *</div>
                  {this.renderValuesTexts(index =>
                    this.renderRangeValue(index, "max")
                  )}
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title translatable">
                    Button Text *
                  </div>
                  {this.renderValuesTexts(index =>
                    this.renderButtonText(index, 0)
                  )}
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title translatable">
                    Text1 below
                  </div>
                  {this.renderValuesTexts(index =>
                    this.renderButtonText(index, 1)
                  )}
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title translatable">
                    Text2 below
                  </div>
                  {this.renderValuesTexts(index =>
                    this.renderButtonText(index, 2)
                  )}
                </div>
              </div>
            </div>

            <button
              className="buttons__main button--save animated"
              type="button"
              onClick={() => this.onAddValueText()}
            >
              + Add Range
            </button>
          </div>
        </div>
      </div>
    );
  }
}

RangeButtons_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  control: controlViewRedux.IControlView,
  onChangeLanguage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    control: state.controlView
  };
}

export const RangeButtons = connect(mapStateToProps)(RangeButtons_);
