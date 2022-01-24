import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as dashboardRedux from "../../redux/modules/dashboardRedux";
import * as routingRedux from "../../redux/modules/routingRedux";
import {ROUTE_NAMES} from "../../consts/routeNames";
import {IMachineView} from "../../redux/modules/machineViewRedux";

import {DateRangeBox} from "../../components/DateRangeBox/DateRangeBox";
import {MachinesPanel} from "./MachinesPanel";
import {OrdersReportPanel} from "./OrdersReportPanel";
import {ExpiringProductsPanel} from "./ExpiringProductsPanel";
import {TopSellingProductsPanel} from "./TopSellingProductsPanel";
import {TopSellingCategoriesPanel} from "./TopSellingCategoriesPanel";
import {SalesByStorePanel} from "./SalesByStorePanel";

export class dashboard_ extends React.Component {
  componentDidMount = () => {
    if (!this.props.ordersReportTotals) {
      this.recalculate();
    }
  };

  recalculate = () => {
    this.props.dispatch(dashboardRedux.recalculate());
  };

  onChangePeriod = (filterItem, newValue) => {
    this.props.dispatch(dashboardRedux.changePeriod(newValue));
  };

  goto_ReportInventoryByStore = () => {
    this.props.dispatch(
      routingRedux.goto_Page(ROUTE_NAMES.reportInventoryByStore)
    );
  };

  goto_Stores = () => {
    this.props.dispatch(
      routingRedux.goto_Page(ROUTE_NAMES.stores)
    );
  };

  goto_Machines = () => {
    this.props.dispatch(
      routingRedux.goto_Page(ROUTE_NAMES.machines)
    );
  };

  goto_ReportProductsByPopularity = () => {
    this.props.dispatch(
      routingRedux.goto_Page(ROUTE_NAMES.reportProductsByPopularity)
    );
  };

  goto_ProductsCategories = () => {
    this.props.dispatch(
      routingRedux.goto_Page(ROUTE_NAMES.categories)
    );
  };

  render() {
    return (
      <>
        <div className="dashboard__filter flex animated">
          <div className="filter__body--item animated">
            <div className="filter__title animated">
              Date Range
            </div>
            <DateRangeBox
              useAdvancedInterface
              filterItem={{
                type: "advancedDateRange",
                value: this.props.period
              }}
              onValueChange={this.onChangePeriod}
              className="filter__calendar w100r animated"
            />
          </div>
          <div className="filter__body--item animated">
            <div className="filter__calendar w100r mt-25 animated">
              <button
                className="main-nav__refresh animated"
                onClick={() => this.recalculate()}
              />
            </div>
          </div>
        </div>

        <OrdersReportPanel
          ordersReportTotals={this.props.ordersReportTotals}
        />

        <div className="dashboard__full-info flex animated">

          <TopSellingProductsPanel
            popularProducts={this.props.popularProducts}
            onDetailsClick={() => this.goto_ReportProductsByPopularity()}
          />

          <TopSellingCategoriesPanel
            popularCategories={this.props.popularCategories}
            onDetailsClick={() => this.goto_ProductsCategories()}
          />

          <SalesByStorePanel
            storesSales={this.props.storesSales}
            onDetailsClick={() => this.goto_Stores()}
          />

          <ExpiringProductsPanel
            expiringProducts={this.props.expiringProducts}
            onDetailsClick={() => this.goto_ReportInventoryByStore()}
          />

          <MachinesPanel
            machines={this.props.machines}
            onDetailsClick={() => this.goto_Machines()}
          />

          {/*<MachinesSensorsPanel*/}
          {/*  machines={this.props.machines}*/}
          {/*  machinesSensors={this.props.machinesSensors}*/}
          {/*  onDetailsClick={() => this.goto_Machines()}*/}
          {/*/>*/}

          {/*<MachinesFullPanel*/}
          {/*  machines={this.props.machines}*/}
          {/*  machinesSensors={this.props.machinesSensors}*/}
          {/*  onDetailsClick={() => this.goto_Machines()}*/}
          {/*/>*/}
        </div>
      </>
    );
  }
}

dashboard_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  period: PropTypes.shape({
    startDate: PropTypes.date,
    endDate: PropTypes.date
  }),
  ordersReportTotals: dashboardRedux.IOrdersReportTotals,
  popularProducts: dashboardRedux.IPopularProducts,
  popularCategories: dashboardRedux.IPopularProducts,
  machines: PropTypes.arrayOf(IMachineView),
  expiringProducts: dashboardRedux.IExpiringProducts,
  storesSales: dashboardRedux.IStoreSales,
  // machinesSensors: dashboardRedux.IMachineSensor,
};

function mapStateToProps(state) {
  return {
    period: state.dashboard.period,
    ordersReportTotals: state.dashboard.ordersReportTotals,
    machines: state.machines.items,
    expiringProducts: state.dashboard.expiringProducts,
    popularProducts: state.dashboard.popularProducts,
    popularCategories: state.dashboard.popularCategories,
    storesSales: state.dashboard.storesSales,
    // machinesSensors: state.dashboard.machinesSensors,
  };
}

export const dashboard = connect(mapStateToProps)(dashboard_);
