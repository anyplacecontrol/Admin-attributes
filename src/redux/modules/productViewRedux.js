import PropTypes from "prop-types";
import {ROUTE_NAMES} from "../../consts/routeNames";
import {IStoreView} from "./storeViewRedux";
import {ICategoryView} from "./categoryViewRedux";
import {ITagView} from "./tagViewRedux";
import {IStatus} from "./statusViewRedux";
import {productsActions} from "./productsRedux";
import {categoriesActions} from "./categoriesRedux";
import {metricsActions} from "./metricsRedux";
import {tagsActions} from "./tagsRedux";
import * as serviceFuncs from "../../utils/serviceFunctions";
import * as dataFuncs from "../../utils/dataFuncs";
import * as viewValidators from "../../utils/viewValidators";
import * as productsApi from "../../api/productsApi";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView,
  translateField
} from "./baseViewRedux";
import {IImage} from "../../components/ImagesPanel/ImagesPanel";

//*******************************************************************************

export const IProductView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  additionalDescription: PropTypes.string,
  masterProductGroupName: PropTypes.string,
  createdAt: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  popularity: PropTypes.number,
  priority: PropTypes.number, //todo isRequired
  categories: PropTypes.arrayOf(ICategoryView).isRequired,
  tags: PropTypes.arrayOf(ITagView).isRequired,
  status: PropTypes.shape(IStatus),
  images: PropTypes.arrayOf(IImage).isRequired,
  metric: PropTypes.shape({
    //not in DB yet
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })
});

//*******************************************************************************
const PREFIX = "productView/";

const CHANGE_CATEGORIES = PREFIX + "CHANGE_CATEGORIES";
const CHANGE_TAGS = PREFIX + "CHANGE_TAGS";
const CHANGE_PRICE = PREFIX + "CHANGE_PRICE";
const CHANGE_STATUS = PREFIX + "CHANGE_STATUS";
const CHANGE_IMAGES = PREFIX + "CHANGE_IMAGES";
const CHANGE_METRIC = PREFIX + "CHANGE_METRIC";
const CHANGE_PREV_FIELDS = PREFIX + "CHANGE_PREV_FIELDS";
const CHANGE_MASTER_PRODUCT_GROUP = PREFIX + "CHANGE_MASTER_PRODUCT_GROUP";

const CHANGE_MULTILANGUAGE_NAME = PREFIX + "CHANGE_MULTILANGUAGE_NAME";
const CHANGE_MULTILANGUAGE_DESCRIPTION =
  PREFIX + "CHANGE_MULTILANGUAGE_DESCRIPTION";
const CHANGE_MULTILANGUAGE_ADDITIONAL_DESCRIPTION =
  PREFIX + "CHANGE_MULTILANGUAGE_ADDITIONAL_DESCRIPTION";

//*******************************************************************************

export const productViewInitialState = {
  ...BaseViewInitialState,
  //IProductView object
  id: "",
  name: "",
  description: "",
  additionalDescription: "",
  masterProductGroupName: "",
  price: 0,
  createdAt: "",
  categories: [],
  status: {id: 0, name: ""},
  images: [],
  priority: 0,
  popularity: 0,
  tags: [],
  metric: null, //{id: 0, name: ""},

  //required only for API provider
  prevCategories: null,
  prevTags: null,
  prevImages: null
};

//*******************************************************************************

export default function reducer(state = productViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, productViewInitialState);

  if (result) return result;

  switch (action.type) {
    case CHANGE_CATEGORIES:
      return {...state, categories: action.value};

    case CHANGE_TAGS:
      return {...state, tags: action.value};


    case CHANGE_MULTILANGUAGE_NAME: {
      return translateField(
        state,
        (item, newValue) => {
          item.name = newValue
        },
        action.value);
    }

    case CHANGE_MULTILANGUAGE_DESCRIPTION: {
      return translateField(
        state,
        (item, newValue) => {
          item.description = newValue
        },
        action.value);
    }

    case CHANGE_MULTILANGUAGE_ADDITIONAL_DESCRIPTION: {
      return translateField(
        state,
        (item, newValue) => {
          item.additionalDescription = newValue
        },
        action.value);
    }

    case CHANGE_PRICE:
      return {...state, price: action.value};

    case CHANGE_IMAGES:
      return {...state, images: action.value};

    case CHANGE_METRIC:
      return {...state, metric: action.value};

    case CHANGE_STATUS:
      return {...state, status: action.value};

    case CHANGE_MASTER_PRODUCT_GROUP:
      return {...state, masterProductGroupName: action.value};

    case CHANGE_PREV_FIELDS:
      return {
        ...state,
        prevCategories: action.prevCategories,
        prevTags: action.prevTags,
        prevImages: action.prevImages,
        price: action.price //price converted with coins
      };

    default:
      return state;
  }
}

//*******************************************************************************

class ProductViewActions extends BaseViewActions {
  // Public Action Creators

  changePrice(value) {
    return {
      type: CHANGE_PRICE,
      value: value
    };
  }

  changeCategory(categoryName) {
    return async (dispatch, getState) => {
      let value = [];
      let allCategories = categoriesActions.getItems(getState());

      if (categoryName && categoryName !== "") {
        //search category with the same name
        for (let i = 0; i < allCategories.length; i++) {
          if (allCategories[i].name === categoryName) {
            value = [{...allCategories[i]}];
            break;
          }
        }
      }

      dispatch({type: CHANGE_CATEGORIES, value});
    };
  }

  triggerStatus() {
    return async (dispatch, getState) => {
      let status = getState().productView.status;
      let statusses = getState().statusesProducts.items;
      if (!status || !statusses) return;

      let statusName = status.name;
      let newStatusName = (status.name === "disabled") ? "enabled": "disabled";
      let newStatus = null;
      for (let i=0; i<statusses.length; i++) {
        if (statusses[i].name === newStatusName) {
          newStatus = statusses[i];
          break;
        }
      }
      if (!newStatus) return;

      dispatch({type: CHANGE_STATUS, value:newStatus});
    }
  }

  changeTags(selectedTag) {
    return async (dispatch, getState) => {
      let currentTags = JSON.parse(JSON.stringify(getState().productView.tags));
      let newTags = serviceFuncs.addOrRemoveObjectFromArray(
        selectedTag,
        currentTags,
        "id"
      );

      dispatch({type: CHANGE_TAGS, value: newTags});
    };
  }

  changeMultiLanguageName(newValue) {
    return {type: CHANGE_MULTILANGUAGE_NAME, value: newValue};
  }

  changeMultiLanguageDescription(newValue) {
    return {type: CHANGE_MULTILANGUAGE_DESCRIPTION, value: newValue};
  }

  changeMultiLanguageAdditionalDescription(value) {
    return {
      type: CHANGE_MULTILANGUAGE_ADDITIONAL_DESCRIPTION,
      value
    };
  }

  changeMetric(metricObj) {
    return {type: CHANGE_METRIC, value: metricObj};
  }

  changeMasterProductGroupName(value) {
    return {type: CHANGE_MASTER_PRODUCT_GROUP, value};
  }

  addImage(base64file) {
    return async (dispatch, getState) => {
      let images = [...getState().productView.images];

      if (base64file) {
        images.push({src: base64file});

        dispatch({
          type: CHANGE_IMAGES,
          value: images
        });
      }
    };
  }

  deleteImage(index) {
    return async (dispatch, getState) => {
      let images = [...getState().productView.images];

      if (index >= 0) {
        images.splice(index, 1);

        dispatch({
          type: CHANGE_IMAGES,
          value: images
        });
      }
    };
  }

  // Protected Action Creators

  _initializeView_begin() {
    return async (dispatch, getState) => {
      //Categories are required to display drop-down list
      let allCategories = getState().categories.items;
      if (!allCategories || allCategories.length === 0) {
        await dispatch(categoriesActions.fetchItems());
      }

      let allTags = getState().tags.items;
      if (!allTags || allTags.length === 0) {
        await dispatch(tagsActions.fetchItems());
      }

      let allMetrics = getState().metrics.items;
      if (!allMetrics || allMetrics.length === 0) {
        await dispatch(metricsActions.fetchItems());
      }
    };
  }

  initializeView_end = () => {
    return async (dispatch, getState) => {
      //we need to remember previous value of category and tags,
      //because there is separate API to change category for product

      let productObj = this._getStateSlice(getState());
      if (this._isNewItem(productObj)) return;

      let existingProduct = dataFuncs.getItemById(
        productObj.id,
        getState().products.items
      );

      if (existingProduct)
        await dispatch({
          type: CHANGE_PREV_FIELDS,
          prevCategories: existingProduct.categories,
          prevTags: existingProduct.tags,
          prevImages: existingProduct.images,
          price: (existingProduct.price / 100).toFixed(2) //convert price to coins
        });
    };
  };

  //-----------------------------------------------------------------------
  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.products;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return productsActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return productsApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateProductView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.id == "";
  }

  _getStateSlice = state => {
    return state.productView;
  };
}

export const productViewActions = new ProductViewActions();
