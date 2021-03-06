import React from "react";
import PropTypes from "prop-types";
import * as controlViewRedux from "../../../redux/modules/controlViewRedux";
import { controlViewActions } from "../../../redux/modules/controlViewRedux";
import { connect } from "react-redux";
import * as dataFuncs from "../../../utils/dataFuncs";
import {
  getRulesValue,
  getTextMapping,
  fillRangeValuesTexts
} from "../../../utils/controlsFuncs";
import { renderValuesTexts, renderButtonText} from "./renderUtils";

export class RangeButtons_ extends React.Component {
  //------------------------------------------------------------------------------------

  onChangeTitle = newValue => {
    this.props.dispatch(
      controlViewActions.changeTranslatedTextMappingField("title", newValue)
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
      controlViewActions.changeTranslatedTextMappingField(
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

  onDeleteLastRange = attributeValue => {
    this.props.dispatch(controlViewActions.deleteLastRange(attributeValue));
  };

  //------------------------------------------------------------------------------------

  renderRangeNumber = index => {
    return <div className="brand-sub-title">Range ???{index + 1}</div>;
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

  //=====================================================================================
  render() {
    let control = this.props.control;
    return (
      <>
        <div className="block-set__title animated">Buttons Text for Ranges</div>

        <div className="block-set__inner flex w100 animated">
          <div className="payment-fields">
            <div className="payment-grid">
              <div
                className="payment-grid-inner"
                style={{ paddingBottom: "20px" }}
              >
                <div
                  className="payment-grid-item"
                  style={{ width: "80px", minWidth: "80px" }}
                >
                  <div className="brand-sub-title" style={{ height: "15px" }} />
                  {renderValuesTexts(control, this.renderRangeNumber)}
                </div>
                <div
                  className="payment-grid-item"
                  style={{ width: "100px", minWidth: "100px" }}
                >
                  <div className="brand-sub-title">Range Min *</div>
                  {renderValuesTexts(control, index =>
                    this.renderRangeValue(index, "min")
                  )}
                </div>
                <div
                  className="payment-grid-item"
                  style={{ width: "100px", minWidth: "100px" }}
                >
                  <div className="brand-sub-title">Range Max *</div>
                  {renderValuesTexts(control, index =>
                    this.renderRangeValue(index, "max")
                  )}
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title translatable">
                    Button Text *
                  </div>
                  {renderValuesTexts(control, index =>
                    renderButtonText(
                      index,
                      0,
                      control,
                      this.onChangeButtonsText                      
                    )
                  )}
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title translatable">
                    Text1 below button
                  </div>
                  {renderValuesTexts(control, index =>
                    renderButtonText(
                      index,
                      1,
                      control,
                      this.onChangeButtonsText                      
                    )
                  )}
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title translatable">
                    Text2 below button
                  </div>
                  {renderValuesTexts(control, index =>
                    renderButtonText(
                      index,
                      2,
                      control,
                      this.onChangeButtonsText,
                      this.onDeleteLastRange
                    )
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
            <div>
              {
                "Note: If option 'Display attribute in Kiosk receipt' enabled, Kiosk will use Button Text to display attribute value"
              }
            </div>
          </div>
        </div>
      </>
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
