import PropTypes from "prop-types";
import {ROUTE_NAMES} from "../../consts/routeNames";
import {mobileOrdersActions} from "./mobileOrdersRedux";
import {IStoreView} from "./storeViewRedux";
import {IStatus} from "./statusViewRedux";
import {storeViewInitialState} from "./storeViewRedux";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";
import * as uiActions from "./uiRedux";
import {showException} from "./baseTableRedux";
import * as routing from "./routingRedux";
import * as mobileOrdersApi from "../../api/mobileOrdersApi";
import * as orderViewRedux from "./orderViewRedux";

//*******************************************************************************

export const IWebProduct = PropTypes.shape({
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  mobileOrderId: PropTypes.number,
  productId: PropTypes.string.isRequired,
  updatedAt: PropTypes.string,
  weight: PropTypes.number
});

export const IMobileOrder = {
  id: PropTypes.number.isRequired,
  date_paid: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  created_via: PropTypes.string.isRequired,
  status: PropTypes.shape(IStatus).isRequired,
  userId: PropTypes.string,

  web_products: PropTypes.arrayOf(IWebProduct),
  store: IStoreView,
  storeId: PropTypes.string,

  discountCoupon: orderViewRedux.IDiscount,
  discountLoyaltyCard: orderViewRedux.IDiscount,
  taxes: PropTypes.arrayOf(orderViewRedux.ITax),
  credit_card: PropTypes.string,
  comments: PropTypes.string,
  transactionId: PropTypes.string,
  payInStore: PropTypes.bool
};

export const IMobileOrderView = PropTypes.shape({
  ...IBaseView,
  ...IMobileOrder
});

//*******************************************************************************

const PREFIX = "mobileOrderView/";

const CHANGE_COMMENTS = PREFIX + "CHANGE_COMMENTS";
const CHANGE_TOTAL = PREFIX + "CHANGE_TOTAL";

//*******************************************************************************

export const mobileOrderViewInitialState = {
  ...BaseViewInitialState,
  //IOrderView object
  id: 0,
  created_via: "mobile",
  total: 0,
  date_paid: "",
  statusId: 0,
  status: {id: 0, name: ""},
  web_products: [], //??
  store: storeViewInitialState,
  credit_card: "",
  comments: ""
};

//*******************************************************************************

export default function reducer(
  state = mobileOrderViewInitialState,
  action = {}
) {
  let result = BaseViewReducer(
    PREFIX,
    state,
    action,
    mobileOrderViewInitialState
  );

  if (result) return result;

  switch (action.type) {
    case CHANGE_COMMENTS:
      return {...state, comments: action.value};

    case CHANGE_TOTAL:
      return {...state, total: action.value};

    default:
      return state;
  }
}

//*******************************************************************************

class MobileOrderViewActions extends BaseViewActions {
  changeComments(value) {
    return {type: CHANGE_COMMENTS, value: value};
  }

  changeTotal = (newValue) => {
    return async (dispatch) => {
      // let value = parseFloat(newValue);
      // if (isNaN(value)) {
      //   return;
      // }
      // if (value <= 0) {
      //   return;
      // }
      dispatch({
        type: CHANGE_TOTAL,
        value: newValue
        // value: value * 100
      })
    }
  }

  saveComments = () => {
    return async (dispatch, getState) => {
      let order = getState().mobileOrderView;
      let orderId = order.id;
      let comments = order.comments;

      dispatch(uiActions.showBackdrop(true));
      try {
        await mobileOrdersApi.changeComments(orderId, comments);

        dispatch(uiActions.showBackdrop(false));
      } catch (e) {
        dispatch(uiActions.showBackdrop(false));
        setTimeout(() => {
          dispatch(showException(e, false));
        }, 400);
        return e;
      }

      await dispatch(this._TABLE_ACTIONS_PROVIDER.changeNeedCleanFetch(true));
      await dispatch(routing.goto_Page(this._TABLE_ROUTE));

      let message = "Comments successfully changed";

      //we need delay, because fetch after goto_Page clears alerts
      setTimeout(() => {
        dispatch(uiActions.ShowAlert(message, uiActions.ALERT_SUCCESS));
      }, 1500);
    };
  };

  changeStatus = (orderObj, status) => {
    return async (dispatch, getState) => {
      dispatch(uiActions.showBackdrop(true));

      let warningMessage;
      try {
        await mobileOrdersApi.changeStatus(orderObj, status);

        dispatch(uiActions.showBackdrop(false));
      } catch (e) {
        dispatch(uiActions.showBackdrop(false));
        setTimeout(() => {
          dispatch(showException(e, false));
        }, 400);
        return e;
      }

      await dispatch(this._TABLE_ACTIONS_PROVIDER.changeNeedCleanFetch(true));
      await dispatch(routing.goto_Page(this._TABLE_ROUTE));

      let message = "Status successfully changed";

      //we need delay, because fetch after goto_Page clears alerts
      if (!warningMessage)
        setTimeout(() => {
          dispatch(uiActions.ShowAlert(message, uiActions.ALERT_SUCCESS));
        }, 1500);
    };
  };

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.mobileOrders;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return mobileOrdersActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  _getStateSlice = state => {
    return state.mobileOrderView;
  };

  _isNewItem(itemObj) {
    return false;
  }
}

export const mobileOrderViewActions = new MobileOrderViewActions();
