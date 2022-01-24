import React from "react";
import PropTypes from "prop-types";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import { IProductView } from "../../redux/modules/productViewRedux";
import { ICategoryView } from "../../redux/modules/categoryViewRedux";
import { ITagView } from "../../redux/modules/tagViewRedux";
import { IMetricView } from "../../redux/modules/metricViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import * as consts from "../../consts/constants";
import { LanguagePanel } from "../../components/LanguagePanel/LanguagePanel";
import { MultiLanguageInput } from "../../components/MultiLanguageInput/MultiLanguageInput";
import {
  getNonTranslatableViewFieldClass,
  getNonTranslatableSelectBoxClass
} from "../../utils/viewValidators";

export class ProductDetails extends React.Component {
  renderCategoriesSelectBox = () => {
    let itemsArr = this.props.allCategories.map((category, index) => {
      return {
        text: category.name,
        onClick: () => this.props.onChangeCategory(category.name)
      };
    });

    let currentText;
    if (this.props.product.categories.length > 0)
      currentText = dataFuncs.categoriesAsString(this.props.product.categories);
    else currentText = consts.chooseStr;

    return (
      <SelectBox
        style={{ zIndex: 3 }}
        className={getNonTranslatableSelectBoxClass(
          this.props.product,
          this.props.product.categories.length === 0
        )}
        text={currentText}
        items={itemsArr}
      />
    );
  };

  renderMetricsSelectBox = () => {
    let itemsArr = [
      { text: "--Empty--", onClick: () => this.props.onChangeMetric(null) }
    ];

    for (let i = 0; i < this.props.allMetrics.length; i++) {
      itemsArr.push({
        text: this.props.allMetrics[i].name,
        onClick: () => this.props.onChangeMetric(this.props.allMetrics[i])
      });
    }

    let currentText;
    if (this.props.product.metric) currentText = this.props.product.metric.name;
    else currentText = consts.chooseStr;

    return (
      <SelectBox
        style={{ zIndex: 2 }}
        className={getNonTranslatableSelectBoxClass(this.props.product)}
        text={currentText}
        items={itemsArr}
      />
    );
  };

  render() {
    let isCreateNew = this.props.product.id == "";

    return (
      <LanguagePanel
        caption="Details"
        language={this.props.product.language}
        onChangeLanguage={this.props.onChangeLanguage}
      >
        {/* ---Left side---- */}
        <div className="block-set__item flex animated">
          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__sub-title translatable flex w100 animated">
              Name*
            </div>
            <div className="block-set__content flex w100 animated">
              <MultiLanguageInput
                placeholder="Name on the Kiosk's product screen"
                viewItem={this.props.product}
                getFieldValue={(item)=>item.name || ""}
                onChange={this.props.onChangeName}
                canNotBeEmpty
              />
            </div>
          </div>

          {/* -- Category -- */}
          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__sub-title flex w100 animated">
              Category*
            </div>
            <div className="block-set__content flex w100 animated">
              {this.renderCategoriesSelectBox()}
            </div>
          </div>

          {/* ---PS mapping name--- */}
          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__sub-title flex w100 animated">
              PS mapping name
            </div>
            <div className="block-set__content flex w100 animated">
              <input
                placeholder="Unique Product ID from Progressive Scale"
                className={getNonTranslatableViewFieldClass(
                  this.props.product,
                  "masterProductGroupName",
                  "input",
                  true
                )}
                type="text"
                value={this.props.product.masterProductGroupName || ""}
                onChange={e =>
                  this.props.onChangeMasterProductGroupName(e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* ---Right side---- */}
        <div className="block-set__item flex animated">
          {/* -- Metric -- */}
          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__sub-title flex w100 animated">
              Metric
            </div>
            <div className="block-set__content flex w100 animated">
              {this.renderMetricsSelectBox()}
            </div>
          </div>
          {/* --- Tag--- */}
          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__sub-title flex w100 animated">Tag</div>
            <div className="block-set__content flex w100 animated">
              <SelectBox
                className={getNonTranslatableSelectBoxClass(this.props.product)}
                text={dataFuncs.tagsAsString(this.props.product.tags)}
                items={dataFuncs.createMultiSelectBoxItems(
                  this.props.allTags,
                  this.props.product.tags,
                  "name",
                  "id",
                  this.props.onChangeTags
                )}
                isCheckboxItems={true}
              />
            </div>
          </div>

          {/* ---Additional description--- */}
          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__sub-title translatable flex w100 animated">
              Additional Description
            </div>
            <div className="block-set__content flex w100 animated">
              <MultiLanguageInput
                placeholder="eg. for sausages: 'Pack of 4 - approx. 1lb'"
                viewItem={this.props.product}
                getFieldValue={(item)=>item.additionalDescription || ""}
                onChange={this.props.onChangeAdditionalDescription}
              />
            </div>
          </div>

          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__sub-title translatable flex w100 animated">
              Description
            </div>
            <div className="block-set__content flex w100 animated">
              <MultiLanguageInput
                inputType="textarea"
                placeholder="Description on the Kiosk's product screen"
                viewItem={this.props.product}
                getFieldValue={(item)=>item.description || ""}
                onChange={this.props.onChangeDescription}
              />
            </div>
          </div>
        </div>
      </LanguagePanel>
    );
  }
}

ProductDetails.propTypes = {
  product: IProductView,
  allCategories: PropTypes.arrayOf(ICategoryView).isRequired,
  allTags: PropTypes.arrayOf(ITagView).isRequired,
  allMetrics: PropTypes.arrayOf(IMetricView).isRequired,

  onChangeCategory: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onChangeSlug: PropTypes.func.isRequired,
  onChangeMasterProductGroupName: PropTypes.func.isRequired,
  onChangeAdditionalDescription: PropTypes.func.isRequired,
  onChangeTags: PropTypes.func.isRequired, //argument is ITagView object
  onChangeMetric: PropTypes.func.isRequired, //argument is IMetricView object

  onChangeLanguage: PropTypes.func.isRequired
};
