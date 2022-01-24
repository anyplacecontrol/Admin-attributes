import React from "react";
import {IExpiringProducts} from "../../redux/modules/dashboardRedux";
import PropTypes from "prop-types";
import * as dataFuncs from "../../utils/dataFuncs";

export class ExpiringProductsPanel extends React.Component {
  renderProducts = () => {
    let rowNumber = 0;
    if (
      !this.props.expiringProducts ||
      this.props.expiringProducts.length === 0
    ) {
      return null;
    }

    let jsx = [];

    while (rowNumber < 5 && rowNumber < this.props.expiringProducts.length) {
      let product = this.props.expiringProducts[rowNumber];

      jsx.push(
        <div key={rowNumber} className="dashboard__tr flex animated">
          <div className="dashboard__td flex animated" title="Beef Stir-Fry">
            <div className="dashboard__td--inner animated">
              {product.name}
            </div>
          </div>
          <div className="dashboard__td flex animated" title="12345999">
            {/*<div className="dashboard__td--inner dashboard-sub-text animated">*/}
            {/*  Machine #999*/}
            {/*</div>*/}
          </div>
          <div className="dashboard__td flex animated" title="Store #9999">
            {/*<div className="dashboard__td--inner animated">*/}
            {/*  Store #9999*/}
            {/*</div>*/}
          </div>
          <div className="dashboard__td flex animated" title="Machine #999">
            <div className="dashboard__td--inner animated">
              {product.itemsExpiring
                ? product.itemsExpiring
                : ""}
            </div>
          </div>
        </div>
      );

      rowNumber += 1;
    }

    return jsx;
  };

  render() {
    return (
      <>
        {/* ---Expiring Inventory--- */}
        <div className="dashboard__full-info--box animated">
          <div className="dashboard__full-info--item bg-dashboard-item animated">
            <div className="dashboard__full-info--top flex animated">
              <div className="dashboard__full-info--title dashboard-h3 animated">
                Expiring Inventory
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
                {this.renderProducts()}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

ExpiringProductsPanel.propTypes = {
  expiringProducts: PropTypes.arrayOf(IExpiringProducts),
  onDetailsClick: PropTypes.func.isRequired
};
