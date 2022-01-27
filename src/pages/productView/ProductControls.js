import React from "react";
import PropTypes from "prop-types";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import { IProductView } from "../../redux/modules/productViewRedux";
import { Panel } from "../../components/Panel/Panel";
import { getControlById } from "../../utils/controlsFuncs";

export class ProductControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedControl: null };
  }

  renderControlsSelector = () => {
    let itemsArr = [];
    for (let i = 0; i < this.props.allControls.length; i++) {
      itemsArr.push({
        text: this.props.allControls[i].name,
        onClick: () =>
          this.setState({ selectedControl: this.props.allControls[i] })
      });
    }

    let currentText;
    if (this.state.selectedControl)
      currentText = this.state.selectedControl.name;
    else currentText = "Select...";

    return (
      <SelectBox
        style={{ zIndex: 2 }}
        className="w100"
        text={currentText}
        items={itemsArr}
      />
    );
  };

  renderUsedControls = () => {
    let items = [];
    if (this.props.product && this.props.product.controls) {
      for (let i = 0; i < this.props.product.controls.length; i++) {
        let control = getControlById(
          this.props.allControls,
          this.props.product.controls[i]
        );
        if (control) items.push(<option> {control.name} </option>);
      }
    }
    return (
      <select name="Cars" size="5" style={{ width: "100%" }}>
        {items}
      </select>
    );
  };

  render() {
    return (
      <Panel caption="Attribute Controls for Kiosk UI">
        <div className="block-set__item flex animated">
          <div className="block-set__item--inner flex w100 animated">
            {"Select and add controls to 'Used Controls' list:"}
          </div>

          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__content flex w100 animated">
              {this.renderControlsSelector()}
              <button
                className="block-set__tabs--item flex is--current animated"
                onClick={() => {
                  this.props.onAddControl(this.state.selectedControl);
                  this.setState({ selectedControl: null });
                }}
              >
                Add to List
              </button>
            </div>
          </div>

          <div className="block-set__item--inner block-set__sub-title flex w100 animated">
            Used Controls:
          </div>

          <div className="block-set__item--inner flex w100 animated">
            <div className="block-set__content flex w100 animated">
              {this.renderUsedControls()}
            </div>
            <div className="block-set__item--inner flex w100 animated">
              Order in the list does matter for displaying in Kiosk UI
            </div>
            <button
              className="block-set__tabs--item flex is--current animated"
              onClick={this.props.onDeleteControls}
            >
              Clear List
            </button>
          </div>
        </div>
        <div className="block-set__item flex animated">
          {/* <div className="block-set__item--inner flex w100 animated">                     
          </div>           */}
        </div>
      </Panel>
    );
  }
}

ProductControls.propTypes = {
  product: IProductView,
  allControls: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteControls: PropTypes.func.isRequired,
  onAddControl: PropTypes.func.isRequired
};
