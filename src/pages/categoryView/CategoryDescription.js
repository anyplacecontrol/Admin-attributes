import React from "react";
import PropTypes from "prop-types";
import * as dataFuncs from "../../utils/dataFuncs";
import * as categoryViewRedux from "../../redux/modules/categoryViewRedux";
// import {isEmptyOrLongString, isLongString} from "../../utils/viewValidators";
import {MultiLanguageInput} from "../../components/MultiLanguageInput/MultiLanguageInput";
import {
  getNonTranslatableViewFieldClass,
  // getNonTranslatableSelectBoxClass
} from "../../utils/viewValidators";
import {LanguagePanel} from "../../components/LanguagePanel/LanguagePanel";

export class CategoryDescription extends React.Component {
  render() {
    let isEditExisting = this.props.category.id > 0;

    return (
      <LanguagePanel
        caption="Description"
        language={this.props.category.language}
        onChangeLanguage={this.props.onChangeLanguage}
      >
        {/* ---Left side --- */}
        <div className="block-set__item flex animated">
          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__sub-title translatable flex w100 animated">
              Name*
            </div>
            <div className="block-set__content flex w100 animated">
              <MultiLanguageInput
                placeholder="Name displayed in the Kiosk"
                viewItem={this.props.category}
                getFieldValue={(item) => item.name || ""}
                onChange={this.props.onChangeName}
                canNotBeEmpty
              />
            </div>
          </div>

          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__sub-title flex w100 animated">
              Slug*
            </div>
            <div className="block-set__content flex w100 animated">
              {!isEditExisting && (
                <input
                  placeholder="Unique identifier (eg. category-name-slug)"
                  className={getNonTranslatableViewFieldClass(
                    this.props.category,
                    "slug",
                    "input",
                    true
                  )}
                  type="text"
                  value={this.props.category.slug}
                  onChange={e => this.props.onChangeSlug(e.target.value)}
                />
              )}
              {isEditExisting && <>{this.props.category.slug}</>}
            </div>
          </div>

          {isEditExisting && (
            <>
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Category ID
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {this.props.category.id}
                    </div>
                  </div>
                </div>
              </div>

              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Creation Date
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {dataFuncs.truncateDate(this.props.category.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* --- Right side --- */}
        <div className="block-set__item flex animated">
          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__sub-title flex w100 animated">
              Priority number
            </div>
            <div className="block-set__content flex w100 animated">
              {/* -- add class ".small"-- */}
              <input
                className={getNonTranslatableViewFieldClass(
                  this.props.category,
                  "priority",
                  "input"
                )}
                type="number"
                value={this.props.category.priority || 0}
                onChange={e => this.props.onChangePriority(e.target.value)}
              />
            </div>
          </div>

          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__sub-title flex w100 animated">
              Description
            </div>
            <div className="block-set__content flex w100 animated">
              <textarea
                className={getNonTranslatableViewFieldClass(
                  this.props.category,
                  "description",
                  "textarea"
                )}
                value={this.props.category.description || ""}
                onChange={e => this.props.onChangeDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
      </LanguagePanel>
    );
  }
}

CategoryDescription.propTypes = {
  category: categoryViewRedux.ICategoryView,
  onChangePriority: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onChangeSlug: PropTypes.func.isRequired,

  onChangeLanguage: PropTypes.func.isRequired
};
