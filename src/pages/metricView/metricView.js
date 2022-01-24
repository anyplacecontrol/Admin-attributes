import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as metricViewRedux from "../../redux/modules/metricViewRedux";
import { MetricGeneral } from "./MetricGeneral";
import { MetricTotalWeight } from "./MetricTotalWeight";
import { MetricButtonsPanel } from "./MetricButtonsPanel";
import { BaseView } from "../../components/BaseView/BaseView";
import { LanguageButtons } from "../../components/LanguageButtons/LanguageButtons";

export class metricView_ extends React.Component {
  onChangeName = newValue => {
    this.props.dispatch(metricViewRedux.metricViewActions.changeName(newValue));
  };

  onChangePriceMeasure = newValue => {
    this.props.dispatch(
      metricViewRedux.metricViewActions.changeMultiLanguagePriceMeasure(
        newValue
      )
    );
  };

  onChangeDescription = newValue => {
    this.props.dispatch(
      metricViewRedux.metricViewActions.changeDescription(newValue)
    );
  };

  onChangeTotalWeight = (arrayIndex, newValue) => {
    if (arrayIndex == null)
      this.props.dispatch(
        metricViewRedux.metricViewActions.changeTotalWeight(newValue)
      );
    else
      this.props.dispatch(
        metricViewRedux.metricViewActions.changeMultiLanguageTotalWeightField(
          arrayIndex,
          newValue
        )
      );
  };

  onChangeButtonsField = async (pathToField, newValue, isTranslatable=true) => {
    await this.props.dispatch(
      metricViewRedux.metricViewActions.changeMultiLanguageButtonsField(
        pathToField, newValue, isTranslatable
      )
    );
  }

  onChangeRulesValue = (newValue, buttonIndex, fieldName) => {
     this.props.dispatch(
      metricViewRedux.metricViewActions.changeWeightRulesValue(
        newValue, buttonIndex, fieldName
      )
    );
  }
    
  // onChangeWeight = newValue => {
  //   this.props.dispatch(
  //     metricViewRedux.metricViewActions.changeWeight(newValue)
  //   );
  // };

  // onChangeThickness = newValue => {
  //   this.props.dispatch(
  //     metricViewRedux.metricViewActions.changeThickness(newValue)
  //   );
  // };

  // onChangeMarbling = newValue => {
  //   this.props.dispatch(
  //     metricViewRedux.metricViewActions.changeMarbling(newValue)
  //   );
  // };

  onChangeLanguage = lang => {
    this.props.dispatch(metricViewRedux.metricViewActions.changeLanguage(lang));
  };

  beforeOnSubmitClick = async () => {
    this.props.dispatch(metricViewRedux.metricViewActions.changeLanguage("en"));
  };

  render() {
    return (
      <BaseView
        viewName="Variation"
        actionsProvider={metricViewRedux.metricViewActions}
        beforeOnSubmitClick={this.beforeOnSubmitClick}
      >
        <LanguageButtons
          language={this.props.metric.language}
          onChangeLanguage={this.onChangeLanguage}
        />

        <MetricGeneral
          metric={this.props.metric}
          onChangeName={this.onChangeName}
          onChangePriceMeasure={this.onChangePriceMeasure}
          onChangeDescription={this.onChangeDescription}
        />

        <div className="block-set__box flex animated">
          <div
            className="block-set__title animated"
          >
            Buttons*
          </div>
          <div>
            {/* --Weight buttons panel-- */}
            <MetricButtonsPanel
              metric={this.props.metric}
              metricParameter = "weight"
              caption="Weight Buttons"
              onChangeButtonsField={this.onChangeButtonsField}
              onChangeRulesValue={this.onChangeRulesValue}
            />

            {/* --Thickness buttons panel-- */}
            <MetricButtonsPanel
              metric={this.props.metric}
              metricParameter = "thickness"
              caption="Thickness Buttons"
              onChangeButtonsField={this.onChangeButtonsField}
            />
            {/* --Marbling buttons panel-- */}
            <MetricButtonsPanel
              metric={this.props.metric}
              metricParameter = "marbling"
              caption="Marbling Buttons"
              onChangeButtonsField={this.onChangeButtonsField}
            />
          </div>
        </div>

        <MetricTotalWeight
          metric={this.props.metric}
          onChangeTotalWeight={this.onChangeTotalWeight}
        />
      </BaseView>
    );
  }
}

metricView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  metric: metricViewRedux.IMetricView
};

function mapStateToProps(state) {
  return {
    metric: state.metricView
  };
}

export const metricView = connect(mapStateToProps)(metricView_);
