import React from "react";
import {ILogsView} from "../../redux/modules/logsViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";

export class LogsGeneral extends React.Component {
  render() {
    const formattedDate = dataFuncs.truncateDate(this.props.log.Date) + dataFuncs.getGmtTimeFormat(this.props.log.Date);

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
                    {this.props.log.machine ? this.props.log.machine.name : ''}
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

          </div>

          {/* ---Right Panel--- */}
          <div className="block-set__item flex animated">

            {/* ---Log Level--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Log Level
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.log.Log.Level}
                  </div>
                </div>
              </div>
            </div>

            {/* ---Log Timestamp--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Log Timestamp
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.log.Log.Timestamp}
                  </div>
                </div>
              </div>
            </div>

            {/* ---Log Message--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Log Message
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.log.Log.Message}
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

LogsGeneral.propTypes = {
  log: ILogsView,
};
