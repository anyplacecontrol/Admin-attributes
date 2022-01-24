import React from "react";
import * as dashboardRedux from "../../redux/modules/dashboardRedux";
import {formatPrice} from "../../utils/dataFuncs";

export class OrdersReportPanel extends React.Component {
  render() {
    if (!this.props.ordersReportTotals) return null;

    return (
      <div className="dashboard__info flex animated">

        <div className="dashboard__info--box animated">
          <div className="dashboard__info--item bg-dashboard-item animated">
            <div className="dashboard__info--part animated">
              <div className="dashboard__info--title dashboard-h3 animated">
                ${formatPrice(this.props.ordersReportTotals.grand_total)}
              </div>
              <div className="dashboard__info--sub-title dashboard-sub-text animated">
                Net Sales
              </div>
            </div>
            <div className="dashboard__info--part animated">
              {/* <div className="dashboard__info--sub-title dashboard-sub-text animated">
                2%
              </div>
              <img
                className="dashboard__info--arrow animated"
                src={require("../../assets/img/svg/dashboard-arrow-down.svg")}
                alt="dashboard info direction"
              /> */}
            </div>
          </div>
        </div>

        <div className="dashboard__info--box animated">
          <div className="dashboard__info--item bg-dashboard-item animated">
            <div className="dashboard__info--part animated">
              <div className="dashboard__info--title dashboard-h3 animated">
                {this.props.ordersReportTotals.orders}
              </div>
              <div className="dashboard__info--sub-title dashboard-sub-text animated">
                Orders Placed
              </div>
            </div>
            <div className="dashboard__info--part animated">
              {/* <div className="dashboard__info--sub-title dashboard-sub-text animated">
                6%
              </div>
              <img
                className="dashboard__info--arrow animated"
                src={require("../../assets/img/svg/dashboard-arrow-up.svg")}
                alt="dashboard info direction"
              /> */}
            </div>
          </div>
        </div>

        <div className="dashboard__info--box animated">
          <div className="dashboard__info--item bg-dashboard-item animated">
            <div className="dashboard__info--part animated">
              <div className="dashboard__info--title dashboard-h3 animated">
                ${this.props.ordersReportTotals.sumPerOrder}
              </div>
              <div className="dashboard__info--sub-title dashboard-sub-text animated">
                Average Order Value
              </div>
            </div>
            <div className="dashboard__info--part animated">
              {/* <div className="dashboard__info--sub-title dashboard-sub-text animated">
                7%
              </div>
              <img
                className="dashboard__info--arrow animated"
                src={require("../../assets/img/svg/dashboard-arrow-up.svg")}
                alt="dashboard info direction"
              /> */}
            </div>
          </div>
        </div>

        <div className="dashboard__info--box animated">
          <div className="dashboard__info--item bg-dashboard-item animated">
            <div className="dashboard__info--part animated">
              <div className="dashboard__info--title dashboard-h3 animated">
                {this.props.ordersReportTotals.itemsPerOrder} Items
              </div>
              <div className="dashboard__info--sub-title dashboard-sub-text animated">
                Average Cart Size
              </div>
            </div>
            <div className="dashboard__info--part animated">
              {/* <div className="dashboard__info--sub-title dashboard-sub-text animated">
                32%
              </div>
              <img
                className="dashboard__info--arrow animated"
                src={require("../../assets/img/svg/dashboard-arrow-down.svg")}
                alt="dashboard info direction"
              /> */}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

OrdersReportPanel.propTypes = {
  ordersReportTotals: dashboardRedux.IOrdersReportTotals
};
