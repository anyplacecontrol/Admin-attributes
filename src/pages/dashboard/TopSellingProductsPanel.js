import React from "react";
import PropTypes from "prop-types";
import {IPopularProducts} from "../../redux/modules/dashboardRedux";

export class TopSellingProductsPanel extends React.Component {

  renderPopularProductsRows = () => {
    let rowNumber = 0;
    if (!this.props.popularProducts || this.props.popularProducts.length === 0) {
      return null;
    }

    let jsx = [];

    while (rowNumber < this.props.popularProducts.length) {
      let popularProduct = this.props.popularProducts[rowNumber];

      jsx.push(
        <div key={rowNumber} className="dashboard__tr flex animated">
          <div className="dashboard__td flex animated" title={popularProduct.name}>
            <div className="dashboard__td--inner animated">
              {popularProduct.name}
            </div>
          </div>
          <div className="dashboard__td flex animated"></div>
          <div className="dashboard__td flex animated"></div>
          <div className="dashboard__td flex animated" title={popularProduct.popularity}>
            <div className="dashboard__td--inner animated">
              {popularProduct.popularity}
            </div>
          </div>
          {/*<div className="dashboard__td flex animated" title="12345999">*/}
          {/*  <div className="dashboard__td--inner dashboard-sub-text animated">*/}
          {/*    12345999*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="dashboard__td flex animated" title="$99,234.00">*/}
          {/*  <div className="dashboard__td--inner animated">*/}
          {/*    $99,234.00*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="dashboard__td flex animated" title="100%">*/}
          {/*  <div className="dashboard__td--inner animated">*/}
          {/*    <div className="dashboard__table--info animated">*/}
          {/*      <div className="dashboard__info--sub-title dashboard-sub-text animated">*/}
          {/*        2%*/}
          {/*      </div>*/}
          {/*      <img*/}
          {/*        className="dashboard__info--arrow animated"*/}
          {/*        src={require("../../assets/img/svg/dashboard-arrow-down.svg")}*/}
          {/*        alt="dashboard info direction"*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
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
                Top Selling Products
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
                {this.renderPopularProductsRows()}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

TopSellingProductsPanel.propTypes = {
  popularProducts: PropTypes.arrayOf(IPopularProducts),
  onDetailsClick: PropTypes.func.isRequired
};
