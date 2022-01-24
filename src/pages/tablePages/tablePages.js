import {tablePageWithProvider} from "./tablePageWithProvider";
import {productsActions} from "../../redux/modules/productsRedux";
import {productItemsActions} from "../../redux/modules/productItemsRedux";
import {ordersActions} from "../../redux/modules/ordersRedux";
import {mobileOrdersActions} from "../../redux/modules/mobileOrdersRedux";
import {categoriesActions} from "../../redux/modules/categoriesRedux";
import {tagsActions} from "../../redux/modules/tagsRedux";
import {
  statusesProductsActions,
  statusesProductItemsActions,
  statusesOrdersActions,
  statusesStoresActions,
  statusesMachinesActions,
  statusesKiosksActions,
  statusesCustomersActions
} from "../../redux/modules/statusesRedux";
import {storesActions} from "../../redux/modules/storesRedux";
import {machinesActions} from "../../redux/modules/machinesRedux";
import {kiosksActions} from "../../redux/modules/kiosksRedux";
import {metricsActions} from "../../redux/modules/metricsRedux";
import {controlsActions} from "../../redux/modules/controlsRedux";
import {usersActions} from "../../redux/modules/usersRedux";
import {customersActions} from "../../redux/modules/customersRedux";
import {mobileUsersActions} from "../../redux/modules/mobileUsersRedux";
import {cookingTipsActions} from "../../redux/modules/cookingTipsRedux";
import {alarmsActions} from "../../redux/modules/alarmsRedux";
import {logsActions} from "../../redux/modules/logsRedux";

export const products = tablePageWithProvider(productsActions);
export const orders = tablePageWithProvider(ordersActions);
export const mobileOrders = tablePageWithProvider(mobileOrdersActions);
export const categories = tablePageWithProvider(categoriesActions);
export const productItems = tablePageWithProvider(productItemsActions);

export const statusesProducts = tablePageWithProvider(statusesProductsActions);
export const statusesProductItems = tablePageWithProvider(statusesProductItemsActions);
export const statusesOrders = tablePageWithProvider(statusesOrdersActions);
export const statusesStores = tablePageWithProvider(statusesStoresActions);
export const statusesMachines = tablePageWithProvider(statusesMachinesActions);
export const statusesKiosks = tablePageWithProvider(statusesKiosksActions);
export const statusesCustomers = tablePageWithProvider(statusesCustomersActions);

export const tags = tablePageWithProvider(tagsActions);
export const stores = tablePageWithProvider(storesActions);
export const machines = tablePageWithProvider(machinesActions);
export const kiosks = tablePageWithProvider(kiosksActions);
export const metrics = tablePageWithProvider(metricsActions);
export const controls = tablePageWithProvider(controlsActions);
export const customers = tablePageWithProvider(customersActions);
export const users = tablePageWithProvider(usersActions);
export const mobileUsers = tablePageWithProvider(mobileUsersActions);
export const cookingTips = tablePageWithProvider(cookingTipsActions);
export const alarms = tablePageWithProvider(alarmsActions);
export const logs = tablePageWithProvider(logsActions);
