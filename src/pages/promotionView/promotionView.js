import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BaseView } from "../../components/BaseView/BaseView";
import {PromotionGeneral} from "./PromotionGeneral";
import {PromotionSettings} from "./PromotionSettings";

export class promotionView_ extends React.Component {
  
  render() {
    return (
      <BaseView viewName="Promotion" actionsProvider={null}>       
       <PromotionGeneral/>
       <PromotionSettings/>
      </BaseView>
    );
  }
}

promotionView_.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    
  };
}

export const promotionView = connect(mapStateToProps)(promotionView_);
