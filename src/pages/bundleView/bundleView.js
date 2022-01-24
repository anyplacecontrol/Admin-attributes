import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BaseView } from "../../components/BaseView/BaseView";
import { BundleGeneral } from "./BundleGeneral";
import { BundleBanner } from "./BundleBanner";
import { BundleDiscount } from "./BundleDiscount";
import { BundleProducts } from "./BundleProducts";
import { ImagesPanel } from "../../components/ImagesPanel/ImagesPanel";
export class bundleView_ extends React.Component {

  onChangeState = () => {};

  onAddImage = () => {};

  onDeleteImage = () => {};

  onChangeSlug = () => {};

  render() {
    return (
      <BaseView viewName="Bundle View" actionsProvider={null}>
        {/* -- General-- */}
        <BundleGeneral onChangeSlug={this.onChangeSlug} status={true}/>

        {/* -- Image -- */}
        <ImagesPanel
          allowMultipleImages={false}
          images={[]}
          onAddImage={this.onAddImage}
          onDeleteImage={this.onDeleteImage}
          caption="Bundle Images"
          // isError={
          //   this.props.recipe.isValidated && !this.props.category.image
          // }
        />

        <BundleBanner />
        <BundleDiscount />
        <BundleProducts />

      </BaseView>
    );
  }
}

bundleView_.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    bundle: state.bundleView
  };
}

export const bundleView = connect(mapStateToProps)(bundleView_);
