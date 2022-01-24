import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BaseView } from "../../components/BaseView/BaseView";
import {VisualIdentityGeneral} from "./VisualIdentityGeneral";
import {VisualIdentityColors} from  "./VisualIdentityColors";
import { ImagesPanel } from "../../components/ImagesPanel/ImagesPanel";

export class visualIdentityView_ extends React.Component {
  render() {
    return (
      <BaseView viewName="Kiosk Sleep Screen" actionsProvider={null}>
        <VisualIdentityGeneral/>       
        <VisualIdentityColors/>
        {/* -- Image -- */}
        <ImagesPanel
          allowMultipleImages={false}
          images={[]}
          onAddImage={() => {}}
          onDeleteImage={() => {}}
          caption="Light Background Logo (PNG/SVG with transparent background, 1050 x 500 px)"
          isError={false}
        />

        {/* -- Image -- */}
        <ImagesPanel
          allowMultipleImages={false}
          images={[]}
          onAddImage={() => {}}
          onDeleteImage={() => {}}
          caption="Dark Background Logo (PNG/SVG with transparent background, 1050 x 500 px)"
          isError={false}
        />
      </BaseView>
    );
  }
}

visualIdentityView_.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {};
}

export const visualIdentityView = connect(mapStateToProps)(visualIdentityView_);
