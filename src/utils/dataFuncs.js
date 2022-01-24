import * as serviceFuncs from "./serviceFunctions";
import * as constants from "../consts/constants";

//------------------------------------------------------------------------------
export function categoriesAsString(categories) {
  let result = "";
  if (!categories) return result;
  for (let i = 0; i < categories.length; i++) {
    result = result + (categories[i].name || "");
    if (i < categories.length - 1) result = result + ", ";
  }

  return result;
}

export function getProductsCategoriesAsString(products) {
  let categoriesArray = [];
  let result = "";

  if (!products) {
    return result;
  }

  products.forEach(item => {
    let categories = item.categories;
    if (!categories) {
      return result;
    }
    for (let i = 0; i < categories.length; i++) {
      categoriesArray.push(categories[i].name);
      if (i < categories.length - 1) {
        result = result + ", ";
      }
    }
  });

  let uniqueCategories = [...new Set(categoriesArray)];
  result = uniqueCategories.join(", ");

  return result;
}

export function tagsAsString(tags) {
  let result = "";
  for (let i = 0; i < tags.length; i++) {
    if (!tags[i].name || tags[i].name == "") {
      continue;
    }

    result = result + tags[i].name;
    if (i < tags.length - 1 && result != "") {
      result = result + ", ";
    }
  }

  return result;
}

//allItems - array of all possible items for list (objects)
//checkedItems - array of objects which are checked/selected
//accessorText - field of object used to display text in list
//accessorIdentificator - field of object used to compare objects in both arrays (allItems, checkedItems). if only this field is equal, item counted as "checked"
export function createMultiSelectBoxItems(
  allItems,
  checkedItems,
  accessorText,
  accessorIdentificator,
  onItemClick
) {
  return allItems.map(item => {
    return {
      isChecked: serviceFuncs.isObjectAccessorInArray(
        item,
        checkedItems,
        accessorIdentificator
      ),
      text: item[accessorText],
      onClick: () => onItemClick(item)
    };
  });
}

export function createSelectBoxItems(allItems, accessorText, onItemClick) {
  return allItems.map(item => {
    return {
      text: item[accessorText],
      onClick: () => onItemClick(item)
    };
  });
}

export function formatPrice(price) {
  let res = parseFloat(price).toLocaleString('en');
  return res;
}

export function convertPrice(price) {
  let res = formatPrice((price / 100).toFixed(2));
  return res;
}

export function withCoins(price) {
  if (isNaN(price)) {
    return price;
  }

  try {
    return convertPrice(price * 100);
  } catch (e) {
    return price;
  }
}

export function getProductItemPrice(productItem) {
  if (productItem.price) {
    return convertPrice(productItem.price);
  }

  //calculate weight * product_price_per_kilogram
  return "calculate";
}

export function getAllProductsName(products) {
  let result = "";
  if (!products) {
    return result;
  }

  for (let i = 0; i < products.length; i++) {
    result = result + products[i].name;
    if (i < products.length - 1) {
      result = result + ", ";
    }
  }
  return result;
}

export function categoriesIncludesName(categories, name) {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].name === name) {
      return true;
    }
  }

  return false;
}

export function isItemByIdExists(Id, items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id.toString() === Id.toString()) {
      return true;
    }
  }

  return false;
}

export function getItemById(Id, items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id.toString() === Id.toString()) {
      return items[i];
    }
  }

  throw "getItemById failed. ID not found:" + Id;
}

export function marblingToString(marbling) {
  let str2 = "-";
  switch (marbling) {
    case 1:
      str2 = "Lean";
      break;
    case 2:
      str2 = "Medium";
      break;
    case 3:
      str2 = "Heavy";
      break;
  }

  return str2;
}

export function tiedToString(tied) {
  if (tied === true) {
    return "Yes";
  }
  if (tied === false) {
    return "No";
  }

  return "-";
}

export function getGmtTimeFormat(date) {
  let dt = new Date(date);
  let hours = dt.getUTCHours();
  let AmOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  let minutes = dt.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let seconds = dt.getSeconds();
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let finalTime = ", " + hours + ":" + minutes + ":" + seconds + " " + AmOrPm;
  // finalTime; // final time Time - 22:10

  return finalTime;
}

export function truncateDate(dateStr, details = constants.REPORT_DAILY) {
  if (!dateStr || dateStr === "") {
    return "";
  }

  let date = new Date(dateStr);
  let day = date.getDate();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;

  switch (month) {
    case 1:
      month = "Jan";
      break;
    case 2:
      month = "Feb";
      break;
    case 3:
      month = "Mar";
      break;
    case 4:
      month = "Apr";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "Jun";
      break;
    case 7:
      month = "Jul";
      break;
    case 8:
      month = "Aug";
      break;
    case 9:
      month = "Sep";
      break;
    case 10:
      month = "Oct";
      break;
    case 11:
      month = "Nov";
      break;
    case 12:
      month = "Dec";
      break;
  }

  if (day.toString().length == 1) {
    day = "0" + day;
  }

  if (details === constants.REPORT_MONTHLY) {
    return `${month} ${year}`;
  }
  if (details === constants.REPORT_ANNUAL) {
    return year.toString();
  }

  return day + "-" + month + "-" + year;
}

export function dateRangeToISOFormat(date1, date2) {
  let dateObj1 = new Date(date1);
  let month1 = dateObj1.getMonth() + 1;
  month1 = month1.toString();
  if (month1.length == 1) {
    month1 = "0" + month1;
  }

  let day1 = dateObj1.getDate().toString();
  if (day1.length == 1) {
    day1 = "0" + day1;
  }
  let year1 = dateObj1.getFullYear();

  let dateObj2 = new Date(date2);
  let month2 = dateObj2.getMonth() + 1;
  month2 = month2.toString();
  if (month2.length == 1) {
    month2 = "0" + month2;
  }

  let day2 = dateObj2.getDate().toString();
  if (day2.length == 1) {
    day2 = "0" + day2;
  }
  let year2 = dateObj2.getFullYear();

  let result = {
    startDate: year1 + "-" + month1 + "-" + day1 + "T00:00:00.000Z",
    endDate: year2 + "-" + month2 + "-" + day2 + "T23:59:59.999Z"
  };

  return result;
}

export function timestampToShortDate(timestamp) {
  const time = new Date(timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const year = time
    .getFullYear()
    .toString()
    .substr(2, 2);
  const month = months[time.getMonth()];
  const date = time.getDate();

  let formattedTime = `${date}-${month}-${year}`;

  return formattedTime;
}

export function timestampToDate(timestamp) {
  const time = new Date(timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const year = time.getFullYear();
  const month = months[time.getMonth()];
  const date = time.getDate();

  let formattedTime = `${date} ${month} ${year}`;

  return formattedTime;
}

export function timestampToTime(timestamp) {
  const time = new Date(timestamp * 1000);
  const hour = time.getHours();
  const min =
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  const sec =
    time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();

  let formattedTime = `${hour}:${min}:${sec}`;

  return formattedTime;
}

export function timestampToDateTime(timestamp) {
  return timestampToDate(timestamp) + " " + timestampToTime(timestamp);
}

export function dateToString(date) {
  if (!date) {
    return "";
  }

  let dateObj = new Date(date);
  let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  let day = ("0" + dateObj.getDate()).slice(-2);
  let year = dateObj.getFullYear();

  return `${month}/${day}/${year}`;
}

export function truncateString(str, num) {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str;
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + "...";
}

export function truncateDateTime(dateTimeStr) {
  if (!dateTimeStr) {
    return "";
  }

  dateTimeStr = dateTimeStr.replace("T", " ");

  return dateTimeStr.substring(0, 19);
}

export function getFilterTooltipText(filterItem) {
  switch (filterItem.type) {
    case "multiSelectBox": {
      let result = "";

      if (filterItem.hasOwnProperty("tooltipText")) {
        result = filterItem.tooltipText;
      }

      return result;
    }

    default:
      return "";
  }
}

export function getFilterText(filterItem) {
  switch (filterItem.type) {
    case "input":
    case "arrayInput":
    case "numberInput":
      return filterItem.value;

    case "dateRange":
    case "advancedDateRange": {
      if (
        !filterItem.value ||
        (!filterItem.value.startDate && !filterItem.value.endDate)
      ) {
        return "";
      } else {
        return (
          dateToString(filterItem.value.startDate) +
          " - " +
          dateToString(filterItem.value.endDate)
        );
      }
    }

    case "selectBox": {
      let result = filterItem.accessorText(filterItem.value);
      if (!result || result === "") {
        result = constants.anyValue;
      }

      return result;
    }

    case "multiSelectBox": {
      let result = "";

      filterItem.value.forEach(item => {
        result = result + filterItem.accessorText(item) + ",";
      });

      if (result === "") {
        result = constants.anyValue;
      }

      return result;
    }

    default:
      return "";
  }
}

export function createFilterObject(filterItems) {
  let result = {};

  filterItems.forEach(filterItem => {
    switch (filterItem.type) {
      case "input":
        if (filterItem.value != "" && filterItem.apiParamName != "unknown") {
          result[filterItem.apiParamName] = filterItem.value;
        }
        break;

      case "arrayInput":
        if (filterItem.value != "" && filterItem.apiParamName != "unknown") {
          result[filterItem.apiParamName] = [filterItem.value];
        }
        break;

      case "numberInput":
        if (filterItem.value != "" && filterItem.apiParamName != "unknown")
          result[filterItem.apiParamName] = parseFloat(filterItem.value);
        break;

      case "dateRange":
      case "advancedDateRange":
        if (
          filterItem.value &&
          filterItem.value.startDate &&
          filterItem.value.endDate &&
          filterItem.apiParamName != "unknown"
        )
          result[filterItem.apiParamName] = dateRangeToISOFormat(
            filterItem.value.startDate,
            filterItem.value.endDate
          );
        break;

      case "sliderRange":
        if (filterItem.value) {
          result[filterItem.apiParamName] = filterItem.value;
        }
        break;

      case "selectBox":
        if (
          filterItem.accessorText(filterItem.value) != constants.anyValue &&
          filterItem.apiParamName != "unknown"
        ) {
          let text = filterItem.accessorApi(filterItem.value);

          if (text != "") {
            result[filterItem.apiParamName] = text;
          }
        }
        break;

      case "multiSelectBox": {
        if (filterItem.apiParamName != "unknown") {
          let res = [];
          filterItem.value.forEach(valueItem => {
            let apiValue = filterItem.accessorApi(valueItem);
            res.push(apiValue);
          });
          if (res.length > 0) {
            result[filterItem.apiParamName] = res;
          }
        }
        break;
      }
    }
  });

  return result;
}

export function getStoreByMachineId(storeItems, machineId) {
  if (!storeItems || !machineId || machineId === "") {
    return null;
  }

  for (let i = 0; i < storeItems.length; i++) {
    if (storeItems[i].machineId === machineId) {
      return storeItems[i];
    }
  }
}

export function getStoreByStoreId(storeItems, storeId) {
  if (!storeItems || !storeId || storeId === "") {
    return null;
  }

  for (let i = 0; i < storeItems.length; i++) {
    if (storeItems[i].id === storeId) {
      return storeItems[i];
    }
  }
}

export function getCategoriesByWebProducts(allProducts, web_products) {
  if (
    !allProducts ||
    !web_products ||
    allProducts.length === 0 ||
    web_products.length === 0
  ) {
    return null;
  }

  let result = [];
  for (let i = 0; i < web_products.length; i++) {
    let web_productId = web_products[i].productId;

    for (let j = 0; j < allProducts.length; j++) {
      if (allProducts[j].id === web_productId) {
        let categories = allProducts[j].categories;

        for (let c = 0; c < categories.length; c++) {
          let name = categories[c].name;
          let found = false;
          for (let n = 0; n < result.length; n++) {
            if (result[n].name === name) {
              found = true;
              break;
            }
          }
          if (!found) result.push({name: name});
        }

        break;
      }
    }
  }

  return result;
}

export function sortObjArray(data, accessor, sortOrder) {
  if (!accessor || sortOrder == "") {
    return data;
  }

  let sortedData = [...data];

  sortedData.sort((a, b) => {
    let AField, BField;

    if (serviceFuncs.isFunction(accessor)) {
      AField = accessor(a);
      BField = accessor(b);
    } else {
      AField = a[accessor];
      BField = b[accessor];
    }

    if (sortOrder === "descending") {
      if (AField < BField) {
        return -1;
      }
      if (AField > BField) {
        return 1;
      }
      return 0;
    } else {
      if (AField < BField) {
        return 1;
      }
      if (AField > BField) {
        return -1;
      }
      return 0;
    }
  });
  return sortedData;
}

export function isColumnVisible(columnsArr, columnObj) {
  if (!columnsArr || !columnObj) {
    return false;
  }

  for (let i = 0; i < columnsArr.length; i++) {
    let columnItem = {...columnsArr[i]};
    delete columnItem.isVisible;
    delete columnItem.isDefault;
    if (serviceFuncs.isObjectsEquivalent(columnItem, columnObj)) {
      return columnsArr[i].isVisible;
    }
  }

  return false;
}

export function getReportRowObj(dataItem, columns) {
  let obj = {};

  for (let index = 0; index < columns.length; index++) {
    const column = columns[index];
    let dataField = "";

    try {
      if (serviceFuncs.isFunction(column.accessor)) {
        dataField = column.accessor(dataItem);
        if (!dataField) {
          dataField = "";
        }
      } else {
        dataField = dataItem[column.accessor];
      }

      if (Array.isArray(dataField)) {
        dataField = "$" + dataItem[column.accessorSort];
      }
      if (dataField === null) {
        dataField = "";
      } else {
        dataField = dataField.toString();
      }
    } catch (e) {
      //
    }
    obj[index] = dataField;
  }

  return obj;
}

export function getLongestTextLength(allRows, columnIndex) {
  let maxLength = 0;
  for (let rowIndex = 1; rowIndex < allRows.length; rowIndex++) {
    let row = allRows[rowIndex];
    if (!row[columnIndex]) {
      continue;
    }
    if (row[columnIndex].toString().length > maxLength) {
      maxLength = row[columnIndex].toString().length;
    }
  }

  return maxLength;
}

export function getTranslatedViewField(viewItem, getFieldValue) {
  if (!viewItem || !getFieldValue) {
    return "";
  }

  let lang = viewItem.language;
  if (lang === "en") {
    return getFieldValue(viewItem);
  }

  if (
    !lang ||
    !viewItem.translations ||
    !viewItem.translations[lang] ||
    !getFieldValue(viewItem.translations[lang])
  ) {
    return "";
  }

  let result = getFieldValue(viewItem.translations[lang]);

  return result;
}

export function getTranslatedViewItem(lang, translations) {
  if (lang === "en") {
    throw "can not translate 'en' to 'en'";
  }

  if (!lang || lang === "") {
    throw "wrong arguments";
  }

  if (!translations) {
    translations = {};
  }

  if (!translations[lang]) {
    translations[lang] = {};
  }

  return translations[lang];
}
