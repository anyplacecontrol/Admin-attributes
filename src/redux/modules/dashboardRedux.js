import PropTypes from "prop-types";
import * as uiActions from "./uiRedux";
import {showException} from "./baseTableRedux";
import * as reportOrdersApi from "../../api/reportOrdersApi";
import * as reportOrdersByStoreApi from "../../api/reportOrdersByStoreApi";
import * as reportInventoryByProductApi from "../../api/reportInventoryByProductApi";
import * as reportProductsByPopularityApi from "../../api/reportProductsByPopularityApi";
import * as machinesApi from "../../api/machinesApi";
import {machinesActions} from "./machinesRedux";

//*******************************************************************************

const PREFIX = "dashboard/";
const RESET_STATE = PREFIX + "RESET_STATE";
const REPLACE_ORDERS_REPORT = PREFIX + "REPLACE_ORDERS_REPORT";
const CHANGE_PERIOD = PREFIX + "CHANGE_PERIOD";
const REPLACE_EXPIRING_PRODUCTS = PREFIX + "REPLACE_EXPIRING_PRODUCTS";
const REPLACE_POPULAR_PRODUCTS = PREFIX + "REPLACE_POPULAR_PRODUCTS";
const REPLACE_POPULAR_CATEGORIES = PREFIX + "REPLACE_POPULAR_CATEGORIES";
const REPLACE_STORES_SALES = PREFIX + "REPLACE_STORES_SALES";
const REPLACE_MACHINES_SENSORS = PREFIX + "REPLACE_MACHINES_SENSORS";

//*******************************************************************************

export const IOrdersReportTotals = {
  orders: PropTypes.number.isRequired,
  items: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  refunded: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
  grand_total: PropTypes.number.isRequired,
  sumPerOrder: PropTypes.number.isRequired,
  itemsPerOrder: PropTypes.number.isRequired
};

export const IExpiringProducts = {
  name: PropTypes.string.isRequired,
  itemsInStock: PropTypes.number.isRequired,
  itemsExpiring: PropTypes.number.isRequired
};

export const IPopularProducts = {
  name: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
};

export const IStoreSales = {
  storeName: PropTypes.string.isRequired,
  ordersCount: PropTypes.number.isRequired,
  ordersTotal: PropTypes.number.isRequired,
};

export const IMachineSensor = {
  machine: PropTypes.string.isRequired,
  sensorType: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  dateStr: PropTypes.string.isRequired,
  temperature: PropTypes.string.isRequired,
};

//*******************************************************************************

export const dashboardInitialState = {
  //default period: 1 week
  period: {
    startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date()
  },
  sensorTypes: [
    'Shelf_1_Temp',
    'Shelf_2_Temp',
    'Shelf_3_Temp',
    'Shelf_4_Temp',
    'Shelf_5_Temp',
    'Shelf_6_Temp',
    'Shelf_7_Temp',
    'Shelf_8_Temp',

    "CondHX_Air-in_Temp",
    "CondHX_Air-out_Temp",
    "Cond_Disch_Temp",
    "Cond_Suct_Temp",
    "Cond_Refrig_Out_Temp",

    "Cond_Fan_motor_Current",
    "Comp_Motor_Current",
    "Evap_Air-in_Temp",
    "Evap_Air-out_Temp",
    "Evap_TXV-out_Temp",

    "Evap_coil_Vapor_Temp",
    "Evap_Fanmotor_Current",
    "Evap_Valvecoil_Current",
    "ARS_Main-Power_Current",
    "ARS_Aux-Power_Current",
  ],
  ordersReportTotals: null, //IOrdersReportTotals
  machines: [], //array of machines items
  expiringProducts: [], //items from "Inventory by product report"
  popularProducts: [], //items from "Products by popularity report"
  popularCategories: [], //items from "Products by popularity report"
  storesSales: [],
  machinesSensors: [],
};

//*******************************************************************************

export default function reducer(state = dashboardInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE: {
      return {
        ...dashboardInitialState
      };
    }

    case CHANGE_PERIOD: {
      return {
        ...state,
        period: action.period
      };
    }

    case REPLACE_ORDERS_REPORT: {
      return {
        ...state,
        ordersReportTotals: action.payload.ordersReportTotals
      };
    }

    case REPLACE_EXPIRING_PRODUCTS: {
      return {
        ...state,
        expiringProducts: action.expiringProducts
      };
    }

    case REPLACE_POPULAR_PRODUCTS: {
      return {
        ...state,
        popularProducts: action.payload.popularProducts
      };
    }

    case REPLACE_POPULAR_CATEGORIES: {
      return {
        ...state,
        popularCategories: action.payload.popularCategories
      };
    }

    case REPLACE_STORES_SALES: {
      return {
        ...state,
        storesSales: action.payload.storesSales
      };
    }

    case REPLACE_MACHINES_SENSORS: {
      return {
        ...state,
        machinesSensors: action.payload.machinesSensors
      };
    }

    default:
      return state;
  }
}

//**********************************************************************************
//ACTIONS

export function resetState() {
  return {type: RESET_STATE};
}

export function recalculate() {
  return async (dispatch, getState) => {
    dispatch(uiActions.showBackdrop(true));
    dispatch(uiActions.HideAlert());

    let machines;

    //Machines
    try {
      machines = await dispatch(
        machinesActions.fetchItems(
          0,
          false,
          true,
          null,
          true
        )
      );
    } catch (e) {
      dispatch(showException(e, true));
    }

    try {
      //ReportOrders
      try {
        let filter = {
          period: getState().dashboard.period,
          step: "days",
          valuesType: "total"
        };
        let ordersReport = await reportOrdersApi.getReportOrders(filter);
        dispatch({
          type: REPLACE_ORDERS_REPORT,
          payload: {
            ordersReportTotals: ordersReport.totals
          }
        });
      } catch (e) {
        dispatch(showException(e, true));
      }

      //Products By Popularity
      try {
        let filter = {
          period: getState().dashboard.period,
          step: "days",
          valuesType: "total"
        };

        // products
        const popularProducts = await reportProductsByPopularityApi.getReport_ProductsByPopularity(filter);

        const popularProductsItems = popularProducts.items
          ? popularProducts.items
            .sort((a, b) => (a.popularity < b.popularity) ? 1 : -1)
            .slice(0, 5) // get first 5 items
          : [];

        dispatch({
          type: REPLACE_POPULAR_PRODUCTS,
          payload: {
            popularProducts: popularProductsItems
          }
        });

        // categories
        let popularCategories = [];
        popularProducts.items.forEach(product => {
          let categoryName = product.categories[0].name;
          let popularity = product.popularity > 1
            ? product.popularity
            : 1;

          if (!popularCategories[categoryName]) {
            popularCategories[categoryName] = popularity;
          } else {
            popularCategories[categoryName] += popularity;
          }
        });

        let popularCategoriesItems = [];
        for (let categoryItem in popularCategories) {
          popularCategoriesItems.push({
            category: categoryItem,
            popularity: popularCategories[categoryItem],
          });
        }

        popularCategoriesItems = popularCategoriesItems.length
          ? popularCategoriesItems
            .sort((a, b) => (a.popularity < b.popularity) ? 1 : -1)
            .slice(0, 5) // get first 5 items
          : [];

        dispatch({
          type: REPLACE_POPULAR_CATEGORIES,
          payload: {
            popularCategories: popularCategoriesItems
          }
        });
      } catch (e) {
        dispatch(showException(e, true));
      }

      //Inventory By Product
      try {

        // todo: uncomment
        // let filter = {
        //   period: getState().dashboard.period,
        //   step: "days",
        //   valuesType: "total"
        // };

        let filter = {
          expiration_date: {
            startDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
            endDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000),
          },
        };

        let expiringProducts = await reportInventoryByProductApi.getReport_InventoryByProduct(
          filter
        );

        expiringProducts.items = expiringProducts.items.length
          ? expiringProducts.items.sort((a, b) => (a.itemsExpiring < b.itemsExpiring) ? 1 : -1)
          : [];

        dispatch({
          type: REPLACE_EXPIRING_PRODUCTS,
          expiringProducts: expiringProducts.items || []
        });

      } catch (e) {
        dispatch(showException(e, true));
      }

      //Sales by Store
      try {
        let filter = {
          period: getState().dashboard.period,
          step: "days",
          valuesType: "total"
        };

        // items
        const storeItems = await reportOrdersByStoreApi.getReportOrdersByStore(filter);
        let storesSales = [];

        for (let storeName in storeItems.totals) {
          storesSales.push({
            storeName: storeName,
            ordersTotal: storeItems.totals[storeName],
          });
        }

        //  storesSales = [
        //   {storeName: 'Shirley Lab Store', ordersCount: 123, ordersTotal: 9999.99},
        //   {storeName: 'Hudson  NY', ordersCount: 123, ordersTotal: 9999.99},
        // ];

        const storesSalesItems = storesSales.length
          ? storesSales
              .sort((a, b) => (a.ordersTotal < b.ordersTotal) ? 1 : -1)
              .slice(0, 5) // get first 5 items
          : [];

        dispatch({
          type: REPLACE_STORES_SALES,
          payload: {
            storesSales: storesSalesItems
          }
        });
      } catch (e) {
        dispatch(showException(e, true));
      }

      //Machines average temp
      // try {
      //   const sensorType = 'TEMPERATURE';
      //   let machinesSensors = [];
      //
      //   for (let i = 0; i < machines.items.length; i++) {
      //       const machine = machines.items[i];
      //       let fromDate = new Date();
      //       fromDate.setDate(fromDate.getDate() - 14); // 2 weeks from now
      //       const toDate = new Date;
      //
      //       const machineSensor = await machinesApi.getSensors(
      //         machine.id,
      //         sensorType,
      //         fromDate.getTime(),
      //         toDate.getTime(),
      //       );
      //
      //       machinesSensors.push({
      //         machine: machine.id,
      //         sensorType: sensorType,
      //         ...machineSensor[0]
      //       });
      //   }
      //
      //   dispatch({
      //     type: REPLACE_MACHINES_SENSORS,
      //     payload: {
      //       machinesSensors: machinesSensors
      //     }
      //   });
      // } catch (e) {
      //   dispatch(showException(e, true));
      // }

      //MachineSensors
      // try {
        // const sensorTypes = getState().dashboard.sensorTypes;
        // let machinesSensors = [];
        //
        // for (let i = 0; i < machines.items.length; i++) {
        //   for (let j = 0; j < sensorTypes.length; j++) {
        //     const machine = machines.items[i];
        //     const sensorType = sensorTypes[j];
        //     let fromDate = new Date();
        //     fromDate.setDate(fromDate.getDate() - 14); // 2 weeks from now
        //     const toDate = new Date;
        //
        //     const machineSensor = await machinesApi.getSensors(
        //       machine.id,
        //       sensorType,
        //       fromDate.getTime(),
        //       toDate.getTime(),
        //     );
        //
        //     machinesSensors.push({
        //       machine: machine.id,
        //       sensorType: sensorType,
        //       ...machineSensor[0]
        //     });
        //   }
        // }
      //
      //   dispatch({
      //     type: REPLACE_MACHINES_SENSORS,
      //     payload: {
      //       machinesSensors: machinesSensors
      //     }
      //   });
      // } catch (e) {
      //   dispatch(showException(e, true));
      // }

    } finally {
      dispatch(uiActions.showBackdrop(false));
    }
  };
}

export function changePeriod(newValue) {
  return async (dispatch, getState) => {
    await dispatch({type: CHANGE_PERIOD, period: newValue});
  };
}

//**********************************************************************************
