import {reportPageWithProvider} from "./reportPageWithProvider";
import {reportOrdersActions} from "../../redux/modules/reportOrdersRedux";
import {reportOrdersByStoreActions} from "../../redux/modules/reportOrdersByStoreRedux";
import {reportInventoryByProductActions} from "../../redux/modules/reportInventoryByProductRedux";
import {reportInventoryByStoreActions} from "../../redux/modules/reportInventoryByStoreRedux";
import {reportProductsByPopularityActions} from "../../redux/modules/reportProductsByPopularityRedux";
import {reportTemperatureHistoryActions} from "../../redux/modules/reportTemperatureHistoryRedux";
import {reportSensorsHistoryActions} from "../../redux/modules/reportSensorsHistoryRedux";
import {reportTemperaturesByStoreActions} from "../../redux/modules/reportTemperaturesByStoreRedux";

export const reportOrders = reportPageWithProvider(reportOrdersActions);
export const reportOrdersByStore = reportPageWithProvider(reportOrdersByStoreActions);
export const reportInventoryByProduct = reportPageWithProvider(reportInventoryByProductActions);
export const reportInventoryByStore = reportPageWithProvider(reportInventoryByStoreActions);
export const reportProductsByPopularity = reportPageWithProvider(reportProductsByPopularityActions);
export const reportTemperatureHistory = reportPageWithProvider(reportTemperatureHistoryActions);
export const reportSensorsHistory = reportPageWithProvider(reportSensorsHistoryActions);
export const reportTemperaturesByStore = reportPageWithProvider(reportTemperaturesByStoreActions);
