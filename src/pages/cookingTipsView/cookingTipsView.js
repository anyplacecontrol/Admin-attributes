import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {BaseView} from "../../components/BaseView/BaseView";
import {CookingTipsGeneral} from "./CookingTipsGeneral";
import {ImagesPanel} from "../../components/ImagesPanel/ImagesPanel";
import * as cookingTipsViewRedux from "../../redux/modules/cookingTipsViewRedux";
import {IProductView} from "../../redux/modules/productViewRedux";

export class cookingTipsView_ extends React.Component {

  onChangeState = () => {
    // todo
  };

  onAddImage = () => {
    // todo
  };

  onDeleteImage = () => {
    // todo
  };

  onChangeProduct = newValue => {
    this.props.dispatch(
      cookingTipsViewRedux.cookingTipsViewActions.changeProductName(newValue)
    );
  };

  onChangeTitle = newValue => {
    this.props.dispatch(
      cookingTipsViewRedux.cookingTipsViewActions.changeTitle(newValue)
    );
  };

  onChangeText = newValue => {
    this.props.dispatch(
      cookingTipsViewRedux.cookingTipsViewActions.changeText(newValue)
    );
  };

  render() {
    return (
      <BaseView
        viewName="Cooking Tip"
        actionsProvider={cookingTipsViewRedux.cookingTipsViewActions}
      >

        {/* -- General-- */}
        <CookingTipsGeneral
          onChangeProduct={this.onChangeProduct}
          onChangeTitle={this.onChangeTitle}
          onChangeText={this.onChangeText}
          allProducts={this.props.allProducts || []}
          cookingTip={this.props.cookingTips}
        />

        {/* -- Image -- */}
        <ImagesPanel
          allowMultipleImages={false}
          images={[]}
          onAddImage={this.onAddImage}
          onDeleteImage={this.onDeleteImage}
          caption="Images (unavailable)"
          // isError={
          //   this.props.recipe.isValidated && !this.props.category.image
          // }
        />

      </BaseView>
    );
  }
}

cookingTipsView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  cookingTips: cookingTipsViewRedux.ICookingTipsView,
  allProducts: PropTypes.arrayOf(IProductView)
};

function mapStateToProps(state) {
  return {
    cookingTips: state.cookingTipsView,
    allProducts: state.products.items,
  };
}

export const cookingTipsView = connect(mapStateToProps)(cookingTipsView_);
