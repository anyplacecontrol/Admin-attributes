import PropTypes from "prop-types";
import {ROUTE_NAMES} from "../../consts/routeNames";
import {productItemsActions} from "./productItemsRedux";
import {IStoreView} from "./storeViewRedux";
import {IProductView, productViewInitialState} from "./productViewRedux";
import {storeViewInitialState} from "./storeViewRedux";
import {IStatus} from "./statusViewRedux";
import * as productItemsApi from "../../api/productItemsApi";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";
import * as routing from "./routingRedux";
import * as uiActions from "./uiRedux";

//*******************************************************************************

export const IProductItemView = PropTypes.shape({
  //isChecked field does not present in Redux state, but is created by Selector
  ...IBaseView,
  id: PropTypes.number.isRequired,

  marbling: PropTypes.number,
  cutThickness: PropTypes.number,
  GS1: PropTypes.string,
  carrierId: PropTypes.string,
  orderId: PropTypes.string,
  weight: PropTypes.number,
  tied: PropTypes.bool,

  forbiddenToSell: PropTypes.bool,
  machineId: PropTypes.string,
  price: PropTypes.number.isRequired,
  production_date: PropTypes.string.isRequired,
  product: IProductView.isRequired,
  status: PropTypes.shape(IStatus).isRequired,
  store: IStoreView,

  lot: PropTypes.string,
});

//*******************************************************************************

const PREFIX = "productItemView/";

const CHANGE_FORBIDDEN_TO_SELL = PREFIX + "CHANGE_FORBIDDEN_TO_SELL";
const CHANGE_PREV_FIELDS = PREFIX + "CHANGE_PREV_FIELDS";

//*******************************************************************************

export const productItemViewInitialState = {
  ...BaseViewInitialState,
  //IProductItemView object
  id: 0,

  marbling: null,
  cutThickness: null,
  GS1: null,
  carrierId: null,
  orderId: null,
  weight: null,
  tied: null,
  position: null,

  forbiddenToSell: false,
  machineId: "",
  price: 0,
  production_date: "",
  product: productViewInitialState,
  status: {id: 0, name: ""},
  store: storeViewInitialState
};

//*******************************************************************************

export default function reducer(
  state = productItemViewInitialState,
  action = {}
) {
  let result = BaseViewReducer(
    PREFIX,
    state,
    action,
    productItemViewInitialState
  );

  if (result) return result;

  switch (action.type) {

    case CHANGE_FORBIDDEN_TO_SELL:
      return {...state, forbiddenToSell: action.value};

    default:
      return state;
  }
}

//*******************************************************************************

class ProductItemViewActions extends BaseViewActions {
  // Public Action Creators

  // Protected Action Creators

  initializeView_end = () => {
    return async (dispatch, getState) => {
      // let itemObj = this._getStateSlice(getState());

      // try {
      //   let existingItem = dataFuncs.getItemById(
      //     itemObj.id,
      //     getState().productItems.items
      //   );

      //   await dispatch({
      //     type: CHANGE_PREV_FIELDS,
      //     prevForbiddenToSell: existingItem.forbiddenToSell
      //   });
      // } catch (e) {}
    };
  };

  triggerForbiddenToSell() {
    return async (dispatch, getState) => {
      dispatch(uiActions.showBackdrop(true));

      let productItemViewObj = getState().productItemView;
      let newVal = !productItemViewObj.forbiddenToSell;

      dispatch({type: CHANGE_FORBIDDEN_TO_SELL, value: newVal});

      await productItemsApi.forbidItems([productItemViewObj.id], newVal); //throw exception inside
      await dispatch(routing.goto_Page(this._TABLE_ROUTE));
      // let message = "Item successfully updated";
      // setTimeout(() => {
      //   dispatch(uiActions.ShowAlert(message, uiActions.ALERT_SUCCESS));
      // }, 500);

      dispatch(uiActions.showBackdrop(false));

      location.reload(true);
    }
  }

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.productItems;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return productItemsActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  _getStateSlice = state => {
    return state.productItemView;
  };

  _isNewItem(itemObj) {
    return false;
  }
}

export const productItemViewActions = new ProductItemViewActions();
