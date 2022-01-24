import React from "react";
import PropTypes from "prop-types";
import * as metricViewRedux from "../../redux/modules/metricViewRedux";
import { MultiLanguageInput } from "../../components/MultiLanguageInput/MultiLanguageInput";
import * as dataFuncs from "../../utils/dataFuncs";

export class MetricButtonsPanel extends React.Component {
  onChangeTitle = newValue => {
    this.props.onChangeButtonsField(
      [this.props.metricParameter, "title"],
      newValue
    );
  };

  onChangeButtonsId = async (evt, buttonIndex) => {
    let id = evt.target.validity.valid
      ? evt.target.value
      : this.getId(buttonIndex);
    if (id === "" || id === null) id = null;
    else
      try {
        id = parseInt(id, 10);
      } catch (e) {
        id = this.getId(buttonIndex);
      }

    let buttons = this.fillButtons(this.props.metric);
    buttons[buttonIndex].id = id;

    await this.props.onChangeButtonsField(
      [this.props.metricParameter, "buttons"],
      buttons
    );

    if (this.props.metricParameter === "weight") {
      //TODO: modify values for rules
    }
  };

  onChangeButtonsText = (text, buttonIndex, textIndex) => {
    let englishButtons = this.fillButtons(this.props.metric);

    let translatedMetricUi = dataFuncs.getTranslatedViewField(
      this.props.metric,
      translatedMetric => translatedMetric
    );

    let translatedButtons = this.fillButtons(translatedMetricUi);
    translatedButtons[buttonIndex].text[textIndex] = text;
    translatedButtons[buttonIndex].id = englishButtons[buttonIndex].id;

    this.props.onChangeButtonsField(
      [this.props.metricParameter, "buttons"],
      translatedButtons
    );
  };

  //return weight (or thickness or marbling) parameter of metrics
  //argument metric - either original or translated metric
  getMetricParameter = (metric = this.props.metric) => {
    if (
      metric &&
      metric.metricUi &&
      metric.metricUi[this.props.metricParameter]
    )
      return metric.metricUi[this.props.metricParameter];
    else return {};
  };

  onCheckboxClick = () => {
    let isChecked = !this.getMetricParameter().isChecked;
    this.props.onChangeButtonsField(
      [this.props.metricParameter, "isChecked"],
      isChecked,
      false
    );
  };

  getId = buttonIndex => {
    return this.getMetricParameter().buttons &&
      this.getMetricParameter().buttons[buttonIndex] &&
      this.getMetricParameter().buttons[buttonIndex].id
      ? this.getMetricParameter().buttons[buttonIndex].id
      : "";
  };

  getWeightValue = (buttonIndex, fieldName) => {
    let rules = this.props.metric.rules;
    if (!rules) return ""
    let weight = rules.weight;
    if (!weight) return ""
    let values_transformed = weight.values_transformed;
    if (!values_transformed) return "";
    let value = values_transformed[buttonIndex];
    if (!value) return "";
    let result = value[fieldName];
    if (result>=0) return result
    else return "";
  }

  fillButtons = metric => {
    let buttons = [];
    for (let i = 0; i < 3; i++) {
      if (
        this.getMetricParameter(metric).buttons &&
        this.getMetricParameter(metric).buttons[i]
      ) {
        let button = { id: null, text: [null, null, null] };
        if (this.getMetricParameter(metric).buttons[i].id)
          button.id = this.getMetricParameter(metric).buttons[i].id;
        for (let j = 0; j < 3; j++) {
          if (
            this.getMetricParameter(metric).buttons[i].text &&
            this.getMetricParameter(metric).buttons[i].text[j]
          )
            button.text[j] = this.getMetricParameter(metric).buttons[i].text[j];
        }

        buttons.push(button);
      } else buttons.push({ id: null, text: [null, null, null] });
    }
    return buttons;
  };

  renderButtonsText = buttonIndex => {
    let id = this.getId(buttonIndex);
    let text = [];
    let translatedMetricParameter = dataFuncs.getTranslatedViewField(
      this.props.metric,
      translatedMetric => this.getMetricParameter(translatedMetric)
    );

    for (let i = 0; i < 3; i++) {
      let value =
        translatedMetricParameter &&
        translatedMetricParameter.buttons &&
        translatedMetricParameter.buttons[buttonIndex] &&
        translatedMetricParameter.buttons[buttonIndex].text &&
        translatedMetricParameter.buttons[buttonIndex].text[i]
          ? translatedMetricParameter.buttons[buttonIndex].text[i]
          : "";
      text.push(value);
    }

    let hideTranslatedText = this.props.metric.language != "en" && !id;
    let blockClass = "block-set__settings--content-item flex w100 animated";
    if (this.props.metricParameter === "weight") {
      blockClass += " cut-weight-block";
    }

    return (
      <div className={blockClass}>
        {/* --- ID --- */}
        {this.props.metric.language === "en" && (
          <input
            className={
              id === "" && (text[0] != "" || text[1] != "" || text[2] != "")
                ? "block-set__input numeric-block animated is--error"
                : "block-set__input numeric-block animated"
            }
            type="text"
            name="id"
            placeholder="Id"
            onChange={() => {}}
            value={id}
            pattern="[0-9]*"
            onInput={e => this.onChangeButtonsId(e, buttonIndex)}
          />
        )}
        {this.props.metric.language != "en" && (
          <div className="block-set__settings--sub-title flex w100 animated">
            {id || ""}
          </div>
        )}

        {hideTranslatedText && <div className="block-set__input animated" />}

        {/* --- Min and Max for Weight --- */}

        {this.props.metric.language === "en" && this.props.metricParameter === "weight" && (
          <input
            className="block-set__input numeric-block animated"
            type="text"
            placeholder="Min"
            name="text_min"
            value={this.getWeightValue(buttonIndex, "min")}  
            onChange={e =>
              this.props.onChangeRulesValue(e.target.value, buttonIndex, "min")
            }                      
          />
        )}
               
        {this.props.metric.language === "en" && this.props.metricParameter === "weight" && (
          <input
            className="block-set__input numeric-block animated"
            type="text"
            placeholder="Max"
            name="text_max"
            value={this.getWeightValue(buttonIndex, "max")}  
            onChange={e =>
              this.props.onChangeRulesValue(e.target.value, buttonIndex, "max")
            }                                            
          />
        )}

        

        {/* --- Button Text --- */}
        {!hideTranslatedText && (
          <input
            className={
              id != "" && text[0] === ""
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
        )}

        {!hideTranslatedText && (
          <input
            className="block-set__input animated"
            type="text"
            placeholder="Text below button"
            name="text1"
            value={text[1]}
            onChange={e =>
              this.onChangeButtonsText(e.target.value, buttonIndex, 1)
            }
          />
        )}
        {hideTranslatedText && <div className="block-set__input animated" />}

        {!hideTranslatedText && (
          <input
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

  render() {
    let isChecked = false;
    if (this.getMetricParameter())
      isChecked = this.getMetricParameter().isChecked;
    let ID = this.props.caption;

    return (
      <div className="block-set__inner flex w100 v3 animated">
        <div className="block-set__item flex v2 animated">
          <div className="block-set__item--inner flex w100 animated">
            <div className="checkbox_ animated">
              <input
                onClick={() => this.onCheckboxClick()}
                className="checkbox__input animated"
                id={ID}
                type="checkbox"
              />

              <label
                style={{ paddingTop: 20 }}
                className={
                  isChecked
                    ? "checkbox__label-2 flex checked animated"
                    : "checkbox__label-2 flex animated"
                }
                htmlFor={ID}
              >
                <span className="checkbox__label-2--icon animated" />
                <span className="checkbox__label-2--text animated">
                  {this.props.caption}
                </span>
              </label>
            </div>

            <div
              className="block-set__settings w100"
              style={isChecked ? { display: "block" } : null}
            >
              <div className="block-set__settings--item flex w100 animated">
                <div className="block-set__settings--sub-title translatable flex w100 animated">
                  Title
                </div>
                <div className="block-set__settings--content flex w100 animated">
                  <MultiLanguageInput
                    placeholder="Label for buttons group"
                    viewItem={this.props.metric}
                    getFieldValue={metric =>
                      this.getMetricParameter(metric).title || ""
                    }
                    onChange={this.onChangeTitle}
                  />
                </div>
              </div>

              <div className="block-set__settings--item flex w100 animated">
                <div className="block-set__settings--sub-title flex w100 animated">
                  <div className="translatable"> </div>
                  IDs & Buttons Text*
                </div>
                <div className="block-set__settings--content flex w100 animated">
                  {this.renderButtonsText(0)}
                  {this.renderButtonsText(1)}
                  {this.renderButtonsText(2)}
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    );
  }
}

MetricButtonsPanel.propTypes = {
  metric: metricViewRedux.IMetricView,
  metricParameter: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  caption: PropTypes.string.isRequired,
  //onChange: PropTypes.func.isRequired,
  onChangeButtonsField: PropTypes.func.isRequired,
  onChangeRulesValue: PropTypes.func //argument: value, buttonIndex, fieldName, 
};
