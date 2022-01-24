import React from "react";
import PropTypes from "prop-types";
import * as metricViewRedux from "../../redux/modules/metricViewRedux";
import { MultiLanguageInput } from "../../components/MultiLanguageInput/MultiLanguageInput";
import {
  getNonTranslatableViewFieldClass,  
} from "../../utils/viewValidators";

export class MetricGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.metric.id > 0;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">General</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* --Name-- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Name*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                 className={getNonTranslatableViewFieldClass(
                    this.props.metric,
                    "name",
                    "input",
                    true
                  )}               
                  type="text"
                  value={this.props.metric.name}
                  onChange={e => this.props.onChangeName(e.target.value)}
                />
              </div>
            </div>

            {/* --price Measure-- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title translatable flex w100 animated">
                Price Measure
              </div>
              <div className="block-set__content flex w100 animated">               
                <MultiLanguageInput
                  placeholder="ex. 'lb'"
                  viewItem={this.props.metric}
                  getFieldValue={item => item.metricUi.priceMeasure || ""}
                  onChange={this.props.onChangePriceMeasure}                  
                />
              </div>
            </div>

            {isEditExisting && (
              <>
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    ID
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {this.props.metric.id}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Description
              </div>
              <div className="block-set__content flex w100 animated">
                 <textarea 
                  placeholder="Description is not displayed on kiosk"                 
                  className={getNonTranslatableViewFieldClass(
                  this.props.metric,
                  "description",
                  "textarea"
                )}
                  value={this.props.metric.description || ""}
                  onChange={e => this.props.onChangeDescription(e.target.value)}
                />                 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MetricGeneral.propTypes = {
  metric: metricViewRedux.IMetricView,
  onChangeName: PropTypes.func.isRequired,
  onChangePriceMeasure: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired
};
