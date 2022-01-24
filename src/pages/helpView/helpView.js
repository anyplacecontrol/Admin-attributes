import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BaseView } from "../../components/BaseView/BaseView";
import { HelpGeneral } from "./HelpGeneral";

export class helpView_ extends React.Component {
  onChangeCountry = () => {};

  onChangeState = () => {};

  onChangeSlug = () => {};

  render() {
    return (
      <BaseView viewName="Help" actionsProvider={null}>
        {/* -- General-- */}
        <HelpGeneral onChangeSlug={this.onChangeSlug} status={true}/>

      </BaseView>
    );
  }
}

helpView_.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    //recipe: state.recipeView
  };
}

export const helpView = connect(mapStateToProps)(helpView_);
