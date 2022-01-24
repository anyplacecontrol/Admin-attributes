import React from "react";
import PropTypes from "prop-types";
import * as controlViewRedux from "../../../redux/modules/controlViewRedux";
import { controlViewActions } from "../../../redux/modules/controlViewRedux";
import { getNonTranslatableViewFieldClass } from "../../../utils/viewValidators";
import { connect } from "react-redux";
import * as dataFuncs from "../../../utils/dataFuncs";

export class RangeButtons_ extends React.Component {
  
  getTextMapping = (translationObj = this.props.control) => {
    if (
      translationObj &&
      translationObj.textMapping
    )
      return translationObj.textMapping;
    else return {};
  };

  renderButtonsText = buttonIndex => {
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

    let hideTranslatedText = this.props.control.language != "en" && !id;
    let blockClass =
      "block-set__settings--content-item flex w100 animated cut-weight-block";

    return (
      <div className={blockClass}>
        <div className="block-set__settings--sub-title flex w100 animated">
          {"Button " + buttonIndex}
        </div>

        {hideTranslatedText && <div className="block-set__input animated" />}

        {/* --- Min and Max for Weight --- */}

        {this.props.control.language === "en" && (
            <input
              className="block-set__input numeric-block animated"
              type="text"
              placeholder="Min"
              name="text_min"
              //value={this.getWeightValue(buttonIndex, "min")}
              // onChange={e =>
              //   this.props.onChangeRulesValue(
              //     e.target.value,
              //     buttonIndex,
              //     "min"
              //   )
              // }
            />
          )}

        {this.props.control.language === "en" && (
            <input
              className="block-set__input numeric-block animated"
              type="text"
              placeholder="Max"
              name="text_max"
              // value={this.getWeightValue(buttonIndex, "max")}
              // onChange={e =>
              //   this.props.onChangeRulesValue(
              //     e.target.value,
              //     buttonIndex,
              //     "max"
              //   )
              // }
            />
          )}

        {/* --- Button Text --- */}
        {!hideTranslatedText && (
          <input
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
        )}

        {!hideTranslatedText && (
          <input
            className="block-set__input animated"
            type="text"
            placeholder="Text below button"
            name="text1"
            value={text[1]}
            // onChange={e =>
            //   this.onChangeButtonsText(e.target.value, buttonIndex, 1)
            // }
          />
        )}

        {hideTranslatedText && <div className="block-set__input animated" />}

        {!hideTranslatedText && (
          <input style={{width: 10}}
            className="block-set__input animated"
            type="text"
            placeholder="Text below button"
            name="text2"
            value={text[2]}
            onChange={e =>
              this.onChangeButtonsText(e.target.value, buttonIndex, 2)
            }
          />
        )}
        {hideTranslatedText && <div className="block-set__input animated" />}
      </div>
    );
  };

  renderInput = () => {
    return (
      <input        
        className="block-set__input animated"
        type="text"        
      />
    );
  }

  render() {
    let isEditExisting = this.props.control.id > 0;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Ranges and Buttons</div>

        <div className="block-set__inner flex w100 animated">
            <div className="payment-fields">
              <div className="payment-grid">
                <div className="payment-grid-inner">
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">Button №</div>
                    {"1"}
                  </div>
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">Range Min *</div>
                    {this.renderInput()}
                  </div>
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">Range Max *</div>
                    {this.renderInput()}
                  </div>
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">
                      Button Text *
                    </div>
                    {this.renderInput()}
                  </div>
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">
                      Text 1 below button
                    </div>
                    {this.renderInput()}
                  </div>
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">
                      Text 2 below button
                    </div>
                    {this.renderInput()}
                  </div>
                </div>
              </div>
              <button
                className="btn-secondary"
                type="button"
                // onClick={() =>
                //   this.props.dispatch(budgetItemViewActions.addIncome())
                // }
              >
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
