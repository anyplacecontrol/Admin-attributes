import PropTypes from "prop-types";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { customersActions } from "./customersRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as customersApi from "../../api/customersApi";
import * as tableFilters from "../../consts/tableFilters";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";
import { IPersonAddress } from "../../components/AddressPanel/AddressPanel";
import { IStatus } from "./statusViewRedux";
import * as uiActions from "./uiRedux";
import { arrayAsText } from "../../utils/serviceFunctions";
import { ordersActions } from "./ordersRedux";

//*******************************************************************************
export const ICreditCard = PropTypes.shape({
  id: PropTypes.number.isRequired,
  cardType: PropTypes.string,
  hash: PropTypes.string,
  lastDigits: PropTypes.string.isRequired,
  expires: PropTypes.string.isRequired,
  IBAN: PropTypes.string,
  token: PropTypes.string
});

export const ICustomerNotes = PropTypes.shape({
  additionalInfo: PropTypes.string,
  childrens: PropTypes.string,
  pets: PropTypes.string,
  partners: PropTypes.string,
  allergies: PropTypes.string
});

export const ILoyaltyInfo = PropTypes.shape({
  loyaltyToken: PropTypes.string,
  couponsOffered: PropTypes.arrayOf(PropTypes.string),
  couponsRedeemed: PropTypes.arrayOf(PropTypes.string),
  loyaltyPoints: PropTypes.number,
  LoyaltyOffersMade: PropTypes.number
});

export const IPaymentInfo = PropTypes.shape({
  usedApplePay: PropTypes.bool,
  usedAndroidPay: PropTypes.bool,
  usedEBT: PropTypes.bool,
});

export const ICustomerView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.string.isRequired,
  cognitoUserId: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  secondaryEmails: PropTypes.arrayOf(PropTypes.string),
  secondaryEmails_asString: PropTypes.string, //calculated field (not in DB)
  phone: PropTypes.string,
  secondaryPhones: PropTypes.arrayOf(PropTypes.string), //calculated field (not in DB)
  secondaryPhones_asString: PropTypes.string,
  status: PropTypes.shape(IStatus).isRequired,
  platforms: PropTypes.arrayOf(PropTypes.string),
  lastOrderDate: PropTypes.string,
  billingAddress: IPersonAddress,
  shippingAddress: IPersonAddress,
  notes: ICustomerNotes,
  creditCards: PropTypes.arrayOf(ICreditCard),
  loyaltyInfo: ILoyaltyInfo,
  paymentInfo: IPaymentInfo,
});

//*******************************************************************************
const PREFIX = "customerView/";

const CHANGE_ORDERS = PREFIX + "CHANGE_ORDERS";
const CHANGE_SECONDARY_EMAILS = PREFIX + "CHANGE_SECONDARY_EMAILS";
const CHANGE_SECONDARY_PHONES = PREFIX + "CHANGE_SECONDARY_PHONES";

const CHANGE_ADDITIONAL_INFO = PREFIX + "CHANGE_ADDITIONAL_INFO";
const CHANGE_CHILDRENS = PREFIX + "CHANGE_CHILDRENS";
const CHANGE_PETS = PREFIX + "CHANGE_PETS";
const CHANGE_PARTNERS = PREFIX + "CHANGE_PARTNERS";
const CHANGE_ALLERGIES = PREFIX + "CHANGE_ALLERGIES";

//*******************************************************************************

export const customerViewInitialState = {
  ...BaseViewInitialState,
  //ICustomerView object
  id: "",
  name: "",
  email: "",
  secondaryEmails_asString: "", //calculated field (not in DB)
  phone: "",
  secondaryPhones_asString: "", //calculated field (not in DB)
  status: { id: 0, name: "" },
  platforms: null,
  lastOrderDate: null,
  billingAddress: null,
  shippingAddress: null,
  notes: null,
  creditCards: [],
  loyaltyInfo: null
};

//*******************************************************************************

export default function reducer(state = customerViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, customerViewInitialState);

  if (result) return result;

  switch (action.type) {
    case CHANGE_ORDERS:
      return {
        ...state,
        orders: action.orders
      };

    case CHANGE_SECONDARY_EMAILS:
      return {
        ...state,
        secondaryEmails_asString: action.value
      };

    case CHANGE_SECONDARY_PHONES:
      return {
        ...state,
        secondaryPhones_asString: action.value
      };

    case CHANGE_ADDITIONAL_INFO:
      return {
        ...state,
        notes: { ...state.notes, additionalInfo: action.value }
      };

    case CHANGE_CHILDRENS:
      return {
        ...state,
        notes: { ...state.notes, childrens: action.value }
      };

    case CHANGE_PETS:
      return {
        ...state,
        notes: { ...state.notes, pets: action.value }
      };

    case CHANGE_PARTNERS:
      return {
        ...state,
        notes: { ...state.notes, partners: action.value }
      };

    case CHANGE_ALLERGIES:
      return {
        ...state,
        notes: { ...state.notes, allergies: action.value }
      };

    default:
      return state;
  }
}

//*******************************************************************************

class CustomerViewActions extends BaseViewActions {
  // Public Action Creators

  changeSecondaryEmails(value) {
    return {
      type: CHANGE_SECONDARY_EMAILS,
      value
    };
  }

  changeSecondaryPhones(value) {
    return {
      type: CHANGE_SECONDARY_PHONES,
      value
    };
  }
                
  changeAdditionalInfo(value) {
    return {
      type: CHANGE_ADDITIONAL_INFO,
      value
    };
  }

  changeChildrens(value) {
    return {
      type: CHANGE_CHILDRENS,
      value
    };
  }

  changePets(value) {
    return {
      type: CHANGE_PETS,
      value
    };
  }
  
  changePartners(value) {
    return {
      type: CHANGE_PARTNERS,
      value
    };
  }

  changeAllergies(value) {
    return {
      type: CHANGE_ALLERGIES,
      value
    };
  }

  // Protected Action Creators

  initializeView_end = () => {
    return async (dispatch, getState) => {
      let customer = getState().customerView;

      //remove spaces
      await dispatch(this.changeEmail(customer.email.replace(/\s+/g, "")));
      await dispatch(this.changePhone(customer.phone.replace(/\s+/g, "")));

      await dispatch(
        this.changeSecondaryEmails(arrayAsText(customer.secondaryEmails))
      );
      await dispatch(
        this.changeSecondaryPhones(arrayAsText(customer.secondaryPhones))
      );

      //get orders for customer
      if (!getState().routing.wasGoBack) {
        let filter = {
          [tableFilters.FILTER_CUSTOMER_ID.apiParamName]: customer.id
        };        
        await dispatch(ordersActions.fetchItems(0, false, true, filter));
      }
    };
  };

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.customers;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return customersActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return customersApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateCustomerView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.id === "";
  }

  _getStateSlice = state => {
    return state.customerView;
  };
}

export const customerViewActions = new CustomerViewActions();
