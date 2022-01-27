export const allControlTypes = [
  {
    name: "rangeButtons",
    description: [
      "This control presents set of buttons. Every button allows kiosk user to select range of attribute values.",
      "For example, first button allows user to select weight range 0.5 - 0.9 lbs, another button: 1 - 1.5 lbs, etc.",
      "You should specify min and max values for every range (button).",
      "Ranges should not intersect. First button should present range with smallest values, last button - biggest values."
    ],
    img: require("../assets/img/controls/rangeButtons.png")
  },
  {
    name: "valueButtons",
    description: [
      "This control presents set of buttons. Every button allows user to select single attribute value.",
      "For example, first button allows to select 'red' string value , another button: 'blue'."
    ],
    img: require("../assets/img/controls/valueButton.png")
  },
  {
    name: "checkbox",
    description: [
      "This control presents checkbox and allows to choose bool value: true or false.",
      "Selected value is assigned to attribute variable"
    ],
    img: null
  }
];

//---------------------------------------------------------------------------------------------

export function getControlTypeInfo(name) {
  if (!name) return null;

  for (let i = 0; i < allControlTypes.length; i++) {
    if (allControlTypes[i].name == name) {
      return allControlTypes[i];
    }
  }
  return null;
}

//---------------------------------------------------------------------------------------------

export function getRulesValue(control, buttonIndex, fieldName) {
  if (!control) return "";
  let rules = control.rules;
  if (!rules) return "";
  let values_transformed = rules.valuesText_transformed;
  if (!values_transformed) return "";
  let rangeCode = buttonIndex + 1;
  for (let i = 0; i < values_transformed.length; i++) {
    if (values_transformed[i].rangeCode == rangeCode) {
      let buttonRule = values_transformed[i];
      if (!buttonRule) return "";
      let result = buttonRule[fieldName];
      if (result >= 0) return result;
    }
  }
  return "";
}

//--------------------------------------------------------------------------------------------
//argument is either root ControlView state or Language object (es, fr...)

export function getTextMapping(translationObj) {
  if (translationObj && translationObj != "" && translationObj.textMapping)
    return translationObj.textMapping;
  else return {};
}

//--------------------------------------------------------------------------------------------
export function fillRangeValuesTexts(textMapping, buttonsCount) {
  function findValuesText(valuesText, attributeValue) {
    for (let j = 0; j < buttonsCount; j++) {
      if (valuesText[j].attributeValue == attributeValue) return valuesText[j];
    }
  }

  let valuesText = [];
  for (let i = 0; i < buttonsCount; i++) {
    let button = { attributeValue: i + 1, text: [null, null, null] };

    if (textMapping.valuesText && textMapping.valuesText[i]) {
      let foundValuesText = findValuesText(textMapping.valuesText, i + 1);

      if (foundValuesText) {
        button.attributeValue = foundValuesText.attributeValue;
        for (let j = 0; j < 3; j++) {
          if (foundValuesText.text && foundValuesText.text[j])
            button.text[j] = foundValuesText.text[j];
        }
      }

      valuesText.push(button);
    } else valuesText.push(button);
  }
  return valuesText;
}

//--------------------------------------------------------------------------------------------

export function fillAttributeValuesTexts(textMapping, control) {
  let buttonsCount = control.textMapping.valuesText.length;
  let valuesText = [];
  for (let i = 0; i < buttonsCount; i++) {
    let button = {
      attributeValue: control.textMapping.valuesText[i].attributeValue,
      text: [null, null, null]
    };

    if (textMapping.valuesText && textMapping.valuesText[i]) {
      let targetValuesText = textMapping.valuesText[i];
      
      for (let j = 0; j < 3; j++) {
        if (targetValuesText.text && targetValuesText.text[j])
          button.text[j] = targetValuesText.text[j];
      }
      valuesText.push(button);
    } else valuesText.push(button);
  }
  return valuesText;
}

//--------------------------------------------------------------------------------------------

export function arrangeValuesText(fetchedResponse) {
  function compareValuesText(a, b) {
    if (a.attributeValue < b.attributeValue) {
      return -1;
    }
    if (a.attributeValue > b.attributeValue) {
      return 1;
    }
    return 0;
  }

  //-------

  function searchAttributeValue(valueToSearch, translatedValuesText) {
    for (let i = 0; i < translatedValuesText.length; i++) {
      if (translatedValuesText[i].attributeValue == valueToSearch) {
        return translatedValuesText[i];
      }
    }
  }

  //-------

  function matchTranslation(etalonValuesText, translatedValuesText) {
    let result = [];
    etalonValuesText.map(etalonItem => {
      let foundTranslation = searchAttributeValue(
        etalonItem.attributeValue,
        translatedValuesText
      );
      if (foundTranslation) result.push(foundTranslation);
      else
        result.push({
          attributeValue: etalonItem.attributeValue,
          text: [null, null, null]
        });
    });
    return result;
  }

  //-------

  fetchedResponse.items.map(item => {
    if (item.controlType == "rangeButtons") {
      //Sort attributeValue
      item.textMapping.valuesText = item.textMapping.valuesText.sort(
        compareValuesText
      );
      //set matchTranslation rangeCodes according to array element numbers
      for (let i = 0; i < item.textMapping.valuesText.length; i++) {
        item.textMapping.valuesText[i].attributeValue = i + 1;
      }
    }

    //Enumerate Languages
    if (
      item.controlType == "rangeButtons" ||
      item.controlType == "valueButtons"
    ) {
      //Sort translated ValuesText by the same attributeValue as for english
      for (var language in item.translations) {
        let matchTranslationedValuesText = matchTranslation(
          item.textMapping.valuesText,
          item.translations[language].textMapping.valuesText
        );
        item.translations[
          language
        ].textMapping.valuesText = matchTranslationedValuesText;
      }
    }
  });
}

//--------------------------------------------------------------------------------------------

export function modifyRule(rules, rangeCode, fieldName, newValue) {
  //find rules item with specified rangeId
  let valuesTextItem = null;
  for (let i = 0; i < rules.valuesText_transformed.length; i++) {
    if (rules.valuesText_transformed[i].rangeCode == rangeCode) {
      valuesTextItem = rules.valuesText_transformed[i];
      break;
    }
  }

  //if not found - create new
  if (!valuesTextItem) {
    valuesTextItem = { rangeCode: rangeCode, min: "", max: "" };
    rules.valuesText_transformed.push(valuesTextItem);
  }

  //modify specified field
  valuesTextItem[fieldName] = newValue;
}

//--------------------------------------------------------------------------------------------

export function deleteLastRange(state) {
  function deleteRangeRule(newState, rangeCode) {
    if (!newState.rules || !newState.rules.valuesText_transformed) return;

    let new_valuesText_transformed = [];
    for (let i = 0; i < newState.rules.valuesText_transformed.length; i++) {
      if (newState.rules.valuesText_transformed[i].rangeCode != rangeCode)
        new_valuesText_transformed.push(
          newState.rules.valuesText_transformed[i]
        );
    }
    newState.rules.valuesText_transformed = new_valuesText_transformed;
  }
  //------

  let newState = JSON.parse(JSON.stringify(state));
  let buttonsCount = newState.textMapping.valuesText.length;

  if (newState.translations)
    for (var language in newState.translations) {
      //Fill missing items for translations
      newState.translations[
        language
      ].textMapping.valuesText = fillRangeValuesTexts(
        newState.translations[language].textMapping,
        buttonsCount
      );

      //Delete last array item from translation
      newState.translations[language].textMapping.valuesText.pop();
    }

  //Delete last array item from English
  newState.textMapping.valuesText.pop();

  if (newState.controlType == "rangeButtons")
    deleteRangeRule(newState, buttonsCount);

  return newState;
}


//--------------------------------------------------------------------------------------------

export function deleteLastValue(state) {
  let control = JSON.parse(JSON.stringify(state));  

  if (control.translations)
    for (var language in control.translations) {
      //Fill missing items for translations
      control.translations[
        language
      ].textMapping.valuesText = fillAttributeValuesTexts(
        control.translations[language].textMapping,
        control
      );

      //Delete last array item from translation
      control.translations[language].textMapping.valuesText.pop();
    }

  //Delete last array item from English
  control.textMapping.valuesText.pop();
  
  return control;
}

//--------------------------------------------------------------------------------------------
export function getControlById(allControls, id) {
  if (!allControls) return null;
  for (let i=0; i<allControls.length; i++) {
    if (allControls[i].id == id) return allControls[i]
  }
}