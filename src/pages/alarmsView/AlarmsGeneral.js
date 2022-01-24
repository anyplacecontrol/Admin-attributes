import React from "react";
import {IAlarmsView} from "../../redux/modules/alarmsViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";

export class AlarmsGeneral extends React.Component {
  render() {
    const formattedDate = dataFuncs.truncateDate(this.props.alarm.Date) + dataFuncs.getGmtTimeFormat(this.props.alarm.Date);

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          General
        </div>
        <div className="block-set__inner flex w100 animated">

          {/* ---Left Panel--- */}
          <div className="block-set__item flex animated">

            {/* ---Machine--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Machine
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.alarm.machine ? this.props.alarm.machine.name : ''}
                  </div>
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
                    {formattedDate}
                  </div>
                </div>
              </div>
            </div>

            {/* ---Message--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Message
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.alarm.Data.Message}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ---Right Panel--- */}
          <div className="block-set__item flex animated">

            {/* ---AlarmID--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Alarm ID
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.alarm.AlarmID}
                  </div>
                </div>
              </div>
            </div>

            {/* ---AlarmType--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Alarm Type
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.alarm.AlarmType}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }
}

AlarmsGeneral.propTypes = {
  alarm: IAlarmsView,
};
