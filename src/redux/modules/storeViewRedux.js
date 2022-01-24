import PropTypes from "prop-types";
import {ROUTE_NAMES} from "../../consts/routeNames";
import {IStatus} from "./statusViewRedux";
import {IImage} from "../../components/ImagesPanel/ImagesPanel";
import {ILocationAddress} from "../../components/AddressPanel/AddressPanel";
import {storesActions} from "./storesRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as storesApi from "../../api/storesApi";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";

//*******************************************************************************
export const IWorkDay = PropTypes.shape({
  id: PropTypes.number,
  storeId: PropTypes.string,
  dayOfWeek: PropTypes.number,
  specialDate: PropTypes.string,
  isDayOff: PropTypes.bool,
  isDefault: PropTypes.bool,
  openTime: PropTypes.string,
  closeTime: PropTypes.string,
  name: PropTypes.string,
});

export const IStoreView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  WorkHours: PropTypes.arrayOf(IWorkDay),
  machineId: PropTypes.string,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  status: PropTypes.shape(IStatus),
  address: ILocationAddress,
  images: IImage,
});

//*******************************************************************************
const PREFIX = "storeView/";

const CHANGE_WORK_HOURS = PREFIX + "CHANGE_WORK_HOURS";
const CHANGE_PREV_FIELDS = PREFIX + "CHANGE_PREV_FIELDS";
const CHANGE_STATUS = PREFIX + "CHANGE_STATUS";

//*******************************************************************************

export const storeViewInitialState = {
  ...BaseViewInitialState,
  //IStoreView object
  id: "",
  slug: "",
  WorkHours: [],
  machineId: "",
  name: "",
  status: {id: 0, name: ""},
  address: {},
  image: null,

  //required only for API provider
  prevImage: null,
  prevAddress: null,
  prevWorkHours: null,
};

//*******************************************************************************

export default function reducer(state = storeViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, storeViewInitialState);

  if (result) return result;

  switch (action.type) {

    case CHANGE_PREV_FIELDS:
      return {
        ...state,
        prevImage: action.prevImage,
        prevAddress: action.prevAddress,
        prevWorkHours: action.prevWorkHours
      };

    case CHANGE_WORK_HOURS:
      return {...state, WorkHours: action.value};

    case CHANGE_STATUS:
      return {...state, status: action.value};

    default:
      return state;
  }
}

//*******************************************************************************

class StoreViewActions extends BaseViewActions {
  // Public Action Creators


  // Protected Action Creators
  initializeView_end = () => {
    return async (dispatch, getState) => {
      //we need to remember some previous values,
      //because there is separate API to change them

      let storeObj = this._getStateSlice(getState());
      if (this._isNewItem(storeObj)) return;

      let existingStore = dataFuncs.getItemById(
        storeObj.id,
        getState().stores.items
      );

      if (existingStore)
        await dispatch({
          type: CHANGE_PREV_FIELDS,
          prevImage: existingStore.image,
          prevAddress: existingStore.address,
          prevWorkHours: existingStore.WorkHours
        });
    };
  };

  replaceWorkDay(workDay) {
    return async (dispatch, getState) => {
      let WorkHours = JSON.parse(JSON.stringify(getState().storeView.WorkHours));
      for (let i = 0; i < WorkHours.length; i++) {
        if (WorkHours[i].id === workDay.id) {
          WorkHours[i] = workDay;
          break;
        }
      }
      dispatch({type: CHANGE_WORK_HOURS, value: WorkHours});
    }
  }

  deleteWorkDay(workDay) {
    return async (dispatch, getState) => {
      let WorkHours = getState().storeView.WorkHours;
      let newWorkHours = [];
      for (let i = 0; i < WorkHours.length; i++) {
        if (WorkHours[i].id != workDay.id) {
          newWorkHours.push(WorkHours[i])
        }
      }
      dispatch({type: CHANGE_WORK_HOURS, value: newWorkHours});
    }
  }

  addSpecialDay(storeId) {
    return async (dispatch, getState) => {
      let newWorkHours = [...getState().storeView.WorkHours];
      newWorkHours.push({
        storeId,
        id: new Date(),
        specialDate: null,
        isDayOff: false,
        openTime: "9:00",
        closeTime: "21:00",
        name: "",
        isDefault: false,
      })
      dispatch({type: CHANGE_WORK_HOURS, value: newWorkHours});
    }
  }

  triggerStatus() {
    return async (dispatch, getState) => {
      let status = getState().storeView.status;
      let statuses = getState().statusesStores.items;
      if (!status || !statuses) {
        return;
      }

      let newStatusName = (status.name === "disabled") ? "active" : "disabled";
      let newStatus = null;
      for (let i = 0; i < statuses.length; i++) {
        if (statuses[i].name === newStatusName) {
          newStatus = statuses[i];
          break;
        }
      }

      if (!newStatus) {
        return;
      }

      dispatch({type: CHANGE_STATUS, value: newStatus});
    }
  }

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.stores;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return storesActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    //TODO:
    return storesApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateStoreView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.id == "";
  }

  _getStateSlice = state => {
    return state.storeView;
  };
}

export const storeViewActions = new StoreViewActions();
