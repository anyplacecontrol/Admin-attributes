import React from "react";
import PropTypesView from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import { hot } from "react-hot-loader";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { SideBar } from "../SideBar/SideBar";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Backdrop } from "../../components/Backdrop/Backdrop";
import * as routing from "../../redux/modules/routingRedux";
import * as authRedux from "../../redux/modules/authRedux";

import { dashboard } from "../../pages/dashboard/dashboard";
import {
  products,
  productItems,
  orders,
  mobileOrders,
  categories,
  statusesProducts,
  statusesProductItems,
  statusesOrders,
  statusesStores,
  statusesMachines,
  statusesKiosks,
  statusesCustomers,
  tags,
  stores,
  machines,
  kiosks,
  metrics,
  controls,
  users,
  customers,
  mobileUsers,
  cookingTips,
  alarms,
  logs,
} from "../../pages/tablePages/tablePages";
import {
  reportOrders,
  reportOrdersByStore,
  reportInventoryByProduct,
  reportInventoryByStore,
  reportProductsByPopularity,
  reportTemperatureHistory,
  reportSensorsHistory,
  reportTemperaturesByStore
} from "../../pages/reportPages/reportPages";
import { productView } from "../../pages/productView/productView";
import { productItemView } from "../../pages/productItemView/productItemView";
import { categoryView } from "../../pages/categoryView/categoryView";
import { tagView } from "../../pages/tagView/tagView";
import { orderView } from "../../pages/orderView/orderView";
import { mobileOrderView } from "../../pages/mobileOrderView/mobileOrderView";

import { statusView } from "../../pages/statusView/statusView";
import { storeView } from "../../pages/storeView/storeView";
import { machineView } from "../../pages/machineView/machineView";
import { kioskView } from "../../pages/kioskView/kioskView";
import { metricView } from "../../pages/metricView/metricView";
import { controlView } from "../../pages/controlView/controlView";
import { userView } from "../../pages/userView/userView";
import { usersTypesView } from "../../pages/userView/usersTypesView";
import { customerView } from "../../pages/customerView/customerView";
import { mobileUserView } from "../../pages/mobileUserView/mobileUserView";
import { taxView } from "../../pages/taxView/taxView";
import { bundleView } from "../../pages/bundleView/bundleView";
import { login } from "../../pages/login/login";
import { couponsGenerator } from "../../pages/couponsGenerator/couponsGenerator";
import { cookingTipsView } from "../../pages/cookingTipsView/cookingTipsView";
import { alarmsView } from "../../pages/alarmsView/alarmsView";
import { logsView } from "../../pages/logsView/logsView";
import { helpView } from "../../pages/helpView/helpView";
import { emailView } from "../../pages/emails/emailView";
import { resetCarousel } from "../../pages/resetCarousel/resetCarousel";
import {promotionView} from "../../pages/promotionView/promotionView";
import {sleepScreenView} from "../../pages/sleepScreenView/sleepScreenView";
import {visualIdentityView} from "../../pages/visualIdentityView/visualIdentityView";
import * as authApi from "../../api/authApi";

class App_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authEmail: "",
      myUser: null
    };
  }

  componentDidMount = async () => {
    await authApi.getToken();
    this.setState({
      myUser: window.myUser
    });

    this.props.dispatch(authRedux.start_monitorClicks_Timer());
  };

  render() {
    return (
      <>
        {//hack for electron for url from file://....index.html instead of http://localhost/
        window.location.pathname.includes("index.html") && (
          <div>
            <Redirect to="/" />
          </div>
        )}

        {this.props.isLoading && <Backdrop />}

        <Switch>
          {/* ------Login ----- */}
          <Route
            exact
            path={ROUTE_NAMES.login}
            render={() => {
              const Component = login;
              return <Component />;
            }}
          />

          {/* ------Any pages except login ----- */}
          <Route
            render={() => {
              return (
                <>
                  <div
                    id="wrapper"
                    className={this.props.isSidebarMinimized ? "active" : ""}
                  >
                    <SideBar
                      isMinimized={this.props.isSidebarMinimized}
                      myUser={this.state.myUser}
                    />

                    {/* -- Main content container-- */}
                    <div className="site-middle animated">
                      <Header header={this.props.header} />

                      <div className="site-middle__inner ph-35 animated">
                        <Switch>
                          {/* ------Reports ----- */}

                          <Route
                            path={ROUTE_NAMES.reportOrders}
                            render={() => {
                              const Component = reportOrders;
                              return <Component />;
                            }}
                          />
                           <Route
                            path={ROUTE_NAMES.reportOrdersByStore}
                            render={() => {
                              const Component = reportOrdersByStore;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.reportInventoryByProduct}
                            render={() => {
                              const Component = reportInventoryByProduct;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.reportInventoryByStore}
                            render={() => {
                              const Component = reportInventoryByStore;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.reportProductsByPopularity}
                            render={() => {
                              const Component = reportProductsByPopularity;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.reportTemperaturesByStore}
                            render={() => {
                              const Component = reportTemperaturesByStore;
                              return <Component />;
                            }}
                          />

                          {/* ------Kiosk Orders----- */}
                          <Route
                            path={ROUTE_NAMES.orders}
                            render={() => {
                              const Component = orders;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.orderView}
                            render={() => {
                              const Component = orderView;
                              return <Component />;
                            }}
                          />

                          {/* ------Mobile Orders----- */}
                          <Route
                            path={ROUTE_NAMES.mobileOrders}
                            render={() => {
                              const Component = mobileOrders;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.mobileOrderView}
                            render={() => {
                              const Component = mobileOrderView;
                              return <Component />;
                            }}
                          />


                          {/* ------Inventory----- */}
                          <Route
                            path={ROUTE_NAMES.products}
                            render={() => {
                              const Component = products;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.productView}
                            render={() => {
                              const Component = productView;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.productItems}
                            render={() => {
                              const Component = productItems;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.productItemView}
                            render={() => {
                              const Component = productItemView;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.categories}
                            render={() => {
                              const Component = categories;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.categoryView}
                            render={() => {
                              const Component = categoryView;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.tags}
                            render={() => {
                              const Component = tags;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.tagView}
                            render={() => {
                              const Component = tagView;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.metrics}
                            render={() => {
                              const Component = metrics;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.metricView}
                            render={() => {
                              const Component = metricView;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.controls}
                            render={() => {
                              const Component = controls;
                              return <Component />;
                            }}
                          />
                            <Route
                            path={ROUTE_NAMES.controlView}
                            render={() => {
                              const Component = controlView;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.taxView}
                            render={() => {
                              const Component = taxView;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.bundleView}
                            render={() => {
                              const Component = bundleView;
                              return <Component />;
                            }}
                          />

                          {/* ------Customers----- */}
                          <Route
                            path={ROUTE_NAMES.customers}
                            render={() => {
                              const Component = customers;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.customerView}
                            render={() => {
                              const Component = customerView;
                              return <Component />;
                            }}
                          />

                          {/* ------Mobile Customers----- */}
                          <Route
                            path={ROUTE_NAMES.mobileUsers}
                            render={() => {
                              const Component = mobileUsers;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.mobileUserView}
                            render={() => {
                              const Component = mobileUserView;
                              return <Component />;
                            }}
                          />

                          {/* ------Users----- */}
                          <Route
                            path={ROUTE_NAMES.users}
                            render={() => {
                              const Component = users;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.userView}
                            render={() => {
                              const Component = userView;
                              return <Component />;
                            }}
                          />
                          {/* ------Users TypesView----- */}
                          <Route
                            path={ROUTE_NAMES.usersTypesView}
                            render={() => {
                              const Component = usersTypesView;
                              return <Component />;
                            }}
                          />

                          {/* ------Kiosks----- */}
                          <Route
                            path={ROUTE_NAMES.kiosks}
                            render={() => {
                              const Component = kiosks;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.kioskView}
                            render={() => {
                              const Component = kioskView;
                              return <Component />;
                            }}
                          />

                          {/* ------Machines----- */}
                          <Route
                            path={ROUTE_NAMES.machines}
                            render={() => {
                              const Component = machines;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.machineView}
                            render={() => {
                              const Component = machineView;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.reportsTemperature}
                            render={() => {
                              const Component = reportTemperatureHistory;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.reportsSensor}
                            render={() => {
                              const Component = reportSensorsHistory;
                              return <Component />;
                            }}
                          />


                          {/* ------Stores----- */}
                          <Route
                            path={ROUTE_NAMES.stores}
                            render={() => {
                              const Component = stores;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.storeView}
                            render={() => {
                              const Component = storeView;
                              return <Component />;
                            }}
                          />

                          {/* ------statuses----- */}
                          <Route
                            path={ROUTE_NAMES.statusesProducts}
                            render={() => {
                              const Component = statusesProducts;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.statusesProductsView}
                            render={() => {
                              const Component = statusView;
                              return <Component />;
                            }}
                          />

                          <Route
                            path={ROUTE_NAMES.statusesProductItems}
                            render={() => {
                              const Component = statusesProductItems;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.statusesProductItemsView}
                            render={() => {
                              const Component = statusView;
                              return <Component />;
                            }}
                          />

                          <Route
                            path={ROUTE_NAMES.statusesOrders}
                            render={() => {
                              const Component = statusesOrders;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.statusesOrdersView}
                            render={() => {
                              const Component = statusView;
                              return <Component />;
                            }}
                          />

                          <Route
                            path={ROUTE_NAMES.statusesStores}
                            render={() => {
                              const Component = statusesStores;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.statusesStoresView}
                            render={() => {
                              const Component = statusView;
                              return <Component />;
                            }}
                          />

                          <Route
                            path={ROUTE_NAMES.statusesMachines}
                            render={() => {
                              const Component = statusesMachines;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.statusesMachinesView}
                            render={() => {
                              const Component = statusView;
                              return <Component />;
                            }}
                          />

                          <Route
                            path={ROUTE_NAMES.statusesKiosks}
                            render={() => {
                              const Component = statusesKiosks;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.statusesKiosksView}
                            render={() => {
                              const Component = statusView;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.statusesCustomers}
                            render={() => {
                              const Component = statusesCustomers;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.statusesCustomersView}
                            render={() => {
                              const Component = statusView;
                              return <Component />;
                            }}
                          />

                          {/* ------Roles----- */}
                          {/*<Route*/}
                          {/*  path={ROUTE_NAMES.rolesAdmins}*/}
                          {/*  render={() => {*/}
                          {/*    const Component = rolesAdmins;*/}
                          {/*    return <Component/>;*/}
                          {/*  }}*/}
                          {/*/>*/}
                          {/*<Route*/}
                          {/*  path={ROUTE_NAMES.rolesAdminsView}*/}
                          {/*  render={() => {*/}
                          {/*    const Component = roleView;*/}
                          {/*    return <Component/>;*/}
                          {/*  }}*/}
                          {/*/>*/}

                          {/* ------Branding----- */}
                          <Route
                            path={ROUTE_NAMES.sleepScreenView}
                            render={() => {
                              const Component = sleepScreenView;
                              return <Component />;
                            }}
                          /> 
                          <Route
                            path={ROUTE_NAMES.visualIdentityView}
                            render={() => {
                              const Component = visualIdentityView;
                              return <Component />;
                            }}
                          /> 
                          
                          {/* ------Promotions----- */}
                          <Route
                            path={ROUTE_NAMES.couponsGenerator}
                            render={() => {
                              const Component = couponsGenerator;
                              return <Component />;
                            }}
                          />
                           <Route
                            path={ROUTE_NAMES.promotions}
                            render={() => {
                              const Component = promotionView;
                              return <Component />;
                            }}
                          />
                          
                          {/* ------Tools----- */}
                          <Route
                            path="/carousel"
                            render={() => {
                              const Component = resetCarousel;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.alarms}
                            render={() => {
                              const Component = alarms;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.alarmsView}
                            render={() => {
                              const Component = alarmsView;
                              return <Component />;
                            }}
                          />
                         <Route
                            path={ROUTE_NAMES.logs}
                            render={() => {
                              const Component = logs;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.logsView}
                            render={() => {
                              const Component = logsView;
                              return <Component />;
                            }}
                          />

                          {/* ------Static Content----- */}
                          <Route
                            path={ROUTE_NAMES.cookingTips}
                            render={() => {
                              const Component = cookingTips;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.cookingTipsView}
                            render={() => {
                              const Component = cookingTipsView;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.helpView}
                            render={() => {
                              const Component = helpView;
                              return <Component />;
                            }}
                          />
                          {/* ------Emails----- */}
                          <Route
                            path={ROUTE_NAMES.emailView}
                            render={() => {
                              const Component = emailView;
                              return <Component />;
                            }}
                          />

                          {/* ------Dashboard----- */}
                          <Route
                            path={ROUTE_NAMES.dashboard}
                            render={() => {
                              const Component = dashboard;
                              return <Component />;
                            }}
                          />
                        </Switch>
                      </div>
                    </div>
                  </div>

                  <Footer />
                </>
              );
            }}
          />
        </Switch>
      </>
    );
  }
}

App_.propTypes = {
  dispatch: PropTypesView.func.isRequired,
  currentPath: PropTypesView.string.isRequired,
  isLoading: PropTypesView.bool.isRequired,
  header: PropTypesView.object,
  isSidebarMinimized: PropTypesView.bool.isRequired
};

function mapStateToProps(state) {
  return {
    currentPath: state.router.location.pathname,
    isLoading: state.ui.isLoading,
    isSidebarMinimized: state.ui.isSidebarMinimized,
    header: routing.getHeader(state)
  };
}

export const ConnectedApp = connect(mapStateToProps)(App_);

export default hot(module)(ConnectedApp);
