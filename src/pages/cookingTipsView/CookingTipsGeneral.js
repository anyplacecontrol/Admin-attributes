import React from "react";
import PropTypes from "prop-types";
import {SelectBox} from "../../components/SelectBox/SelectBox";
import {ICookingTipsView} from "../../redux/modules/cookingTipsViewRedux";
import * as consts from "../../consts/constants";
import {IProductView} from "../../redux/modules/productViewRedux";

export class CookingTipsGeneral extends React.Component {
  renderProductsSelectBox = () => {
    // let itemsArr = [
    //   {
    //     text: "--Empty--",
    //     onClick: () => this.props.onChangeProduct(null)
    //   }
    // ];
    //
    // for (let i = 0; i < this.props.allProducts.length; i++) {
    //   itemsArr.push({
    //     text: this.props.allProducts[i].name,
    //     onClick: () => this.props.onChangeProduct(this.props.allProducts[i])
    //   });
    // }

    let itemsArr = this.props.allProducts.map((product, index) => {
      return {
        text: product.name,
        onClick: () => this.props.onChangeProduct(product)
      };
    });

    let currentText = this.props.cookingTip.product
      ? this.props.cookingTip.product.name
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
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          General
        </div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">

            {/* ---Product--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Product
              </div>
              <div className="block-set__content flex w100 animated">
                {this.renderProductsSelectBox()}
              </div>
            </div>

            {/* ---Title--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Title
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  type="text"
                  value={this.props.cookingTip.title || ""}
                  onChange={e => this.props.onChangeTitle(e.target.value)}
                />
              </div>
            </div>

          </div>

          {/* ---Right Panel--- */}
          <div className="block-set__item flex animated">

            {/* ---Description --- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Text
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  className="block-set__text-area animated"
                  value={this.props.cookingTip.text || ""}
                  onChange={e => this.props.onChangeText(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CookingTipsGeneral.propTypes = {
  cookingTip: ICookingTipsView,
  allProducts: PropTypes.arrayOf(IProductView).isRequired,

  onChangeTitle: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onChangeProduct: PropTypes.func.isRequired,
};
