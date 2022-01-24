import React from "react";
import PropTypes from "prop-types";
import { ICustomerView } from "../../redux/modules/customerViewRedux";
import {
  getPhonesValidationError,
  getPhoneValidationError,
  getEmailsValidationError,
  getEmailValidationError
} from "../../utils/viewValidators";

export class CustomerGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.customer.id != "";

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">General (Emulated)</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {isEditExisting && (
              <>
                {/* Customer ID */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Customer ID
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {this.props.customer.id}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Name */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Name
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={this.props.customer.name}
                  onChange={e => this.props.onChangeName(e.target.value)}
                />
              </div>
            </div>

            {/* Primary Email */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Primary Email
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.customer.isValidated ||
                    !getEmailValidationError(this.props.customer.email)
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.customer.email}
                  onChange={e =>
                    this.props.onChangePrimaryEmail(e.target.value)
                  }
                />
              </div>
            </div>

            {/* Secondary Emails */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Secondary Emails (comma separated)
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  className={
                    !this.props.customer.isValidated ||
                    !getEmailsValidationError(
                      this.props.customer.secondaryEmails_asString
                    )
                      ? "block-set__text-area"
                      : "block-set__text-area is--error"
                  }
                  value={this.props.customer.secondaryEmails_asString || ""}
                  onChange={e =>
                    this.props.onChangeSecondaryEmails(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/* Primary Phone */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Primary Phone
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.customer.isValidated ||
                    !getPhoneValidationError(this.props.customer.phone)
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.customer.phone}
                  onChange={e =>
                    this.props.onChangePrimaryPhone(e.target.value)
                  }
                />
              </div>
            </div>

            {/* Secondary Phones */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Secondary Phones (comma separated)
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  className={
                    !this.props.customer.isValidated ||
                    !getPhonesValidationError(
                      this.props.customer.secondaryPhones_asString
                    )
                      ? "block-set__text-area"
                      : "block-set__text-area  is--error"
                  }
                  value={this.props.customer.secondaryPhones_asString || ""}
                  onChange={e =>
                    this.props.onChangeSecondaryPhones(e.target.value)
                  }
                />
              </div>
            </div>

            {isEditExisting && (
              <>
                {/* Status */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Status
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {this.props.customer.status.name}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Platforms */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Platforms
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        { this.props.customer.platforms ? this.props.customer.platforms.join(","): ""}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

CustomerGeneral.propTypes = {
  customer: ICustomerView,
  onChangeName: PropTypes.func.isRequired,
  onChangePrimaryEmail: PropTypes.func.isRequired,
  onChangeSecondaryEmails: PropTypes.func.isRequired,
  onChangePrimaryPhone: PropTypes.func.isRequired,
  onChangeSecondaryPhones: PropTypes.func.isRequired
};
