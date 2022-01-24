import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as productViewRedux from "../../redux/modules/productViewRedux";
import {categoriesActions} from "../../redux/modules/categoriesRedux";
import * as routing from "../../redux/modules/routingRedux";
import {ProductGeneral} from "./ProductGeneral";
import {ProductPricing} from "./ProductPricing";
import {ImagesPanel} from "../../components/ImagesPanel/ImagesPanel";
import {ItemViewTopButtons} from "../../components/ItemViewTopButtons/ItemViewTopButtons";
import {ProductDetails} from "./ProductDetails";
import {ICategoryView} from "../../redux/modules/categoryViewRedux";
import {ITagView} from "../../redux/modules/tagViewRedux";
import {IMetricView} from "../../redux/modules/metricViewRedux";
import {tagsActions} from "../../redux/modules/tagsRedux";
import {metricsActions} from "../../redux/modules/metricsRedux";
import {BaseView} from "../../components/BaseView/BaseView";
import {LanguageButtons} from "../../components/LanguageButtons/LanguageButtons";

export class productView_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {price: "0.00"};
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    let price;
    if (nextProps.product && nextProps.product.price) {
      price = nextProps.product.price;
    } else price = "0.00";
    this.setState({price});
  };

  changePriceInRedux = async () => {
    await this.props.dispatch(
      productViewRedux.productViewActions.changePrice(this.state.price)
    );
  };

  dispatchWithPrice = action => {
    this.changePriceInRedux();
    this.props.dispatch(action);
  };

  onCancelClick = () => {
    this.props.dispatch(routing.goto_Back());
  };

  onChangeCategory = newValue => {
    this.dispatchWithPrice(
      productViewRedux.productViewActions.changeCategory(newValue)
    );
  };

  onChangeName = newValue => {
    this.dispatchWithPrice(
      productViewRedux.productViewActions.changeMultiLanguageName(newValue)
    );
  };

  onChangeDescription = newValue => {
    this.dispatchWithPrice(
      productViewRedux.productViewActions.changeMultiLanguageDescription(newValue)
    );
  };

  onChangeAdditionalDescription = newValue => {
    this.dispatchWithPrice(
      productViewRedux.productViewActions.changeMultiLanguageAdditionalDescription(newValue)
    );
  };

  onChangeSlug = newValue => {
    this.dispatchWithPrice(
      productViewRedux.productViewActions.changeSlug(newValue)
    );
  };

  onChangeMasterProductGroupName = newValue => {
    this.dispatchWithPrice(
      productViewRedux.productViewActions.changeMasterProductGroupName(newValue)
    );
  };

  onChangePrice = newValue => {
    this.setState({price: newValue});
  };

  onChangePriority = newValue => {
    if (newValue)
      this.dispatchWithPrice(
        productViewRedux.productViewActions.changePriority(newValue)
      );
  };

  onTriggerStatus = () => {
    this.dispatchWithPrice(
      productViewRedux.productViewActions.triggerStatus()
    );
  };

  onChangeTags = selectedTag => {
    this.dispatchWithPrice(
      productViewRedux.productViewActions.changeTags(selectedTag)
    );
  };

  onChangeMetric = metricObj => {
    this.dispatchWithPrice(
      productViewRedux.productViewActions.changeMetric(metricObj)
    );
  };

  onAddImage = base64file => {
    this.dispatchWithPrice(
      productViewRedux.productViewActions.addImage(base64file)
    );
  };

  onDeleteImage = index => {
    this.dispatchWithPrice(
      productViewRedux.productViewActions.deleteImage(index)
    );
  };

  onChangeLanguage = (lang) => {
    this.dispatchWithPrice(
      productViewRedux.productViewActions.changeLanguage(lang)
    );
  }

  beforeOnSubmitClick = async () => {
    await this.changePriceInRedux();
    this.props.dispatch(productViewRedux.productViewActions.changeLanguage("en"));
  }

  render() {
    return (
      <BaseView
        viewName="Product"
        actionsProvider={productViewRedux.productViewActions}
        beforeOnSubmitClick={this.beforeOnSubmitClick}
      >

        {/* -- General-- */}
        <ProductGeneral
          product={this.props.product}
          onChangePriority={this.onChangePriority}
          onTriggerStatus={this.onTriggerStatus}
        />

        {/* -- Pricing-- */}
        <ProductPricing
          price={this.state.price}
          product={this.props.product}
          onChangePrice={this.onChangePrice}
        />

        {/* --Details-- */}
        <ProductDetails
          product={this.props.product}
          onChangeLanguage={this.onChangeLanguage}
          allCategories={this.props.allCategories}
          allTags={this.props.allTags}
          allMetrics={this.props.allMetrics}
          onChangeCategory={this.onChangeCategory}
          onChangeName={this.onChangeName}
          onChangeDescription={this.onChangeDescription}
          onChangeAdditionalDescription={this.onChangeAdditionalDescription}
          onChangeSlug={this.onChangeSlug}
          onChangeMasterProductGroupName={this.onChangeMasterProductGroupName}
          onChangeTags={this.onChangeTags}
          onChangeMetric={this.onChangeMetric}
        />

        {/* -- Images-- */}
        <ImagesPanel
          allowMultipleImages={true}
          images={this.props.product.images || []}
          onDeleteImage={this.onDeleteImage}
          onAddImage={this.onAddImage}
          caption="Images* (600 x 600 px, PNG or JPG)"
          isError={
            this.props.product.isValidated &&
            this.props.product.images.length === 0
          }
        />
      </BaseView>
    );
  }
}

productView_.propTypes = {
  dispatch: PropTypes.func.isRequired,

  product: productViewRedux.IProductView,
  allCategories: PropTypes.arrayOf(ICategoryView).isRequired,
  allTags: PropTypes.arrayOf(ITagView).isRequired,
  allMetrics: PropTypes.arrayOf(IMetricView).isRequired
};

function mapStateToProps(state) {
  return {
    product: state.productView,
    allCategories: categoriesActions.getItems(state),
    allTags: tagsActions.getItems(state),
    allMetrics: metricsActions.getItems(state)
  };
}

export const productView = connect(mapStateToProps)(productView_);
