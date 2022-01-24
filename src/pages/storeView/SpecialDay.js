import React from "react";
import PropTypes from "prop-types";
import { IWorkDay } from "../../redux/modules/storeViewRedux";
import DatePicker from "react-datepicker";
import "../../assets/css/react-datepicker.css";

export class SpecialDay extends React.Component {
  render() {
    let tumblerCls = !this.props.workDay.isDayOff
      ? "block-set__tumbler active animated"
      : "block-set__tumbler animated";

    return (
      <>
        {/* Date */}
        <div className="block-set__item--inner flex w100 animated">
          <div className="block-set__sub-title flex w100 animated">
            Special Date *
          </div>
          <div className="block-set__content flex w100 animated">
            {/* <input
              className="block-set__input animated"              
            /> */}
            
            <DatePicker
              placeholderText={"Click to select..."}
              selected={this.props.workDay.specialDate ? new Date(this.props.workDay.specialDate) : null}
              onChange={date => {
                  this.props.changeSpecialDate(
                    this.props.workDay,
                    date
                  );
                }}
              isClearable
            />
          </div>
        </div>

        <div className="block-set__item--inner flex w100 animated">
          <div className="block-set__sub-title flex w100 animated">Name</div>
          <div className="block-set__content flex w100 animated">
            <input
              className="block-set__input animated"
              placeholder={"Name of special day"}
              value={this.props.workDay.name || ""}
              onChange={e =>
                this.props.changeDayName(this.props.workDay, e.target.value)
              }
            />
          </div>
        </div>

        {/* Working Hours */}
        <div className="block-set__item--inner flex w100 animated special-day-block">
          {!this.props.workDay.isDayOff && (
            <div className="block-set__sub-title flex w100 animated">
              Working Hours
            </div>
          )}

          {!this.props.workDay.isDayOff && (
            <div className="block-set__content flex w100 animated">
              <input
                className="block-set__input animated workday-input"
                placeholder={"HH:MM"}
                value={this.props.workDay.openTime || ""}
                onChange={e => {
                  this.props.changeOpenTime(this.props.workDay, e.target.value);
                }}
              />
              <span className="text-primary">AM</span>
              <input
                className="block-set__input animated workday-input"
                placeholder={"HH:MM"}
                value={this.props.workDay.closeTime || ""}
                onChange={e => {
                  this.props.changeCloseTime(
                    this.props.workDay,
                    e.target.value
                  );
                }}
              />
              <span className="text-primary">PM</span>
            </div>
          )}
        </div>

        <div className="block-set__item--inner flex w100 animated special-day-block  bottom-line">
          <div className="block-set__sub-title flex w100 animated">
            <div
              className={tumblerCls}
              onClick={() => this.props.triggerDayOff(this.props.workDay)}
            />
            {this.props.workDay.isDayOff ? "Day Off" : "Working day"}
          </div>
          <div className="block-set__content flex w100 animated">
            <button
              onClick={()=>this.props.deleteDay(this.props.workDay)}
              type="button"
              className="buttons__item flex workday-button animated"
            >
              Delete
            </button>
          </div>
        </div>
      </>
    );
  }
}

SpecialDay.propTypes = {
  workDay: IWorkDay,
  changeOpenTime: PropTypes.func.isRequired, //arguments: (workDay, value)
  changeCloseTime: PropTypes.func.isRequired, //arguments: (workDay, value)
  changeSpecialDate: PropTypes.func.isRequired, //arguments: (workDay, value)
  triggerDayOff: PropTypes.func.isRequired, //argument is workDay
  changeDayName: PropTypes.func.isRequired, //arguments: (workDay, value)
  deleteDay: PropTypes.func.isRequired //argument is workDay
};
