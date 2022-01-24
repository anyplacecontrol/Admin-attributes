import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  mobileOrderViewActions,
  IMobileOrderView,
} from "../../redux/modules/mobileOrderViewRedux";
import {MobileOrderPayment} from "./MobileOrderPayment";
import {MobileOrderProducts} from "./MobileOrderProducts";
import {MobileOrderLocation} from "./MobileOrderLocation";
import {BaseView} from "../../components/BaseView/BaseView";
import * as uiActions from "../../redux/modules/uiRedux";
import {IProductView} from "../../redux/modules/productViewRedux";

export class mobileOrderView_ extends React.Component {
  readyInStore = async () => {
    await this.props.dispatch(
        mobileOrderViewActions.changeStatus(this.props.mobileOrder, "ready")
    );
  };

  saveComments = async () => {
    await this.props.dispatch(
        mobileOrderViewActions.saveComments()
    );
  };

  closeOrder = async () => {
    let orderObj = {
      ...this.props.mobileOrder,
      amount: this.props.mobileOrder.total,
    };
    let e = await this.props.dispatch(
        mobileOrderViewActions.changeStatus(orderObj, "close")
    );

    if (e && e.message && e.message.includes("payment in store is needed")) {
      setTimeout(() => {
        this.props.dispatch(
          uiActions.ShowAlert(
            "Payment in store is required. For testing purposes, click one more time on the 'Close Order' button to close the order.",
            uiActions.ALERT_ERROR,
            false
          )
        );
      }, 500);
    }
  };

  onChangeDescription = newValue => {
    this.props.dispatch(mobileOrderViewActions.changeComments(newValue));
  };

  onChangeTotal = newValue => {
    this.props.dispatch(mobileOrderViewActions.changeTotal(newValue));
  };

  render() {
    return (
      <BaseView
        viewName="Mobile Order"
        actionsProvider={mobileOrderViewActions}
      >
        {/* -- Block set-- */}
        <MobileOrderPayment
          order={this.props.mobileOrder}
          readyInStore={this.readyInStore}
          closeOrder={this.closeOrder}
          onChangeDescription={this.onChangeDescription}
          onChangeTotal={this.onChangeTotal}
          saveComments={this.saveComments}
        />
         <MobileOrderProducts
          order={this.props.mobileOrder}
          allProducts = {this.props.allProducts}
        />

        {this.props.mobileOrder.store && (
          <MobileOrderLocation
            store={this.props.mobileOrder.store}
          />
        )}
      </BaseView>
    );
  }
}

mobileOrderView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mobileOrder: IMobileOrderView.isRequired,
  allProducts: PropTypes.arrayOf(IProductView),
};

function mapStateToProps(state) {
  return {
    mobileOrder: state.mobileOrderView,
    allProducts: state.products.items,
  };
}

export const mobileOrderView = connect(mapStateToProps)(mobileOrderView_);
