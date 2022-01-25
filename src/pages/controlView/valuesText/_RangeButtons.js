import React from "react";
import PropTypes from "prop-types";
import * as controlViewRedux from "../../../redux/modules/controlViewRedux";
import { controlViewActions } from "../../../redux/modules/controlViewRedux";
import { getNonTranslatableViewFieldClass } from "../../../utils/viewValidators";
import { connect } from "react-redux";
import * as dataFuncs from "../../../utils/dataFuncs";
import { LanguageButtons } from "../../../components/LanguageButtons/LanguageButtons";
import { MultiLanguageInput } from "../../../components/MultiLanguageInput/MultiLanguageInput";
import {getRulesValue} from "../constsAndFuncs";

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
    let englishValuesText = this.fillButtons(this.props.control);

    let translatedTextMapping = dataFuncs.getTranslatedViewField(
      this.props.control,
      translationObj => translationObj.textMapping
    );

    let translatedValuesText = this.fillButtons(translatedTextMapping);
    translatedValuesText[buttonIndex].text[textIndex] = changedText;
    translatedValuesText[buttonIndex].attributeValue = englishValuesText[buttonIndex].attributeValue;

    this.props.dispatch(
      controlViewActions.changeMultiLanguageTextMappingField("valuesText", translatedValuesText)
    );

    // this.props.onChangeButtonsField(
    //   [this.props.metricParameter, "buttons"],
    //   translatedButtons
    // );
  };

//------------------------------------------------------------------------------------

  getTextMapping = (translationObj = this.props.control) => {
    if (translationObj && translationObj.textMapping)
      return translationObj.textMapping;
    else return {};
  };

//------------------------------------------------------------------------------------ 

  renderButtonProperties = buttonIndex => {
    let rangeCode = buttonIndex + 1; //this.getId(buttonIndex);
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
        <div
          className="translatable"
          style={{ width: "100px", height: "20px" }}
        >
          {"Range № " + rangeCode}
        </div>

        {this.props.control.language === "en" ? (
          <input
            placeholder="Min"
            style={{ width: "100px" }}
            className="block-set__input animated"
            type="text"
            value={getRulesValue(this.props.control, buttonIndex, "min")}
            onChange={e =>
              this.onChangeRulesValue(e.target.value, rangeCode, "min")
            }
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
            onChange={e =>
              this.onChangeRulesValue(e.target.value, rangeCode, "max")
            }
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
          onChange={e =>
            this.onChangeButtonsText(e.target.value, buttonIndex, 0)
          }
        />

        <input
          style={{ width: "100px" }}
          className="block-set__input animated"
          type="text"
          placeholder="Text below button"
          name="text1"
          value={text[1]}
          onChange={e =>
            this.onChangeButtonsText(e.target.value, buttonIndex, 1)
          }
        />

        <input
          style={{ width: "100px" }}
          className="block-set__input animated"
          type="text"
          placeholder="Text below button"
          name="text2"
          value={text[2]}
          onChange={e =>
            this.onChangeButtonsText(e.target.value, buttonIndex, 2)
          }
        />

        {buttonIndex == translatedTextMapping.valuesText.length - 1 ? (
          <button className="back" />
        ) : null}
      </div>
    );
  };

//------------------------------------------------------------------------------------

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

//=====================================================================================
  render() {
    let isEditExisting = this.props.control.id > 0;

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

        {this.renderValuesTexts()}

        <div className="block-set__inner flex w100 animated">
          <button
            className="buttons__main button--save animated"
            type="button"
            // onClick={() =>
            //   this.props.dispatch(budgetItemViewActions.addIncome())
            // }
          >
            + Add Range
          </button>
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
