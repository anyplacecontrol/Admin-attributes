import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as categoryViewRedux from "../../redux/modules/categoryViewRedux";
import {CategoryDescription} from "./CategoryDescription";
import {ImagesPanel} from "../../components/ImagesPanel/ImagesPanel";
import {BaseView} from "../../components/BaseView/BaseView";

export class categoryView_ extends React.Component {
  onChangePriority = newValue => {
    this.props.dispatch(
      categoryViewRedux.categoryViewActions.changePriority(newValue)
    );
  };

  onChangeName = newValue => {
    this.props.dispatch(
      categoryViewRedux.categoryViewActions.changeMultiLanguageName(newValue)
    );
  };

  onChangeDescription = newValue => {
    this.props.dispatch(
      categoryViewRedux.categoryViewActions.changeDescription(newValue)
    );
  };

  onChangeSlug = newValue => {
    this.props.dispatch(
      categoryViewRedux.categoryViewActions.changeSlug(newValue)
    );
  };

  onAddImage = base64file => {
    this.props.dispatch(
      categoryViewRedux.categoryViewActions.changeImage(base64file)
    );
  };

  onDeleteImage = index => {
    this.props.dispatch(
      categoryViewRedux.categoryViewActions.changeImage(null)
    );
  };

  onChangeLanguage = (lang) => {
    this.props.dispatch(
      categoryViewRedux.categoryViewActions.changeLanguage(lang)
    );
  };

  beforeOnSubmitClick = async () => {
    this.props.dispatch(categoryViewRedux.categoryViewActions.changeLanguage("en"));
  };

  render() {
    return (
      <BaseView
        viewName="Category"
        actionsProvider={categoryViewRedux.categoryViewActions}
        beforeOnSubmitClick={this.beforeOnSubmitClick}
      >
        {/* -- Description-- */}
        <CategoryDescription
          category={this.props.category}
          onChangePriority={this.onChangePriority}
          onChangeName={this.onChangeName}
          onChangeDescription={this.onChangeDescription}
          onChangeSlug={this.onChangeSlug}
          onChangeLanguage={this.onChangeLanguage}
        />

        {/* -- Image -- */}
        <ImagesPanel
          allowMultipleImages={false}
          images={this.props.category.image ? [this.props.category.image] : []}
          onAddImage={this.onAddImage}
          onDeleteImage={this.onDeleteImage}
          caption="Image* (200 x 200 px, PNG, transparent background)"
          isError={
            this.props.category.isValidated && !this.props.category.image
          }
        />
      </BaseView>
    );
  }
}

categoryView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  category: categoryViewRedux.ICategoryView
};

function mapStateToProps(state) {
  return {
    category: state.categoryView
  };
}

export const categoryView = connect(mapStateToProps)(categoryView_);
