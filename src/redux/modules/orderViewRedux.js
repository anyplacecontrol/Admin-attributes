import PropTypes from "prop-types";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { ordersActions } from "./ordersRedux";
import { IProductItemView } from "./productItemViewRedux";
import { IStoreView } from "./storeViewRedux";
import { IStatus } from "./statusViewRedux";
import { storeViewInitialState } from "./storeViewRedux";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";
import { productsActions } from "./productsRedux";
import * as uiActions from "./uiRedux";
import { showException } from "./baseTableRedux";
import * as routing from "./routingRedux";
import * as ordersApi from "../../api/ordersApi";

//*******************************************************************************
export const IDiscount = PropTypes.shape({
  amount: PropTypes.number
});

export const ITax = PropTypes.shape({
  amount: PropTypes.number.isRequired,
  description: PropTypes.string
});

const IText = {
  _text: PropTypes.string
};

const IPaymentInformation = PropTypes.shape({
  RStream: PropTypes.shape({
    TranResponse: PropTypes.shape({
      invoiceNo: PropTypes.shape(IText),
      refNo: PropTypes.shape(IText),
      terminalId: PropTypes.shape(IText),
      acctNo: PropTypes.shape(IText),
      cardType: PropTypes.shape(IText)
    })
  })
});

export const IOrder = {
  id: PropTypes.number.isRequired,
  date_paid: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  grandTotal: PropTypes.number,
  created_via: PropTypes.string.isRequired,
  status: PropTypes.shape(IStatus).isRequired,
  machineId: PropTypes.string.isRequired,
  order_items: PropTypes.arrayOf(IProductItemView),
  store: IStoreView,
  discountCoupon: IDiscount,
  discountLoyaltyCard: IDiscount,
  taxes: PropTypes.arrayOf(ITax),
  paymentInformation: IPaymentInformation
};

export const IOrderView = PropTypes.shape({
  ...IBaseView,
  ...IOrder
});

//*******************************************************************************

const PREFIX = "orderView/";

//*******************************************************************************

export const orderViewInitialState = {
  ...BaseViewInitialState,
  //IOrderView object
  id: 0,
  created_via: "", // kiosk | mobile
  total: 0,
  date_paid: "",
  statusId: 0,
  status: { id: 0, name: "" },
  machineId: "",
  order_items: [],
  store: storeViewInitialState
};

//*******************************************************************************

export default function reducer(state = orderViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, orderViewInitialState);

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class OrderViewActions extends BaseViewActions {
  // Protected Action Creators

  initializeView_end = () => {
    return async (dispatch, getState) => {      

      //get orders for customer
      if (!getState().routing.wasGoBack) {
        if (
          !getState().products.items ||
          getState().products.items.length <= getState().ui.itemsPerPage
        ) {
          try {
            dispatch(uiActions.showBackdrop(true));      
            await dispatch(
              productsActions.fetchItems(0, false, true, null, true)
            );
          } catch (e) {}
          finally {
            dispatch(uiActions.showBackdrop(false));
          }
        }
      }
    };
  };

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.orders;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return ordersActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  _getStateSlice = state => {
    return state.orderView;
  };

  _isNewItem(itemObj) {
    return false;
  }
}

export const orderViewActions = new OrderViewActions();
