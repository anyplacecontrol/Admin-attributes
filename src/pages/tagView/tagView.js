import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as tagViewRedux from "../../redux/modules/tagViewRedux";
import { TagDescription } from "./TagDescription";
import { BaseView } from "../../components/BaseView/BaseView";

export class tagView_ extends React.Component {
  onChangeName = newValue => {
    this.props.dispatch(tagViewRedux.tagViewActions.changeName(newValue));
  };

  render() {
    return (
      <BaseView viewName="Tag" actionsProvider={tagViewRedux.tagViewActions}>
        {/* -- Description-- */}
        <TagDescription tag={this.props.tag} onChangeName={this.onChangeName} />
      </BaseView>
    );
  }
}

tagView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tag: tagViewRedux.ITagView
};

function mapStateToProps(state) {
  return {
    tag: state.tagView
  };
}

export const tagView = connect(mapStateToProps)(tagView_);
