import React from "react";
import PropTypes from "prop-types";
import * as controlViewRedux from "../../../redux/modules/controlViewRedux";
import { controlViewActions } from "../../../redux/modules/controlViewRedux";
import { connect } from "react-redux";
import * as dataFuncs from "../../../utils/dataFuncs";
import {
  getTextMapping,
  fillAttributeValuesTexts
} from "../../../utils/controlsFuncs";
import { renderValuesTexts, renderButtonText } from "./renderUtils";

export class ValueButtons_ extends React.Component {
  //------------------------------------------------------------------------------------

  onChangeTitle = newValue => {
    this.props.dispatch(
      controlViewActions.changeTranslatedTextMappingField("title", newValue)
    );
  };

  //------------------------------------------------------------------------------------

  onChangeAttributeValue = (newValue, buttonIndex) => {
    let textMapping = JSON.parse(
      JSON.stringify(this.props.control.textMapping)
    );
    textMapping.valuesText[buttonIndex].attributeValue = newValue;

    this.props.dispatch(
      controlViewActions.changeEnglishTextMapping(textMapping)
    );
  };

  //------------------------------------------------------------------------------------

  onChangeButtonsText = (changedText, buttonIndex, textIndex) => {
    let translatedTextMapping = dataFuncs.getTranslatedViewField(
      this.props.control,
      translationObj => getTextMapping(translationObj)
    );

    let translatedValuesText = fillAttributeValuesTexts(
      translatedTextMapping,
      this.props.control
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
    this.props.dispatch(controlViewActions.addValueText(""));
  };

  //------------------------------------------------------------------------------------

  onDeleteLastValue = attributeValue => {
    this.props.dispatch(controlViewActions.deleteLastValue(attributeValue));
  };

  //------------------------------------------------------------------------------------

  renderButtonNumber = index => {
    return <div className="brand-sub-title">Button №{index + 1}</div>;
  };

  renderAttributeValues = buttonIndex => {
    let control = this.props.control;
    let text =
      control.textMapping &&
      control.textMapping.valuesText &&
      control.textMapping.valuesText[buttonIndex] &&
      control.textMapping.valuesText[buttonIndex].attributeValue
        ? control.textMapping.valuesText[buttonIndex].attributeValue
        : "";

    return (
      <>
        {this.props.control.language === "en" ? (
          <input
            placeholder="value"
            className="block-set__input animated"
            type="text"
            value={text}
            onChange={e =>
              this.onChangeAttributeValue(e.target.value, buttonIndex)
            }
          />
        ) : (
          <input
            style={{ border: "1px solid white", boxShadow: "0 1px 3px white" }}
            placeholder="value"
            className="block-set__input animated"
            type="text"
            value={text}
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
        <div className="block-set__title animated">
          Buttons Text for Attribute Values
        </div>

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
                  {renderValuesTexts(control, this.renderButtonNumber)}
                </div>
                <div
                  className="payment-grid-item"
                  style={{ width: "100px", minWidth: "100px" }}
                >
                  <div className="brand-sub-title">Attribute Value *</div>
                  {renderValuesTexts(control, this.renderAttributeValues)}
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
                      this.onDeleteLastValue
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
              + Add Value
            </button>
            <div>
              {
                "Note: If option 'Display attribute in Kiosk receipt' enabled, Kiosk will use Button Text to display attribute value"
              }
            </div>
            <div>
              {
                "Attribute value can be string (case sensitive), number or bool"
              }
            </div>
          </div>
        </div>
      </>
    );
  }
}

ValueButtons_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  control: controlViewRedux.IControlView
};

function mapStateToProps(state) {
  return {
    control: state.controlView
  };
}

export const ValueButtons = connect(mapStateToProps)(ValueButtons_);
