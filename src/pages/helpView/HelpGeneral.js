import React from "react";
import PropTypes from "prop-types";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import * as dataFuncs from "../../utils/dataFuncs";
import { FAKE_CATEGORIES_RESPONSE } from "../../fakeDb/fakeCategories";
import { FAKE_PRODUCTS_RESPONSE } from "../../fakeDb/fakeProducts";

export class HelpGeneral extends React.Component {
  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">General (hardcoded)</div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
            {/* ---ID--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                ID
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    12345667
                  </div>
                </div>
              </div>
            </div>

            {/* ---Help Category--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Help Category
              </div>
              <div className="block-set__content flex w100 animated">
                <SelectBox
                  className="w100"
                  style={{ zIndex: 2 }}
                  text={"Payments"}
                  items={dataFuncs.createMultiSelectBoxItems(
                    [],
                    [],
                    "name",
                    "id"
                    // this.props.onChangeCategory
                  )}
                  isCheckboxItems={true}
                />
              </div>
            </div>

            {/* ---Title--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Title
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  type="text"
                  value="Beef Stir-Fry"
                  onChange={() => {}}
                />
              </div>
            </div>

            {/* ---Priority Number--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Priority Number
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  type="text"
                  value="100"
                  onChange={() => {}}
                />
              </div>
            </div>


          </div>

          {/* ---Right Panel--- */}
          <div className="block-set__item flex animated">
           {/* ---Status--- */}
           <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Status
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  {this.props.status && (
                    <>
                      <div className="block-set__tumbler active animated" />
                      <div className="block-set__info--title animated">
                        Enabled
                      </div>
                    </>
                  )}
                  {!this.props.status && (
                    <>
                      <div className="block-set__tumbler animated" />

                      <div className="block-set__info--title animated">
                        Disabled
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* ---Date--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Date
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    Oct 15, 2019, 4:38 PM
                  </div>
                </div>
              </div>
            </div>

            {/* ---Description --- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Description
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  className="block-set__text-area animated"
                  value="Type in..."
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HelpGeneral.propTypes = {
  onChangeType: PropTypes.func,
  onChangeCategory: PropTypes.func,
  onChangeProduct: PropTypes.func,
  status: PropTypes.bool
};
