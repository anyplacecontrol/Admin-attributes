import React from "react";
import PropTypes from "prop-types";
import * as controlViewRedux from "../../redux/modules/controlViewRedux";
import { controlViewActions } from "../../redux/modules/controlViewRedux";
import { connect } from "react-redux";
import { LanguageButtons } from "../../components/LanguageButtons/LanguageButtons";
import { MultiLanguageInput } from "../../components/MultiLanguageInput/MultiLanguageInput";
import { RangeButtons } from "./valuesText/RangeButtons";
import { ValueButtons } from "./valuesText/ValueButtons"

export class ControlValuesText_ extends React.Component {
  //------------------------------------------------------------------------------------

  onChangeLanguage = lang => {
    this.props.dispatch(controlViewActions.changeLanguage(lang));
  };

  onChangeTitle = newValue => {
    this.props.dispatch(
      controlViewActions.changeTranslatedTextMappingField("title", newValue)
    );
  };

  //=====================================================================================
  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__inner flex w100 animated">
          <LanguageButtons
            language={this.props.control.language}
            onChangeLanguage={this.onChangeLanguage}
          />
        </div>

        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__sub-title flex w100 animated translatable">
              Title*
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

        {/* Content which depends on type of control   */}
        {this.props.control.controlType === "rangeButtons" ? (
          <RangeButtons />
        ) : null}
        {this.props.control.controlType === "valueButtons" ? (
          <ValueButtons />
        ) : null}
        
      </div>
    );
  }
}

ControlValuesText_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  control: controlViewRedux.IControlView,
  onChangeLanguage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    control: state.controlView
  };
}

export const ControlValuesText = connect(mapStateToProps)(ControlValuesText_);
