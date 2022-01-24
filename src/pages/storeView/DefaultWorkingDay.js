import React from "react";
import PropTypes from "prop-types";
import { IWorkDay } from "../../redux/modules/storeViewRedux";
import * as serviceFuncs from "../../utils/serviceFunctions";

export class DefaultWorkingDay extends React.Component {
  render() {
    let tumblerCls = !this.props.workDay.isDayOff
      ? "block-set__tumbler active animated"
      : "block-set__tumbler animated";

    let opacity = this.props.workDay.isDayOff ? 0 : 1;

    return (
      <div className="block-set__item--inner flex w100 animated workday-block">
        <div className="block-set__content flex w100 animated">
          <span className="workday-title">
            {serviceFuncs.dayOfWeekToStr(this.props.workDay.dayOfWeek)}
          </span>

          <div
            className="block-set__info flex animated workday-tumbler"
            onClick={() => this.props.triggerDayOff(this.props.workDay)}
          >
            <div className={tumblerCls} />
          </div>

          <>
            {opacity===0 && <span className="text-primary"  style={{ marginLeft: 32 }} >Day Off</span> }

            {opacity === 1 &&
            <input
              style={{ opacity }}
              className="block-set__input animated workday-input"
              placeholder="HH:MM"
              value={this.props.workDay.openTime}
              onChange={e => {
                if (opacity)
                  this.props.changeOpenTime(this.props.workDay, e.target.value);
              }}
            />
            }
            <span className="text-primary" style={{ opacity }}>
              AM
            </span>
            <input
              style={{ opacity }}
              className="block-set__input animated workday-input"
              placeholder="HH:MM"
              value={this.props.workDay.closeTime}
              onChange={e => {
                if (opacity)
                  this.props.changeCloseTime(
                    this.props.workDay,
                    e.target.value
                  );
              }}
            />
            <span className="text-primary" style={{ opacity }}>
              PM
            </span>
          </>
        </div>
      </div>
    );
  }
}

DefaultWorkingDay.propTypes = {
  workDay: IWorkDay,
  changeOpenTime: PropTypes.func.isRequired, //arguments: (workDay, value)
  changeCloseTime: PropTypes.func.isRequired, //arguments: (workDay, value)
  triggerDayOff: PropTypes.func.isRequired //argument is id
};
