import * as uiActions from "./uiRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import {
  BaseTableTypes,
  BaseTableReducer,
  BaseTableActions,
  BaseTableInitialState,
  showException
} from "./baseTableRedux";
import * as tableColumns from "../../consts/tableColumns";
import {
  REPORT_DAILY,
  REPORT_TOTAL,
  REPORT_MONTHLY
} from "../../consts/constants";

//*******************************************************************************
//ACTION TYPES

export class BaseReportTypes {
  static REPLACE_TOTALS = "REPLACE_TOTALS";
  static CHANGE_PERIOD_TYPE = "CHANGE_PERIOD_TYPE";
  static CHANGE_VALUES_TYPE = "CHANGE_VALUES_TYPE";
}

//*******************************************************************************
//INITIAL STATE

export const BaseReportInitialState = {
  ...BaseTableInitialState,
  step: REPORT_DAILY,
  valuesType: REPORT_TOTAL,
  sortBy: tableColumns.COLUMN_DATE,
  totals: null
};

//*******************************************************************************
//REDUCER

export function BaseReportReducer(
  _ACTION_TYPE_PREFIX,
  state,
  action = {},
  initialState
) {
  let result = BaseTableReducer(
    _ACTION_TYPE_PREFIX,
    state,
    action,
    initialState
  );

  if (result) return result;

  switch (action.type) {
    case _ACTION_TYPE_PREFIX + BaseReportTypes.REPLACE_TOTALS: {
      return {
        ...state,
        totals: action.totals
      };
    }

    case _ACTION_TYPE_PREFIX + BaseReportTypes.CHANGE_PERIOD_TYPE: {
      return {
        ...state,
        step: action.value
      };
    }

    case _ACTION_TYPE_PREFIX + BaseReportTypes.CHANGE_VALUES_TYPE: {
      return {
        ...state,
        valuesType: action.value
      };
    }

    default:
      return null;
  }
}

//*******************************************************************************
//ACTION CREATORS

export class BaseReportActions extends BaseTableActions {
  //******* public actions

  fetchItems = () => {
    return async (dispatch, getState) => {
      dispatch(uiActions.showBackdrop(true));

      let filterItems = this.getFilterItems(getState());
      let filter = dataFuncs.createFilterObject(filterItems);
      filter.step = this.getStep(getState());
      filter.valuesType = this.getValuesType(getState());

      let fetchedResponse;

      try {
        dispatch(uiActions.showBackdrop(true));
        fetchedResponse = await dispatch(this._fetchItemsFromNetwork(filter));
      } catch (e) {
        dispatch(showException(e));
        return;
      }

      dispatch(uiActions.showBackdrop(false));

      if (
        !fetchedResponse ||
        !fetchedResponse.items
      )
      {
        let message =
          "Problem in fetchItems. Empty data received for table: " +
          this._ACTION_TYPE_PREFIX;

        dispatch(uiActions.ShowAlert(message, uiActions.ALERT_ERROR));
        return;
      }

      if (fetchedResponse.totals)
        fetchedResponse.totals.dateStr = "TOTAL";

      await dispatch({
        type: this._withPrefix(BaseTableTypes.FETCH_ITEMS_COMPLETE),
        items: fetchedResponse.items
      });

      if (fetchedResponse.totals)
      await dispatch({
        type: this._withPrefix(BaseReportTypes.REPLACE_TOTALS),
        totals: fetchedResponse.totals
      });
    };
  };

  fetchCsv = () => {
    return async (dispatch, getState) => {
      //TODO: implement logic
      return [];
    };
  };

  changeStep = step => {
    return async (dispatch, getState) => {
      let currentStep = this.getStep(getState());
      if (step === currentStep) return;

      await dispatch({
        type: this._withPrefix(BaseReportTypes.CHANGE_PERIOD_TYPE),
        value: step
      });

      //Average and Median does not make sense for "days"
      let valuesType = this.getValuesType(getState());
      if (step === REPORT_DAILY && valuesType != REPORT_TOTAL) {
        await dispatch(this.changeValuesType(REPORT_TOTAL));
      }
    };
  };

  changeValuesType = valuesType => {
    return async (dispatch, getState) => {
      let currentValuesType = this.getValuesType(getState());
      if (valuesType === currentValuesType) return;

      await dispatch({
        type: this._withPrefix(BaseReportTypes.CHANGE_VALUES_TYPE),
        value: valuesType
      });

      //Average and Median does not make sense for "days"
      let step = this.getStep(getState());
      if (step === REPORT_DAILY && valuesType != REPORT_TOTAL) {
        await dispatch(this.changeStep(REPORT_MONTHLY));
      }
    };
  };

  //******* abstract actions

  //------------------------------------------------------------------------------
  //SELECTORS

  getItemsPerPage = globalState => {
    return 0;
  };

  getStep = globalState => {
    return this._getStateSlice(globalState).step;
  };

  getValuesType = globalState => {
    return this._getStateSlice(globalState).valuesType;
  };

  getUseChart = globalState => {
    return false;
  };

  getTotals = globalState => {
    return this._getStateSlice(globalState).totals;
  };

  getSubCaption = globalState => {
    return null;
  };

  getSpacesCount = globalState => {
    return 0;
  };
  //------------------------------------------------------------------------------
  //ABSTRACT SERVICE FUNCS

  //********** public

  //******* protected

  ///------------------------------------------------------------------------------
  //PRIVATE SERVICE FUNCS
}
