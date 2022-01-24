import {combineReducers} from "redux";
import ui from "./modules/uiRedux";
import products from "./modules/productsRedux";
import routing from "./modules/routingRedux";
import orders from "./modules/ordersRedux";
import mobileOrders from "./modules/mobileOrdersRedux";
import productView from "./modules/productViewRedux";
import productItemView from "./modules/productItemViewRedux";
import categories from "./modules/categoriesRedux";
import orderView from "./modules/orderViewRedux";
import mobileOrderView from "./modules/mobileOrderViewRedux";
import productItems from "./modules/productItemsRedux";
import statuses from "./modules/statusesRedux";
import roles from "./modules/rolesRedux";
import {
  statusesProducts,
  statusesProductItems,
  statusesOrders,
  statusesStores,
  statusesMachines,
  statusesKiosks,
  statusesCustomers
} from "./modules/statusesRedux";
import {
  rolesAdmins,
} from "./modules/rolesRedux";
import tags from "./modules/tagsRedux";
import tagView from "./modules/tagViewRedux";
import stores from "./modules/storesRedux";
import machines from "./modules/machinesRedux";
import kiosks from "./modules/kiosksRedux";
import categoryView from "./modules/categoryViewRedux";
import statusView from "./modules/statusViewRedux";
import roleView from "./modules/roleViewRedux";
import storeView from "./modules/storeViewRedux";
import machineView from "./modules/machineViewRedux";
import kioskView from "./modules/kioskViewRedux";
import metrics from "./modules/metricsRedux";
import metricView from "./modules/metricViewRedux";
import users from "./modules/usersRedux";
import userView from "./modules/userViewRedux";
import customers from "./modules/customersRedux";
import customerView from "./modules/customerViewRedux";
import mobileUsers from "./modules/mobileUsersRedux";
import mobileUserView from "./modules/mobileUserViewRedux";
import reportOrders from "./modules/reportOrdersRedux";
import reportOrdersByStore from  "./modules/reportOrdersByStoreRedux";
import cookingTips from "./modules/cookingTipsRedux";
import cookingTipsView from "./modules/cookingTipsViewRedux";
import alarms from "./modules/alarmsRedux";
import alarmsView from "./modules/alarmsViewRedux";
import logs from "./modules/logsRedux";
import logsView from "./modules/logsViewRedux";
import reportInventoryByProduct from "./modules/reportInventoryByProductRedux";
import reportInventoryByStore from "./modules/reportInventoryByStoreRedux";
import reportProductsByPopularity from "./modules/reportProductsByPopularityRedux";
import reportTemperatureHistory from "./modules/reportTemperatureHistoryRedux";
import reportSensorsHistory from "./modules/reportSensorsHistoryRedux";
import reportTemperaturesByStore from "./modules/reportTemperaturesByStoreRedux";
import dashboard from "./modules/dashboardRedux";
import controls from "./modules/controlsRedux";
import controlView from "./modules/controlViewRedux";

const reducers = {
  ui,
  products,
  productItems,
  routing,
  orders,
  mobileOrders,
  productView,
  productItemView,
  categories,
  categoryView,
  orderView,
  mobileOrderView,
  rolesAdmins: roles(rolesAdmins),
  statusesProducts: statuses(statusesProducts),
  statusesProductItems: statuses(statusesProductItems),
  statusesOrders: statuses(statusesOrders),
  statusesStores: statuses(statusesStores),
  statusesMachines: statuses(statusesMachines),
  statusesKiosks: statuses(statusesKiosks),
  statusesCustomers: statuses(statusesCustomers),
  statusView,
  roleView,
  storeView,
  tags,
  tagView,
  stores,
  machines,
  machineView,
  kiosks,
  kioskView,
  metrics,
  metricView,
  controls,
  controlView,
  users,
  userView,
  customers,
  customerView,
  mobileUsers,
  mobileUserView,
  cookingTips,
  cookingTipsView,
  alarms,
  alarmsView,
  logs,
  logsView,

  reportOrders,
  reportOrdersByStore,
  reportInventoryByProduct,
  reportInventoryByStore,
  reportProductsByPopularity,
  reportTemperatureHistory,
  reportSensorsHistory,
  reportTemperaturesByStore,

  dashboard
};

export default combineReducers(reducers);
