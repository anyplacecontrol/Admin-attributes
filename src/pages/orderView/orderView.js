import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  orderViewActions,
  IOrderView
} from "../../redux/modules/orderViewRedux";
import {OrderPayment} from "./OrderPayment";
import {OrderProducts} from "./OrderProducts";
import {OrderLocation} from "./OrderLocation";
import {BaseView} from "../../components/BaseView/BaseView";
import * as routingRedux from "../../redux/modules/routingRedux";
import {ROUTE_NAMES} from "../../consts/routeNames";

export class orderView_ extends React.Component {

  goto_Product = (productId) => {
    this.props.dispatch(
      routingRedux.goto_Page(`${ROUTE_NAMES.productView}?itemId=${productId}`)
    );
  };

  render() {
    return (
      <BaseView
        viewName="Order"
        actionsProvider={orderViewActions}
      >
        {/* -- Block set-- */}
        <OrderPayment
          order={this.props.order}
        />
        <OrderProducts
          order={this.props.order}
          onProductClick={this.goto_Product}
        />
        {this.props.order.store && (
          <OrderLocation
            store={this.props.order.store}
          />
        )}
      </BaseView>
    );
  }
}

orderView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  order: IOrderView.isRequired
};

function mapStateToProps(state) {
  return {
    order: state.orderView
  };
}

export const orderView = connect(mapStateToProps)(orderView_);
