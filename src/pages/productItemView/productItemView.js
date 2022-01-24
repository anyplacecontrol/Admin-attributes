import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as productItemViewRedux from "../../redux/modules/productItemViewRedux";
import {ProductItemGeneral} from "./ProductItemGeneral";
import {ProductItemPricing} from "./ProductItemPricing";
import {OrderLocation} from "../orderView/OrderLocation";
import {ProductItemDetails} from "./ProductItemDetails";
import {BaseView} from "../../components/BaseView/BaseView";
import {productItemViewActions} from "../../redux/modules/productItemViewRedux";

export class productItemView_ extends React.Component {

  onTriggerForbiddenToSell = () => {
    this.props.dispatch(productItemViewActions.triggerForbiddenToSell());
  };

  render() {
    return (
      <BaseView
        viewName="Product Item"
        actionsProvider={productItemViewRedux.productItemViewActions}
      >

        {/* -- General-- */}
        <ProductItemGeneral
          productItem={this.props.productItem}
          onTriggerForbiddenToSell={this.onTriggerForbiddenToSell}
        />

        {/* -- Pricing-- */}
        <ProductItemPricing
          productItem={this.props.productItem}
        />

        {/* --Details-- */}
        <ProductItemDetails
          productItem={this.props.productItem}
        />

        {/* -- Location-- */}
        {this.props.productItem.store &&
        <OrderLocation
          store={this.props.productItem.store}
        />
        }
      </BaseView>
    );
  }
}

productItemView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  productItem: productItemViewRedux.IProductItemView.isRequired
};

function mapStateToProps(state) {
  return {
    productItem: state.productItemView
  };
}

export const productItemView = connect(mapStateToProps)(productItemView_);
