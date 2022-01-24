import React from "react";
import PropTypes from "prop-types";
import * as metricViewRedux from "../../redux/modules/metricViewRedux";
import { MultiLanguageInput } from "../../components/MultiLanguageInput/MultiLanguageInput";

export class MetricTotalWeight extends React.Component {
  onChangeTitle = title => {
    this.props.onChangeTotalWeight(0, title);
  };

  onChangeUnits = units => {
    this.props.onChangeTotalWeight(1, units);
  };

  onCheckboxClick = () => {    
    let isChecked = 
     (this.props.metric && this.props.metric.metricUi && this.props.metric.metricUi.totalWeight);    

    if (isChecked) this.props.onChangeTotalWeight(null, null);
    else this.props.onChangeTotalWeight(null, []);
  };

  render() {
    let isChecked = 
      (this.props.metric && this.props.metric.metricUi && this.props.metric.metricUi.totalWeight)      

    let totalWeightCls = isChecked
      ? "block-set__tumbler active animated"
      : "block-set__tumbler animated";
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          <div className="block-set__info flex animated">
            <div className="checkbox_ animated">
              <input
                onClick={() => this.onCheckboxClick()}
                className="checkbox__input animated"
                id="total_weight"
                type="checkbox"
              />

              <label
                className={
                  isChecked
                    ? "checkbox__label-2 flex checked animated"
                    : "checkbox__label-2 flex animated"
                }
                htmlFor="total_weight"
              >
                <span className="checkbox__label-2--icon animated" />
                <span className="checkbox__label-2--text animated">
                  Use Total Weight
                </span>
                <p>
                  <br />
                  Used if kiosk needs to display total weight of product
                  (like ground) in packages
                  <br />
                  Note: weight button id must be equal to exact weight of
                  package (id 1 = 1 lb, id 2 = 2 lbs...)
                </p>
              </label>
            </div>
          </div>
        </div>
        {isChecked && (
          <div className="block-set__inner flex w100 animated">
            {/*------- Left panel-------- */}
            <div className="block-set__item flex animated">
              {/* --Title-- */}
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title translatable flex w100 animated">
                  Title
                </div>
                <div className="block-set__content flex w100 animated">                 
                  <MultiLanguageInput
                    placeholder="ex. 'Total Weight'"
                    viewItem={this.props.metric}
                    getFieldValue={item => {                      
                      if (!item.metricUi || !item.metricUi.totalWeight) return "";
                      return item.metricUi.totalWeight[0] || "";
                    }}
                    onChange={this.onChangeTitle}
                  />
                </div>
              </div>
            </div>

            {/*------- Right panel-------- */}
            <div className="block-set__item flex animated">
              {/* --Units-- */}
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title translatable flex w100 animated">
                  Units
                </div>
                <div className="block-set__content flex w100 animated">
                <MultiLanguageInput
                    placeholder="ex. 'lb(s)'"
                    viewItem={this.props.metric}
                    getFieldValue={item => {                      
                      if (!item.metricUi || !item.metricUi.totalWeight) return "";
                      return item.metricUi.totalWeight[1] || "";
                    }}
                    onChange={this.onChangeUnits}
                  />                
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

MetricTotalWeight.propTypes = {
  metric: metricViewRedux.IMetricView,  
  onChangeTotalWeight: PropTypes.func.isRequired
};
