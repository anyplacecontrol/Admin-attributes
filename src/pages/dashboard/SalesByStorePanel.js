import React from "react";
import PropTypes from "prop-types";
import {IStoreSales} from "../../redux/modules/dashboardRedux";
import {formatPrice} from "../../utils/dataFuncs";

export class SalesByStorePanel extends React.Component {

  renderStoresSalesRows = () => {
    let rowNumber = 0;
    if (!this.props.storesSales || this.props.storesSales.length === 0) {
      return null;
    }

    let jsx = [];

    while (rowNumber < this.props.storesSales.length) {
      let item = this.props.storesSales[rowNumber];

      jsx.push(
        <div key={rowNumber} className="dashboard__tr flex animated">
          <div className="dashboard__td flex animated" title={item.storeName}>
            <div className="dashboard__td--inner animated">
              {item.storeName}
            </div>
          </div>
          <div className="dashboard__td flex animated" title="12345999"></div>
          <div className="dashboard__td flex animated" title="count">
            {/*<div className="dashboard__td--inner dashboard-sub-text animated">*/}
            {/*  {item.ordersCount}*/}
            {/*</div>*/}
          </div>
          <div className="dashboard__td flex animated" title={item.ordersTotal}>
            <div className="dashboard__td--inner animated">
              ${formatPrice(item.ordersTotal)}
            </div>
          </div>
        </div>
      );
      rowNumber = rowNumber + 1;
    }

    return jsx;
  };

  render() {
    return (
      <>
        <div className="dashboard__full-info--box animated">
          <div className="dashboard__full-info--item bg-dashboard-item animated">
            <div className="dashboard__full-info--top flex animated">
              <div className="dashboard__full-info--title dashboard-h3 animated">
                Sales by Store
              </div>
              <div className="dashboard__full-info--view flex animated">
                <a
                  className="dashboard__full-info--link pointer animated"
                  onClick={this.props.onDetailsClick}
                >
                  View Details
                </a>
              </div>
            </div>
            <div className="dashboard__table flex animated">
              <div className="dashboard__tbody flex animated">
                {this.renderStoresSalesRows()}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

SalesByStorePanel.propTypes = {
  storesSales: PropTypes.arrayOf(IStoreSales),
  onDetailsClick: PropTypes.func.isRequired
};
