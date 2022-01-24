import React from "react";
import PropTypes from "prop-types";

export class CustomerAutoCommunication extends React.Component {

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Automated Communication Preferences (Synced with Mailchimp and App)</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/*  Monthly E-mails */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
              Monthly E-mails
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    Yes (hardcoded)
                  </div>
                </div>
              </div>
            </div>

            {/*   Occasional Special E-mails */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Occasional Special E-mails
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    No (hardcoded)
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/*  SMS Alerts */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                SMS Alerts
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    Yes (hardcoded)
                  </div>
                </div>
              </div>
            </div>

            {/*  SMS Alerts */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                App Alerts
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    Yes (hardcoded)
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

CustomerAutoCommunication.propTypes = {
  
};
