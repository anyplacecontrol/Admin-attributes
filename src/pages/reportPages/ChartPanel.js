import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import * as constants from "../../consts/constants";
import { IColumn } from "../../consts/tableColumns";
import * as serviceFuncs from "../../utils/serviceFunctions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";
import ReactResizeDetector from "react-resize-detector";
import * as dataFuncs from "../../utils/dataFuncs";

const legendHeight = 62.7;

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;

    //if string should be splited to separate substrings:
    if (payload.value.includes("|")) {
      let arr = payload.value.split("|");
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
            {arr[1]}
          </text>
          <text x={0} y={20} dy={16} textAnchor="middle" fill="#666">
            {arr[0]}
          </text>
        </g>
      );
    }

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
          {payload.value}
        </text>
      </g>
    );
  }
}

CustomizedAxisTick.propTypes = {
  x: PropTypes.any,
  y: PropTypes.any,
  payload: PropTypes.any
};

export class ChartPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      divWidth: 0,
      divHeight: 0,
      activeChartIndex: 0
    };
  }

  onWidthResize = (width, height) => {
    this.setState({ divWidth: width });
    this.props.onChangeChartSize(width, this.state.divHeight);
  };

  onHeightResize = (width, height) => {
    let h = 376;
    if (height > (this.props.columns.length - 1) * legendHeight - 1) h = height;
    this.setState({ divHeight: h });
    this.props.onChangeChartSize(this.state.divWidth, h);
  };

  getTotalsHeight() {
    return { minHeight: "200px" };
  }

  onLegendEnter = index => {
    this.setState({ activeChartIndex: index });
  };

  onLegendLeave = index => {
    if (this.state.activeChartIndex === index)
      this.setState({ activeChartIndex: 0 });
  };

  renderTotals = () => {
    if (!this.props.visibleCharts) return;

    return this.props.columns.map((column, index) => {
      if (column.accessorSort != "date") {
        let description = column.legend;

        let dataField = "";
        let dataItem = this.props.totals;

        try {
          if (serviceFuncs.isFunction(column.accessor))
            dataField = column.accessor(dataItem);
          else dataField = dataItem[column.accessor];
        } catch (e) {}

        let _checked = this.props.visibleCharts[index];

        return (
          <div
            key={index}
            className="schedule__item animated"
            style={{ height: legendHeight }}
            onMouseEnter={() => this.onLegendEnter(index)}
            onMouseLeave={() => this.onLegendLeave(index)}
          >
            <div
              className="schedule__marker animated"
              style={{ backgroundColor: column.color }}
            />

            <div className="schedule__title--box flex animated">
              <div className="checkbox animated">
                <input
                  className="checkbox__input animated"
                  id={"schedule-" + index}
                  type="checkbox"
                />
                <label
                  onClick={() => this.props.onLegendCheckboxClick(index)}
                  className={
                    _checked === true
                      ? "checkbox__label animated checked"
                      : "checkbox__label animated"
                  }
                  htmlFor={"schedule-" + index}
                />
              </div>
              <div className="schedule__title animated">{dataField}</div>
            </div>

            <div className="schedule__sub-title animated">{description}</div>
          </div>
        );
      }
    });
  };

  // getFormattedData = () => {
  //   return this.props.items.map(item => {
  //     let newItem = { ...item };
  //     //newItem.date = dataFuncs.truncateDate(newItem.date);
  //     return newItem;
  //   });
  // };

  getRanges = fieldName => {
    let min = 10000000000;
    let max = 0;
    for (let i = 0; i < this.props.items.length; i++) {
      let item = this.props.items[i];
      if (parseFloat(item[fieldName]) < min) min = parseFloat(item[fieldName]);
      if (parseFloat(item[fieldName]) > max) max = parseFloat(item[fieldName]);
    }
    return { min, max };
  };

  getRangesForYAxis = axisSide => {
    let minimum = 10000000000;
    let maximum = 0;
    let isVisible = false;

    for (let i = 0; i < this.props.columns.length; i++) {
      //if graphic is visible and it is related to specified side
      if (
        this.props.columns[i].yAxis === axisSide &&
        this.props.visibleCharts[i]
      ) {
        isVisible = true;

        //Find min and max values on this graphic
        let fieldName = this.props.columns[i].accessorSort;
        let { max, min } = this.getRanges(fieldName);
        if (min < minimum) minimum = min;
        if (max > maximum) maximum = max;
      }
    }
    return { isVisible, minimum, maximum };
  };

  renderLines = () => {
    if (!this.props.visibleCharts) return;

    let jsxArr = [];
    for (let i = 1; i < this.props.columns.length; i++) {
      let column = this.props.columns[i];
      if (this.props.visibleCharts[i])
        jsxArr.push(
          <Line
            key={i}
            yAxisId={column.yAxis || "left"}
            type="monotone"
            dataKey={column.accessorSort}
            stroke={column.color}
            strokeWidth={this.state.activeChartIndex === i ? 3 : 1}
          />
        );
    }
    return jsxArr;
  };

  getLeftYAxisText = () => {
    //if dateStr is splitted by "|", it is report of temperatures
    if (
      this.props.items &&
      this.props.items.length > 0 &&
      this.props.items[0] &&
      this.props.items[0].dateStr &&
      this.props.items[0].dateStr.includes("|")
    )
      return "°C";
    else return "dollars";
  };

  render() {
    let rightYAxis = this.getRangesForYAxis("right");
    let leftYAxis = this.getRangesForYAxis("left");

    return (
      <div className="schedule__body flex animated">
        <div
          className="schedule__items animated"
          style={this.getTotalsHeight()}
        >
          <ReactResizeDetector handleHeight onResize={this.onHeightResize} />
          {this.renderTotals()}
        </div>
        <div className="schedule__box animated">
          <ReactResizeDetector handleWidth onResize={this.onWidthResize} />
          <div style={{ height: 15 }} />
          <div
            id="chartId"
            className="chart-container"
            style={{ backgroundColor: "white" }}
          >
            <LineChart
              width={this.state.divWidth}
              height={this.state.divHeight}
              data={this.props.items}
              margin={{
                top: 0,
                right: 5,
                left: 5
                //bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="dateStr"
                height={50}
                tick={<CustomizedAxisTick />}
              />
              {leftYAxis.isVisible && (
                <YAxis
                  yAxisId="left"
                  domain={[leftYAxis.minimum, leftYAxis.maximum]}
                  label={{
                    value: this.getLeftYAxisText(),
                    angle: -90,
                    position: "insideLeft"
                  }}
                />
              )}

              {rightYAxis.isVisible && (
                <YAxis
                  scale="auto"
                  type="number"
                  domain={[rightYAxis.minimum, rightYAxis.maximum]}
                  yAxisId="right"
                  orientation="right"
                  label={{
                    value: "items",
                    angle: -90,
                    position: "insideRight"
                  }}
                />
              )}
              <Tooltip />
              <Legend />

              {this.renderLines()}
            </LineChart>
          </div>
        </div>
      </div>
    );
  }
}

ChartPanel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  totals: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(IColumn).isRequired,
  visibleCharts: PropTypes.arrayOf(PropTypes.bool),
  onChangeChartSize: PropTypes.func.isRequired, //arguments are (width, height)
  onLegendCheckboxClick: PropTypes.func.isRequired //argument is index of legend
};
