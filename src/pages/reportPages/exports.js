import domtoimage from "dom-to-image";
import JsPDF from "jspdf";
import * as dataFuncs from "../../utils/dataFuncs";
import {height} from "window-size";
import * as constants from "../../consts/constants";

function generateData(
  items,
  columns,
  totals,
  sortBy,
  sortOrder,
  spacesCount = 0
) {
  let result = [{}];

  //rows
  let sortedData = dataFuncs.sortObjArray(
    items,
    sortBy.accessorSort,
    sortOrder
  );
  for (let dataIndex = 0; dataIndex < sortedData.length; dataIndex++) {
    let dataItem = sortedData[dataIndex];
    let dataRow = dataFuncs.getReportRowObj(dataItem, columns);
    result.push(dataRow);
  }

  //headers
  let headersRow = {};
  for (let i = 0; i < columns.length; i++) {
    let maxLength = dataFuncs.getLongestTextLength(result, i);

    let text = columns[i].text;
    while (text.length < spacesCount || text.length < maxLength) {
      text = text + " ";
    }
    headersRow[i] = text;
  }
  result[0] = headersRow;

  //totals
  if (totals) {
    let totalsRow = dataFuncs.getReportRowObj(totals, columns);
    result.push(totalsRow);
  }

  return result;
}

export async function exportToPdf(
  chartDomId,
  items,
  filterItems,
  columns,
  totals,
  visibleCharts,
  sortBy,
  sortOrder,
  step,
  valuesType,
  tableName,
  chartWidth,
  chartHeight,
  spacesCount,
  useChart
) {
  const doc = new JsPDF({
    putOnlyUsedFonts: true,
    orientation: "landscape",
    unit: "px"
  });

  const pdfWidth = doc.internal.pageSize.getWidth();
  const pdfHeight = doc.internal.pageSize.getHeight();

  doc.setFontSize(30);
  doc.setFontStyle("normal");
  doc.text(tableName, pdfWidth / 2, 40, null, null, "center");

  //Filters values
  doc.setFontSize(15);
  let startY = 70;
  for (let i = 0; i < filterItems.length; i++) {
    let filterItem = filterItems[i];
    let value = dataFuncs.getFilterText(filterItem);
    if (
      value != "" &&
      value != constants.anyValue &&
      value != "not Implemented"
    ) {
      doc.text(filterItem.labelText + ": " + value, 25, startY);
      startY = startY + 20;
    }
  }

  if (useChart) {
    //Legend
    startY = startY + 20;

    if (totals) {
      let totalsRow = dataFuncs.getReportRowObj(totals, columns);
      for (let i = 0; i < columns.length; i++) {
        let column = columns[i];
        if (column.accessorSort === "date") continue;
        if (!visibleCharts[i]) continue;

        let description = column.legend;
        description =
          description.charAt(0).toUpperCase() + description.slice(1);
        let dataField = totalsRow[i];
        doc.setTextColor(column.color);
        doc.text(description + ": " + dataField, 25, startY);
        startY = startY + 20;
      }
    }

    //Chart
    const scale = 2;
    //if any display bug, please read:
    //https://github.com/tsayen/dom-to-image/issues/69
    const dataUrl = await domtoimage.toPng(chartDomId, {
      height: chartDomId.offsetHeight * scale,
      style: {
        transform: `scale(${scale}) translate(${(chartDomId.offsetWidth *
          (scale - 1)) /
        2 /
        scale}px, ${(chartDomId.offsetHeight * (scale - 1)) / 2 / scale}px)`
      },
      width: chartDomId.offsetWidth * scale
    });
    doc.addPage();
    let width, height;
    let maxWidth = pdfWidth / 1.1;
    let maxHeight = pdfHeight / 1.1;
    let proportion = chartWidth / chartHeight;
    if (maxWidth / proportion < maxHeight) {
      width = maxWidth;
      height = maxWidth / proportion;
    } else {
      height = maxHeight;
      width = height * proportion;
    }
    let centerX = pdfWidth / 2;
    let centerY = pdfHeight / 2;
    let halfChartWidth = width / 2;
    let halfChartHeight = height / 2;
    let x = centerX - halfChartWidth;
    let y = centerY - halfChartHeight;

    doc.addImage(dataUrl, "PNG", x, y + 10, width, height);
    doc.setTextColor(0);
    doc.setFontSize(10);
    if (step)
      doc.text("Horizontal Step: " + step, x + 75, y);
    if (valuesType)
      doc.text("Values type: " + valuesType, x + 170, y);

  }
  //Table
  doc.addPage();
  doc.setDrawColor(200);
  doc.table(
    40,
    20,
    generateData(items, columns, totals, sortBy, sortOrder, spacesCount),
    null,
    {
      autoSize: true,
      printHeaders: false,
      fontSize: 12
    }
  );

  doc.save(tableName + "(" + dataFuncs.truncateDate(new Date()) + ")");
}
