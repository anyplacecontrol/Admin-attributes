import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {UsersTypes} from "./UsersTypes";

export class usersTypesView_ extends React.Component {

  render() {
    return (
       <UsersTypes />
    );
  }
}

usersTypesView_.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

export const usersTypesView = connect(mapStateToProps)(usersTypesView_);
