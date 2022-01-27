import React from "react";
import PropTypes from "prop-types";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import * as dataFuncs from "../../utils/dataFuncs";
import * as controlViewRedux from "../../redux/modules/controlViewRedux";
import { controlViewActions } from "../../redux/modules/controlViewRedux";
import * as controlsFuncs from "../../utils/controlsFuncs";
import { connect } from "react-redux";

export class _ControlTypeSelector extends React.Component {

  renderControlDescription = () => {
    let controlTypeInfo = controlsFuncs.getControlTypeInfo(
      this.props.control.controlType
    );
    if (!controlTypeInfo) return null;
    let content = controlTypeInfo.description.map((str, index) => {
      return <li style={{paddingBottom: "10px"}} key={"desc" + index}>{str}</li>;
    });
    return <ul>{content}</ul>;
  };

  renderControlImage = () => {
    let controlTypeInfo = controlsFuncs.getControlTypeInfo(
      this.props.control.controlType
    );
    if (!controlTypeInfo || !controlTypeInfo) return null;
    
    return <img src={controlTypeInfo.img} style={{height: "100%", width: "100%", objectFit: "contain"}}/>
  };

  onChangeControlType = (item) => {
    this.props.dispatch(controlViewActions.changeControlType(item.name))
  }

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Type of Control:</div>
        <div className="block-set__inner flex w100 animated">
          {/* Left Panel */}
          <div className="block-set__item flex animated">
            {/* Control Type */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Control Type
              </div>
              <div className="block-set__content flex w100 animated">
                {this.props.control.id > 0 ? (
                  this.props.control.controlType
                ) : (
                  <SelectBox
                    className="w100"
                    style={{ zIndex: 2 }}
                    text={this.props.control.controlType || "Select"}
                    items={dataFuncs.createSelectBoxItems(
                      controlsFuncs.allControlTypes,
                      "name",                     
                      this.onChangeControlType
                    )}
                    isCheckboxItems={false}
                  />
                )}
              </div>
            </div>

            <div className="block-set__item--inner flex w100 animated">
            {this.renderControlDescription()}
          </div>
          </div>

          {/* Right Panel */}
          <div className="block-set__item flex animated">
            {this.renderControlImage()}
          </div>
          
        </div>
      </div>
    );
  }
}

_ControlTypeSelector.propTypes = {
  dispatch: PropTypes.func.isRequired,
  control: controlViewRedux.IControlView,
  onChangeName: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
      control: state.controlView
    };
  }
  
export const ControlTypeSelector = connect(mapStateToProps)(_ControlTypeSelector);
  