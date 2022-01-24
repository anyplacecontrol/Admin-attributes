import React from "react";
import PropTypes from "prop-types";
import {IColumn} from "../../consts/tableColumns";
import {BaseTableActions} from "../../redux/modules/baseTableRedux";
import {
  ShowAlert,
  HideAlert,
  ALERT_ERROR,
  IAlert
} from "../../redux/modules/uiRedux";
import {AlertPanel} from "../../components/TableControls/AlertPanel";
import {Filter} from "../../components/TableControls/Filter";
import {IFilterItems} from "../../consts/tableFilters";
import {TablePanel} from "../../components/TablePanel/TablePanel";
import * as consts from "../../consts/constants";
import {StepButtons} from "./StepButtons";
import {ValuesTypeButtons} from "./ValuesTypeButtons";
import {ChartPanel} from "./ChartPanel";
import * as exports from "./exports";
import {TopButtons} from "../../components/BaseView/TopButtons";
import * as routingRedux from "../../redux/modules/routingRedux";
import {CSVLink} from "react-csv";

export class ReportPage extends React.Component {
  constructor(props) {
    super(props);

    this.exportButton = null;

    this.state = {
      csvData: [],
      chartWidth: 0,
      chartHeight: 0,
      visibleCharts: [] //array of indexes of columns associated with charts
    };
  }

  selectAllCharts = () => {
    //all charts are visible by default
    let arr = [];
    for (let i = 0; i < this.props.columns.length; i++) arr.push(true);
    this.setState({visibleCharts: arr});
  };

  async componentDidMount() {
    if (!this.props.items || this.props.items.length === 0) {
      await this.props.dispatch(this.props.actionsProvider.loadFilterItems());
    }

    this.selectAllCharts();

    //do clean fetch with zero filters only if needed
    //await this.props.dispatch(this.props.actionsProvider.cleanFetch());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.columns !== this.props.columns) {
      this.selectAllCharts();
    }
  }

  onChangeChartSize = (chartWidth, chartHeight) => {
    this.setState({chartWidth, chartHeight});
  };

  onLegendCheckboxClick = index => {
    let arr = [...this.state.visibleCharts];
    arr[index] = !arr[index];
    this.setState({visibleCharts: arr});
  };

  onApplyFilterClick = (doNotShowAlert = false) => {
    if (this.props.filterItems[0].labelText.indexOf("optional") < 0)
      if (this.props.filterItems[0].value.startDate === null) {
        if (!doNotShowAlert)
          this.props.dispatch(
            ShowAlert(
              "Date is not specified. Report can not be generated!",
              ALERT_ERROR
            )
          );
        return;
      }

    this.props.dispatch(HideAlert());
    this.props.dispatch(this.props.actionsProvider.fetchItems());
  };

  onAlertClose = () => {
    this.props.dispatch(HideAlert());
  };

  onChangeFilterValue = (filterItem, newValue) => {
    this.props.dispatch(
      this.props.actionsProvider.changeFilterValue(filterItem, newValue)
    );
  };

  onChangeStep = async step => {
    await this.props.dispatch(this.props.actionsProvider.changeStep(step));

    this.onApplyFilterClick(true);
  };

  onChangeValuesType = async valuesType => {
    await this.props.dispatch(
      this.props.actionsProvider.changeValuesType(valuesType)
    );

    this.onApplyFilterClick(true);
  };

  onSortClick = columnObj => {
    this.props.dispatch(this.props.actionsProvider.sortItemsBy(columnObj));
  };

  exportToPdf = async chartDomId => {
    try {
      exports.exportToPdf(
        chartDomId,
        this.props.items,
        this.props.filterItems,
        this.props.columns,
        this.props.totals,
        this.state.visibleCharts,
        this.props.sortBy,
        this.props.sortOrder,
        this.props.step,
        this.props.valuesType,
        this.props.tableName,
        this.state.chartWidth,
        this.state.chartHeight,
        this.props.spacesCount,
        this.props.useChart
      );
    } catch (err) {
      this.props.dispatch(
        ShowAlert("Error. See console log for details", ALERT_ERROR)
      );
      console.error(err);
    }
  };

  getCsvData = () => {
    let data = [];
    let headerRow = [];
    let bodyRows = [];

    for (let i = 0; i < this.props.columns.length; i++) {
      let headerObj = this.props.columns[i];
      headerRow.push(headerObj.text);

      for (let j = 0; j < this.props.items.length; j++) {
        let itemObj = this.props.items[j];
        let accessor = headerObj.accessorSort;

        if (!bodyRows[j]) {
          bodyRows[j] = [];
        }

        if (accessor === 'date') {
          bodyRows[j].push(itemObj.dateStr);
        } else if (!accessor && headerObj.text === 'Avg. Temp') {
          bodyRows[j].push(itemObj.temperature.value);
        } else {
          bodyRows[j].push(itemObj[accessor]);
        }
      }
    }

    data.push(headerRow);
    for (let k = 0; k < bodyRows.length; k++) {
      data.push(bodyRows[k]);
    }

    this.setState({
      csvData: data,
    });
  };

  //-----------------------------------------------------------------------------
  render() {
    let isAnyData = this.props.items && this.props.items.length > 0;

    return (
      <div>
        {this.props.subCaption && (
          <div className="buttons__top flex w100 animated" id="top">
            <div className="buttons__left flex animated">
              <button
                className="back animated"
                type="button"
                onClick={() => {
                  this.props.dispatch(routingRedux.goto_Back());
                }}
              />
              <div className="buttons__title animated">
                {this.props.subCaption}
              </div>
            </div>
          </div>
        )}

        {this.props.alert && this.props.alert.text && (
          <div style={{paddingBottom: 30}}>
            <AlertPanel
              text={this.props.alert.text}
              kind={this.props.alert.kind}
              onClose={this.onAlertClose}
            />
          </div>
        )}

        {this.props.filterItems && this.props.filterItems.length > 0 && (
          <>
            <Filter
              buttonText="Show Report"
              filterItems={this.props.filterItems}
              onApplyFilterClick={() => this.onApplyFilterClick()}
              onChangeFilterValue={this.onChangeFilterValue}
            />

            {(this.props.step || this.props.valuesType) && (
              <div className="schedule w100 animated">
                <div className="schedule__buttons flex animated">
                  {this.props.step && (
                    <div className="schedule__buttons--left flex animated">
                      <StepButtons
                        step={this.props.step}
                        onChangeStep={this.onChangeStep}
                      />
                    </div>
                  )}

                  {this.props.valuesType && (
                    <div className="schedule__buttons--right flex animated">
                      <ValuesTypeButtons
                        valuesType={this.props.valuesType}
                        onChangeValuesType={this.onChangeValuesType}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {isAnyData && (
          <>
            {this.props.useChart && (
              <div style={{backgroundColor: "white"}}>
                <ChartPanel
                  items={this.props.items || []}
                  totals={this.props.totals}
                  columns={this.props.columns}
                  onLegendCheckboxClick={this.onLegendCheckboxClick}
                  onChangeChartSize={this.onChangeChartSize}
                  visibleCharts={this.state.visibleCharts}
                />
              </div>
            )}

            <TablePanel
              items={this.props.items || []}
              totals={this.props.totals}
              sortBy={this.props.sortBy}
              sortOrder={this.props.sortOrder}
              columns={this.props.columns}
              onSortClick={this.onSortClick}
            />
          </>
        )}

        {(!this.props.items || this.props.items.length === 0) && (
          <div style={{paddingTop: 30, fontSize: "1.5em"}}>
            {
              window.location.pathname === '/reportInventoryByStore'
                ? 'Select search parameters to find expiration data.'
                : 'No data found based on applied filters'
            }
          </div>
        )}

        {isAnyData && (
          <div
            className="schedule__buttons flex animated"
            style={{marginTop: 15}}
          >
            <div/>
            <div className="schedule__buttons--right flex animated">
              <div
                className="schedule__button flex export animated"
                onClick={() => {
                  const chart = document.querySelector("#chartId");
                  this.exportToPdf(chart);
                }}
              >
                Export to PDF
              </div>
              {(['/reportsTemperature', '/reportTemperaturesByStore'].includes(window.location.pathname)) && (
                <CSVLink
                  className="schedule__button flex export animated"
                  filename={
                    "Temperature History (" + new Date().toString() + ").csv"
                  }
                  onClick={() => {
                    this.getCsvData()
                  }}
                  data={this.state.csvData}
                >
                  Export to CSV
                </CSVLink>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

ReportPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  alert: IAlert,
  filterItems: IFilterItems.isRequired,
  step: PropTypes.string,
  useChart: PropTypes.bool,
  valuesType: PropTypes.string,
  tableName: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(IColumn).isRequired,
  totals: PropTypes.object.isRequired,
  sortBy: IColumn.isRequired,
  sortOrder: PropTypes.string.isRequired,
  subCaption: PropTypes.string,
  spacesCount: PropTypes.number,
  actionsProvider: PropTypes.instanceOf(BaseTableActions).isRequired
};
