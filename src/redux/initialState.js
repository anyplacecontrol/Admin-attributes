import {uiInitialState} from "./modules/uiRedux";
import {routingInitialState} from "./modules/routingRedux";
import {productsInitialState} from "./modules/productsRedux";
import {ordersInitialState} from "./modules/ordersRedux";
import {mobileOrdersInitialState} from "./modules/mobileOrdersRedux";
import {productViewInitialState} from "./modules/productViewRedux";
import {productItemViewInitialState} from "./modules/productItemViewRedux";
import {orderViewInitialState} from "./modules/orderViewRedux";
import {mobileOrderViewInitialState} from "./modules/mobileOrderViewRedux";
import {categoriesInitialState} from "./modules/categoriesRedux";
import {productItemsInitialState} from "./modules/productItemsRedux";
import {rolesInitialState} from "./modules/rolesRedux";
import {statusesInitialState} from "./modules/statusesRedux";
import {tagsInitialState} from "./modules/tagsRedux";
import {tagViewInitialState} from "./modules/tagViewRedux";
import {storesInitialState} from "./modules/storesRedux";
import {categoryViewInitialState} from "./modules/categoryViewRedux";
import {statusViewInitialState} from "./modules/statusViewRedux";
import {roleViewInitialState} from "./modules/roleViewRedux";
import {storeViewInitialState} from "./modules/storeViewRedux";
import {machinesInitialState} from "./modules/machinesRedux";
import {machineViewInitialState} from "./modules/machineViewRedux";
import {kiosksInitialState} from "./modules/kiosksRedux";
import {kioskViewInitialState} from "./modules/kioskViewRedux";
import {metricsInitialState} from "./modules/metricsRedux";
import {metricViewInitialState} from "./modules/metricViewRedux";
import {customersInitialState} from "./modules/customersRedux";
import {customerViewInitialState} from "./modules/customerViewRedux";
import {usersInitialState} from "./modules/usersRedux";
import {userViewInitialState} from "./modules/userViewRedux";
import {mobileUsersInitialState} from "./modules/mobileUsersRedux";
import {mobileUserViewInitialState} from "./modules/mobileUserViewRedux";
import {reportOrdersInitialState} from "./modules/reportOrdersRedux";
import {reportOrdersByStoreInitialState} from "./modules/reportOrdersByStoreRedux";
import {cookingTipsInitialState} from "./modules/cookingTipsRedux";
import {cookingTipsViewInitialState} from "./modules/cookingTipsViewRedux";
import {alarmsInitialState} from "./modules/alarmsRedux";
import {alarmsViewInitialState} from "./modules/alarmsViewRedux";
import {reportInventoryByProductInitialState} from "./modules/reportInventoryByProductRedux";
import {reportInventoryByStoreInitialState} from "./modules/reportInventoryByStoreRedux";
import {reportProductsByPopularityInitialState} from "./modules/reportProductsByPopularityRedux";
import {reportTemperatureHistoryInitialState} from "./modules/reportTemperatureHistoryRedux";
import {reportTemperaturesByStoreInitialState} from "./modules/reportTemperaturesByStoreRedux";
import {reportSensorsHistoryInitialState} from "./modules/reportSensorsHistoryRedux";
import {dashboardInitialState} from "./modules/dashboardRedux";
import {controlsInitialState} from "./modules/controlsRedux";
import {controlViewInitialState} from "./modules/controlViewRedux";

export const initialState = {
  ui: uiInitialState,
  products: productsInitialState,
  productItems: productItemsInitialState,
  orders: ordersInitialState,
  mobileOrders: mobileOrdersInitialState,
  routing: routingInitialState,
  productView: productViewInitialState,
  productItemView: productItemViewInitialState,
  categories: categoriesInitialState,
  categoryView: categoryViewInitialState,
  orderView: orderViewInitialState,
  mobileOrderView: mobileOrderViewInitialState,

  statusesProducts: statusesInitialState,
  statusesProductItems: statusesInitialState,
  statusesOrders: statusesInitialState,
  statusesStores: statusesInitialState,
  statusesMachines: statusesInitialState,
  statusesKiosks: statusesInitialState,
  statusesCustomers: statusesInitialState,
  statusView: statusViewInitialState, //common for all statuses

  rolesAdmins: rolesInitialState,
  roleView: roleViewInitialState, //common for all statuses

  tags: tagsInitialState,
  tagView: tagViewInitialState,
  stores: storesInitialState,
  storeView: storeViewInitialState,
  machines: machinesInitialState,
  machineView: machineViewInitialState,
  kiosks: kiosksInitialState,
  kioskView: kioskViewInitialState,
  metrics: metricsInitialState,
  metricView: metricViewInitialState,
  controls: controlsInitialState,
  controlView: controlViewInitialState,
  users: usersInitialState,
  userView: userViewInitialState,
  customers: customersInitialState,
  customerView: customerViewInitialState,
  mobileUsers: mobileUsersInitialState,
  mobileUserView: mobileUserViewInitialState,

  reportOrders: reportOrdersInitialState,
  reportOrdersByStore: reportOrdersByStoreInitialState,
  cookingTips: cookingTipsInitialState,
  cookingTipsView: cookingTipsViewInitialState,
  alarms: alarmsInitialState,
  alarmsView: alarmsViewInitialState,
  reportInventoryByProduct: reportInventoryByProductInitialState,
  reportInventoryByStore: reportInventoryByStoreInitialState,
  reportProductsByPopularity: reportProductsByPopularityInitialState,
  reportTemperatureHistory: reportTemperatureHistoryInitialState,
  reportSensorsHistory: reportSensorsHistoryInitialState,
  reportTemperaturesByStore: reportTemperaturesByStoreInitialState,

  dashboard: dashboardInitialState,  
};
