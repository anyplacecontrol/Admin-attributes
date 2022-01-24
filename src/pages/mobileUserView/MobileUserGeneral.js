import React from "react";
import PropTypes from "prop-types";
import {IMobileUserView} from "../../redux/modules/mobileUserViewRedux";
import {
  getPhoneValidationError,
  getEmailValidationError
} from "../../utils/viewValidators";

export class MobileUserGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.mobileUser.id != "";

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          General
        </div>
        <div className="block-set__inner flex w100 animated">

          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {isEditExisting && (
              <>
                {/* Cloud ID */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Cloud ID
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {this.props.mobileUser.id}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* First Name */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                First Name
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={this.props.mobileUser.firstName}
                  onChange={e => this.props.onChangeFirstName(e.target.value)}
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Last Name
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={this.props.mobileUser.lastName}
                  onChange={e => this.props.onChangeLastName(e.target.value)}
                />
              </div>
            </div>

            {/*{isEditExisting && (*/}
            {/*  <>*/}
            {/*    /!* Cognito User ID *!/*/}
            {/*    <div className="block-set__item--inner flex w100 animated">*/}
            {/*      <div className="block-set__sub-title flex w100 animated">*/}
            {/*        Cognito User ID*/}
            {/*      </div>*/}
            {/*      <div className="block-set__content flex w100 animated">*/}
            {/*        <div className="block-set__info flex animated">*/}
            {/*          <div className="block-set__info--title animated">*/}
            {/*            {this.props.mobileUser.cognitoUserId}*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}

            {/*    /!* Stripe Customer ID *!/*/}
            {/*    <div className="block-set__item--inner flex w100 animated">*/}
            {/*      <div className="block-set__sub-title flex w100 animated">*/}
            {/*        Stripe Customer ID*/}
            {/*      </div>*/}
            {/*      <div className="block-set__content flex w100 animated">*/}
            {/*        <div className="block-set__info flex animated">*/}
            {/*          <div className="block-set__info--title animated">*/}
            {/*            {this.props.mobileUser.stripeCustomerId}*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </>*/}
            {/*)}*/}

          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">

            {/*{isEditExisting && (*/}
            {/*  <>*/}
            {/*    /!* Status *!/*/}
            {/*    <div className="block-set__item--inner flex w100 animated">*/}
            {/*      <div className="block-set__sub-title flex w100 animated">*/}
            {/*        StatusID*/}
            {/*      </div>*/}
            {/*      <div className="block-set__content flex w100 animated">*/}
            {/*        <div className="block-set__info flex animated">*/}
            {/*          <div className="block-set__info--title animated">*/}
            {/*            {this.props.mobileUser.statusId}*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </>*/}
            {/*)}*/}

            {/* Phone */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Phone
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.mobileUser.isValidated ||
                    !getPhoneValidationError(this.props.mobileUser.phone)
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.mobileUser.phone}
                  onChange={e =>
                    this.props.onChangePhone(e.target.value)
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Email
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.mobileUser.email}
                  </div>
                </div>
                {/*<input*/}
                {/*  className={*/}
                {/*    !this.props.mobileUser.isValidated ||*/}
                {/*    !getEmailValidationError(this.props.mobileUser.email)*/}
                {/*      ? "block-set__input animated"*/}
                {/*      : "block-set__input animated  is--error"*/}
                {/*  }*/}
                {/*  value={this.props.mobileUser.email}*/}
                {/*  onChange={e =>*/}
                {/*    this.props.onChangeEmail(e.target.value)*/}
                {/*  }*/}
                {/*/>*/}
              </div>
            </div>

            {/*{isEditExisting && (*/}
            {/*  <>*/}
            {/*    /!* Device Endpoint *!/*/}
            {/*    <div className="block-set__item--inner flex w100 animated">*/}
            {/*      <div className="block-set__sub-title flex w100 animated">*/}
            {/*        Device Endpoint*/}
            {/*      </div>*/}
            {/*      <div className="block-set__content flex w100 animated">*/}
            {/*        <div className="block-set__info flex animated">*/}
            {/*          <div className="block-set__info--title animated">*/}
            {/*            {this.props.mobileUser.deviceEndpoint}*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </>*/}
            {/*)}*/}

          </div>
        </div>
      </div>
    );
  }
}

MobileUserGeneral.propTypes = {
  mobileUser: IMobileUserView,
  onChangeFirstName: PropTypes.func.isRequired,
  onChangeLastName: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePhone: PropTypes.func,
};
