import React from "react";
import PropTypes from "prop-types";
import * as controlViewRedux from "../../redux/modules/controlViewRedux";
import { controlViewActions } from "../../redux/modules/controlViewRedux";
import { getNonTranslatableViewFieldClass } from "../../utils/viewValidators";
import { connect } from "react-redux";

export class ControlGeneral_ extends React.Component {
  onChangeDescription = newValue => {
    this.props.dispatch(controlViewActions.changeDescription(newValue));
  };

  onChangeName = newValue => {
    this.props.dispatch(controlViewActions.changeName(newValue));
  };

  onChangeAttribute = newValue => {
    this.props.dispatch(controlViewActions.changeAttribute(newValue));
  };

  onTriggerDisplayInCart = () => {
    this.props.dispatch(controlViewActions.triggerDisplayInCart());
  }

  render() {
    let isEditExisting = this.props.control.id > 0;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">General</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* --Attribute-- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Attribute name*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  placeholder="JS-variable name"                  
                  type="text"
                  className="block-set__input animated"
                  value={this.props.control.attribute}
                  onChange={e => this.onChangeAttribute(e.target.value)}
                />
              </div>
            </div>

            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Control Name*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  placeholder="name for admin panel only"
                  className="block-set__input animated"
                  type="text"
                  value={this.props.control.name}
                  onChange={e => this.onChangeName(e.target.value)}
                />
              </div>
            </div>

            {isEditExisting && (
              <>
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    ID
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {this.props.control.id}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Display attribute in Kiosk receipt
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  {/* -- click - toggle class "active" and change text "Yes | No" in the next ".block-set__info--title"-- */}
                  <div
                    className={
                      this.props.control.displayInCart
                        ? "block-set__tumbler active animated"
                        : "block-set__tumbler animated"
                    }
                    onClick={() => this.onTriggerDisplayInCart()}
                  />
                  <div className="block-set__info--title animated">
                    {this.props.control.displayInCart ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            </div>
            {/* Notes */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Notes
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  placeholder="Any notes about this control"
                  className="block-set__text-area animated"
                  value={this.props.control.description || ""}
                  onChange={e => this.onChangeDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ControlGeneral_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  control: controlViewRedux.IControlView
};

function mapStateToProps(state) {
  return {
    control: state.controlView
  };
}

export const ControlGeneral = connect(mapStateToProps)(ControlGeneral_);
