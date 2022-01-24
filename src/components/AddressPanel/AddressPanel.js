import React from "react";
import PropTypes from "prop-types";
import * as dataFuncs from "../../utils/dataFuncs";
import {SelectBox} from "../SelectBox/SelectBox";
import {ALL_COUNTRIES} from "../../consts/countries";
import {ALL_STATES} from "../../consts/states";
import * as consts from "../../consts/constants";

export const IBaseAddressObj = {
  id: PropTypes.number,
  country: PropTypes.string,
  state: PropTypes.string,
  zip: PropTypes.string,
  city: PropTypes.string,
  street: PropTypes.string,
  address: PropTypes.string,
  address_2: PropTypes.string,
  phone: PropTypes.string
};

export const ILocationAddressCoordinates = PropTypes.shape({
  latitude: PropTypes.string,
  longitude: PropTypes.string,
});

export const ILocationAddress = PropTypes.shape({
  ...IBaseAddressObj,
  coordinates: ILocationAddressCoordinates,
  contactPerson: PropTypes.string,
  region: PropTypes.string,
  addInfo: PropTypes.string,
  info: PropTypes.string
});

export const IPersonAddress = PropTypes.shape({
  ...IBaseAddressObj,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  company: PropTypes.string,
  email: PropTypes.string
});

export class AddressPanel extends React.Component {
  renderCountriesSelectBox = () => {
    let itemsArr = [
      {text: "--Empty--", onClick: () => this.props.onChangeCountry(null)}
    ];

    for (let i = 0; i < ALL_COUNTRIES.length; i++) {
      itemsArr.push({
        text: ALL_COUNTRIES[i],
        onClick: () => this.props.onChangeCountry(ALL_COUNTRIES[i])
      });
    }

    let currentText;
    if (this.props.address.country) currentText = this.props.address.country;
    else currentText = consts.chooseStr;

    return (
      <SelectBox
        style={{zIndex: 2}}
        className="w100"
        text={currentText}
        items={itemsArr}
      />
    );
  };

  renderStatesSelectBox = () => {
    let itemsArr = [
      {text: "--Empty--", onClick: () => this.props.onChangeState(null)}
    ];

    for (let i = 0; i < ALL_STATES.length; i++) {
      itemsArr.push({
        text: ALL_STATES[i],
        onClick: () => this.props.onChangeState(ALL_STATES[i])
      });
    }

    let currentText;
    if (this.props.address.state) currentText = this.props.address.state;
    else currentText = consts.chooseStr;

    return (
      <SelectBox
        style={{zIndex: 1}}
        className="w100"
        text={currentText}
        items={itemsArr}
      />
    );
  };

  render() {
    let caption = this.props.caption ? this.props.caption : "Address";
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">{caption}</div>

        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* First name */}
            {this.props.onChangeFirstName && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  First Name
                </div>
                <div className="block-set__content flex w100 animated">
                  <input
                    className="block-set__input animated"
                    value={this.props.address.firstName || ""}
                    onChange={e => this.props.onChangeFirstName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Last name */}
            {this.props.onChangeLastName && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Last Name
                </div>
                <div className="block-set__content flex w100 animated">
                  <input
                    className="block-set__input animated"
                    value={this.props.address.lastName || ""}
                    onChange={e => this.props.onChangeLastName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Company */}
            {this.props.onChangeCompany && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Company
                </div>
                <div className="block-set__content flex w100 animated">
                  <input
                    className="block-set__input animated"
                    value={this.props.address.company || ""}
                    onChange={e => this.props.onChangeCompany(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Latitude */}
            {this.props.onChangeLatitude && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Latitude
                </div>
                <div className="block-set__content flex w100 animated">
                  <input
                    className="block-set__input animated"
                    value={this.props.address.coordinates ? this.props.address.coordinates.latitude : ""}
                    onChange={e =>
                      this.props.onChangeLatitude(e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            {/* Country */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Country
              </div>
              <div className="block-set__content flex w100 animated">
                {this.renderCountriesSelectBox()}
              </div>
            </div>

            {/* Zip */}
            {this.props.onChangeZip && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Zip
                </div>
                <div className="block-set__content flex w100 animated">
                  <input
                    className="block-set__input animated"
                    value={this.props.address.zip || ""}
                    onChange={e => this.props.onChangeZip(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Street Address 1 */}
            {this.props.onChangeStreet &&
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Street Address 1
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={this.props.address.address || ""}
                  onChange={e => this.props.onChangeStreet(e.target.value)}
                />
              </div>
            </div>
            }

            {/* Contact Person */}
            {this.props.onChangeContactPerson && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Contact Person
                </div>
                <div className="block-set__content flex w100 animated">
                  <input
                    className="block-set__input animated"
                    value={this.props.address.contactPerson || ""}
                    onChange={e =>
                      this.props.onChangeContactPerson(e.target.value)
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">

            {/* Longitude */}
            {this.props.onChangeLongitude && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Longitude
                </div>
                <div className="block-set__content flex w100 animated">
                  <input
                    className="block-set__input animated"
                    value={this.props.address.coordinates ? this.props.address.coordinates.longitude : ""}
                    onChange={e =>
                      this.props.onChangeLongitude(e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            {/* State */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                State
              </div>
              <div className="block-set__content flex w100 animated">
                {this.renderStatesSelectBox()}
              </div>
            </div>

            {/* City */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                City
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={this.props.address.city || ""}
                  onChange={e => this.props.onChangeCity(e.target.value)}
                />
              </div>
            </div>

            {/* Street Address 2 */}
            {this.props.onChangeStreet &&
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Street Address 2
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={this.props.address.address_2 || ""}
                  onChange={e => this.props.onChangeStreet(e.target.value)}
                />
              </div>
            </div>
            }

            {/* Street Address 2*/}
            {this.props.onChangeStreet2 && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Street Address 2
                </div>
                <div className="block-set__content flex w100 animated">
                  <input
                    className="block-set__input animated"
                    value={this.props.address.address_2 || ""}
                    onChange={e => this.props.onChangeStreet2(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Phone */}
            {this.props.onChangePhone && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Phone Number
                </div>
                <div className="block-set__content flex w100 animated">
                  <input
                    className="block-set__input animated"
                    value={this.props.address.phone || ""}
                    onChange={e => this.props.onChangePhone(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            {this.props.onChangeEmail && (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Email Address
                </div>
                <div className="block-set__content flex w100 animated">
                  <input
                    className="block-set__input animated"
                    value={this.props.address.email || ""}
                    onChange={e => this.props.onChangeEmail(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

AddressPanel.propTypes = {
  caption: PropTypes.string,
  address: PropTypes.oneOfType([ILocationAddress, IPersonAddress]),

  //From IBaseAddress
  onChangeStreet: PropTypes.func,
  onChangeStreet2: PropTypes.func, //_
  onChangeCountry: PropTypes.func.isRequired,
  onChangeState: PropTypes.func.isRequired,
  onChangeCity: PropTypes.func.isRequired,
  onChangeZip: PropTypes.func,
  onChangePhone: PropTypes.func,

  //From ILocationAddress
  onChangeLatitude: PropTypes.func,
  onChangeLongitude: PropTypes.func,
  onChangeContactPerson: PropTypes.func,

  //From IPersonAddress
  onChangeFirstName: PropTypes.func, //_
  onChangeLastName: PropTypes.func, //_
  onChangeCompany: PropTypes.func, //_
  onChangeEmail: PropTypes.func //_
};
