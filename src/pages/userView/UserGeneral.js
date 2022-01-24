import React from "react";
import PropTypes from "prop-types";
import {IUserView} from "../../redux/modules/userViewRedux";
import * as consts from "../../consts/constants";
import {SelectBox} from "../../components/SelectBox/SelectBox";
import {IRoleView} from "../../redux/modules/roleViewRedux";

export class UserGeneral extends React.Component {

  renderRolesSelectBox = () => {
    let itemsArr = this.props.roles.map((role, index) => {
      return {
        text: role.name,
        onClick: () => this.props.onChangeRole(role),
      };
    });

    let currentText = this.props.user.role
      ? this.props.user.role.name
      : consts.chooseStr;

    return (
      <SelectBox
        style={{zIndex: 2}}
        className="w100"
        text={currentText}
        items={itemsArr}
      />
    );
  };

  render() {
    let isEditExisting = this.props.user.id != "";

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          General
        </div>
        <div className="block-set__inner flex w100 animated">

          {/* ---Left Panel--- */}
          <div className="block-set__item flex animated">
            {isEditExisting && (
              <>
                {/* ---ID--- */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    ID
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {this.props.user.id}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ---First Name--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                First Name
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.user.isValidated ||
                    this.props.user.firstName != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.user.firstName || ""}
                  onChange={e => this.props.onChangeFirstName(e.target.value)}
                />
              </div>
            </div>

            {/* ---Email--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Email
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  type="email"
                  autoComplete="off"
                  className={
                    !this.props.user.isValidated ||
                    this.props.user.email != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.user.email || ""}
                  onChange={e => this.props.onChangeEmail(e.target.value)}
                />
              </div>
            </div>

            {!isEditExisting && (
              <>
                {/* ---Password--- */}
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    Password
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <input
                      type="password"
                      autoComplete="off"
                      className={
                        !this.props.user.isValidated ||
                        this.props.user.password != ""
                          ? "block-set__input animated"
                          : "block-set__input animated  is--error"
                      }
                      value={this.props.user.password || ""}
                      onChange={e => this.props.onChangePassword(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

          </div>

          {/* ---Right Panel--- */}
          <div className="block-set__item flex animated">

            {/* ---Role--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Role
              </div>
              <div className="block-set__content flex w100 animated">
                {this.renderRolesSelectBox()}
              </div>
            </div>

            {/* ---Last Name--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Last Name
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.user.isValidated ||
                    this.props.user.lastName != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.user.lastName || ""}
                  onChange={e => this.props.onChangeLastName(e.target.value)}
                />
              </div>
            </div>

            {/* ---Phone--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Phone
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.user.isValidated ||
                    this.props.user.phone != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.user.phone || ""}
                  onChange={e => this.props.onChangePhone(e.target.value)}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

    );
  }
}

UserGeneral.propTypes = {
  user: IUserView,
  roles: PropTypes.arrayOf(IRoleView).isRequired,

  onChangeFirstName: PropTypes.func.isRequired,
  onChangeLastName: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onChangePhone: PropTypes.func.isRequired,
  onChangeRole: PropTypes.func.isRequired,
};
