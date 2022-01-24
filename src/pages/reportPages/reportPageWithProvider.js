import React from "react";
import { connect } from "react-redux";
import  {ReportPage} from "./ReportPage";
import * as routing from "../../redux/modules/routingRedux";

//----------------------------------------------------------------------------
export const reportPageWithProvider = (actionsProvider) => {

  class HOC extends React.Component {

    render() {
        return <ReportPage {...this.props} actionsProvider={actionsProvider}/>
    }
  }

  function mapStateToProps(state) {
    return {
      items: actionsProvider.getItems(state),
      totals: actionsProvider.getTotals(state),
      columns: actionsProvider.getColumns(state),
      tableName: routing.getHeader(state).name,
      sortBy: actionsProvider.getSortBy(state),
      sortOrder: actionsProvider.getSortOrder(state),
      alert: state.ui.alert,
      filterItems: actionsProvider.getFilterItems(state),
      step: actionsProvider.getStep(state),
      useChart: actionsProvider.getUseChart(state),
      valuesType: actionsProvider.getValuesType(state),
      subCaption: actionsProvider.getSubCaption(state),
      spacesCount: actionsProvider.getSpacesCount(state), 
    };
  }

  return connect(mapStateToProps)(HOC);
};
