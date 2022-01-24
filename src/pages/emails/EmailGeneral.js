import React from "react";
import PropTypes from "prop-types";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import * as dataFuncs from "../../utils/dataFuncs";
import { DateRangeBox } from "../../components/DateRangeBox/DateRangeBox";


export class EmailGeneral extends React.Component {
  onValueChange = (filterItem, newValue) => {
    this.onChangeFilterValue(filterItem, newValue);
  };
  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">General (hardcoded)</div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
            {/* ---Date--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Date
              </div>
              <div
                className="block-set__content flex w100 animated"
                style={{ zIndex: 3 }}
              >
                <DateRangeBox
                  useAdvancedInterface
                  filterItem={this.props.filterItems}
                  onValueChange={this.onValueChange}
                  className="filter__calendar w100r animated"
                />
              </div>
            </div>

            {/* ---Periodicity--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Frequency
              </div>
              <div className="block-set__content flex w100 animated">
                <SelectBox
                  className="w100"
                  style={{ zIndex: 2 }}
                  text={"Select Frequency"}
                  items={dataFuncs.createMultiSelectBoxItems(
                    [
                      { name: "Daily", id: "Daily" },
                      { name: "Weekly", id: "Weekly" },
                      { name: "Monthly", id: "Monthly" }
                    ],
                    [],
                    "name",
                    "id"
                    // this.props.onChangeCategory
                  )}
                  isCheckboxItems={true}
                />
              </div>
            </div>

            {/* ---Blast Time--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Blast Time
              </div>
              <div className="block-set__content flex w100 animated" style={{zIndex: 1}}>
              <div className="block-set__input animated">
                {/* <DatePicker
                  selected={this.props.startDate}
                  onChange={date => this.props.setStartDate(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={10}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                /> */}
                </div>
              </div>
            </div>
          </div>

          {/* ---Right Panel--- */}
          <div className="block-set__item flex animated">
            {/* ---Store--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Store
              </div>
              <div className="block-set__content flex w100 animated">
                <SelectBox
                  className="w100"
                  style={{ zIndex: 5 }}
                  text={"Select Store"}
                  items={dataFuncs.createMultiSelectBoxItems(
                    [
                      { name: "0923834", id: "0923834" },
                      { name: "6984576", id: "6984576" },
                      { name: "5648932", id: "5648932" },
                      { name: "3654896", id: "3654896" },
                      { name: "1253684", id: "1253684" }
                    ],
                    [],
                    "name",
                    "id"
                    // this.props.onChangeCategory
                  )}
                  isCheckboxItems={true}
                />
              </div>
            </div>

            {/* ---Kiosk--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Kiosk
              </div>
              <div className="block-set__content flex w100 animated">
                <SelectBox
                  className="w100"
                  style={{ zIndex: 4 }}
                  text={"Select Kiosk"}
                  items={dataFuncs.createMultiSelectBoxItems(
                    [
                      { name: "0923834", id: "0923834" },
                      { name: "6984576", id: "6984576" },
                      { name: "5648932", id: "5648932" },
                      { name: "3654896", id: "3654896" },
                      { name: "1253684", id: "1253684" }
                    ],
                    [],
                    "name",
                    "id"
                    // this.props.onChangeCategory
                  )}
                  isCheckboxItems={true}
                />
              </div>
            </div>

            {/* ---Machine--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Machine
              </div>
              <div className="block-set__content flex w100 animated">
                <SelectBox
                  className="w100"
                  style={{ zIndex: 2 }}
                  text={"Select Machine"}
                  items={dataFuncs.createMultiSelectBoxItems(
                    [
                      { name: "0923834", id: "0923834" },
                      { name: "6984576", id: "6984576" },
                      { name: "5648932", id: "5648932" },
                      { name: "3654896", id: "3654896" },
                      { name: "1253684", id: "1253684" }
                    ],
                    [],
                    "name",
                    "id"
                    // this.props.onChangeCategory
                  )}
                  isCheckboxItems={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EmailGeneral.propTypes = {
  startDate: PropTypes.object,
  setStartDate: PropTypes.object,
  filterItems: PropTypes.object,
  onChangeType: PropTypes.func,
  onChangeCategory: PropTypes.func,
  onChangeProduct: PropTypes.func,
  status: PropTypes.bool
};
