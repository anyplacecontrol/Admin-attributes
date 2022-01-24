import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as statusViewRedux from "../../redux/modules/statusViewRedux";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { ItemViewTopButtons } from "../../components/ItemViewTopButtons/ItemViewTopButtons";
import * as routing from "../../redux/modules/routingRedux";
import { StatusGeneral } from "./StatusGeneral";
import { BaseView } from "../../components/BaseView/BaseView";

export class statusView_ extends React.Component {

  getActionProvider() {
    switch (this.props.statusKind) {
      case ROUTE_NAMES.statusesProductsView:
        return statusViewRedux.statusesProductsViewActions;        
      case ROUTE_NAMES.statusesProductItemsView:
        return statusViewRedux.statusesProductItemsViewActions;        
      case ROUTE_NAMES.statusesOrdersView:
        return statusViewRedux.statusesOrdersViewActions;        
      case ROUTE_NAMES.statusesStoresView:
        return statusViewRedux.statusesStoresViewActions;        
      case ROUTE_NAMES.statusesMachinesView:
        return statusViewRedux.statusesMachinesViewActions;        
      case ROUTE_NAMES.statusesKiosksView:
        return statusViewRedux.statusesKiosksViewActions;        
      case ROUTE_NAMES.statusesCustomersView:
        return statusViewRedux.statusesCustomersViewActions;                
      default:
        throw "unknown statusKind " +
          this.props.statusKind +
          " in statusView_.componentDidMount()";
    }    
  }

   onChangeName = newValue => {
    // this.props.dispatch(this.statusViewActions.changeName(newValue));
  };

  onChangeDescription = newValue => {
    // this.props.dispatch(this.statusViewActions.changeDescription(newValue));
  };

  getCaption = () => {
    let statusName;
    switch (this.props.statusKind) {
      case ROUTE_NAMES.statusesProductsView:
        statusName = "Product";
        break;
      case ROUTE_NAMES.statusesProductItemsView:
        statusName = "Item";
        break;
      case ROUTE_NAMES.statusesOrdersView:
        statusName = "Order";
        break;
      case ROUTE_NAMES.statusesStoresView:
        statusName = "Stores";
        break;
      case ROUTE_NAMES.statusesMachinesView:
        statusName = "Machines";
        break;
      case ROUTE_NAMES.statusesKiosksView:
        statusName = "Kiosks";
        break;
      case ROUTE_NAMES.statusesCustomersView:
        statusName = "Customers";
        break;        
      default:
        throw "unknown statusKind " +
          this.props.statusKind +
          " in statusView_.getCaption()";
    }

    let caption = statusName + " Status";
    if (this.props.status.id > 0) {
      caption = statusName + " Status";
    }
    return caption;
  };

  render() {
    return (
      <BaseView
        viewName={this.getCaption()}
        actionsProvider={ this.getActionProvider()}
      >

        <StatusGeneral
          status={this.props.status}
          onChangeName={this.onChangeName}
          onChangeDescription={this.onChangeDescription}
        />
        
      </BaseView>
    );
  }
}

statusView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  status: statusViewRedux.IStatusView,
  statusKind: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    status: state.statusView,
    statusKind: state.router.location.pathname
  };
}

export const statusView = connect(mapStateToProps)(statusView_);
