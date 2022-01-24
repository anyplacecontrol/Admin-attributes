import React from "react";
import PropTypes from "prop-types";
import { IStoreView, IWorkDay } from "../../redux/modules/storeViewRedux";
import { DefaultWorkingDay } from "./DefaultWorkingDay";
import { SpecialDay } from "./SpecialDay";

export class StoreWorkingHours extends React.Component {
  renderDefaultDays() {
    let arr = [];
    for (let day = 1; day <= 7; day++) {
      for (let i = 0; i < this.props.WorkHours.length; i++) {
        if (
          this.props.WorkHours[i].dayOfWeek === day &&
          this.props.WorkHours[i].isDefault
        ) {
          arr.push(
            <DefaultWorkingDay
              key={i}
              workDay={this.props.WorkHours[i]}
              changeOpenTime={this.props.changeOpenTime}
              changeCloseTime={this.props.changeCloseTime}
              triggerDayOff={this.props.triggerDayOff}
            />
          );
          break;
        }
      }
    }
    return arr;
  }

  renderSpecialDays() {
    let arr = [];

    for (let i = 0; i < this.props.WorkHours.length; i++) {
      if (                
        !this.props.WorkHours[i].isDefault
      ) {
        arr.push(
          <SpecialDay
            key={i}
            workDay={this.props.WorkHours[i]}
            changeOpenTime={this.props.changeOpenTime}
            changeCloseTime={this.props.changeCloseTime}
            changeDayName={this.props.changeDayName}  
            changeSpecialDate={this.props.changeSpecialDate}        
            triggerDayOff={this.props.triggerDayOff}
            deleteDay={this.props.deleteDay}
          />
        );        
      }
    }

    return arr;
  }

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Working Hours</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {this.renderDefaultDays()}
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {this.renderSpecialDays()}

            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated mt-10">
                  <button
                    type="button"
                    onClick={()=>this.props.addSpecialDay()}
                    className="buttons__item flex workday-button animated"
                  >
                    Add a Special Day
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StoreWorkingHours.propTypes = {
  WorkHours: PropTypes.arrayOf(IWorkDay),
  changeOpenTime: PropTypes.func.isRequired,
  changeCloseTime: PropTypes.func.isRequired,
  triggerDayOff: PropTypes.func.isRequired,
  changeDayName: PropTypes.func.isRequired,
  changeSpecialDate: PropTypes.func.isRequired,
  deleteDay: PropTypes.func.isRequired,
  addSpecialDay: PropTypes.func.isRequired, 
};
