import * as dataFuncs from "../../../utils/dataFuncs";
import { getTextMapping } from "../../../utils/controlsFuncs";
import React from "react";

export function renderValuesTexts(control, renderFunc) {
  if (!control || !control.textMapping || !control.textMapping.valuesText)
    return null;

  return control.textMapping.valuesText.map((valueItem, index) => {
    return renderFunc(index);
  });
}

//-----------------------------------------------------------------

export function renderButtonText(
  buttonIndex,
  textIndex,
  control,
  onChangeButtonsText,
  onDeleteLastButton
) {
  let translatedTextMapping = dataFuncs.getTranslatedViewField(
    control,
    translationObj => getTextMapping(translationObj)
  );

  let text =
    translatedTextMapping &&
    translatedTextMapping.valuesText &&
    translatedTextMapping.valuesText[buttonIndex] &&
    translatedTextMapping.valuesText[buttonIndex].text &&
    translatedTextMapping.valuesText[buttonIndex].text[textIndex]
      ? translatedTextMapping.valuesText[buttonIndex].text[textIndex]
      : "";

  let input = (
    <input
      className="block-set__input animated"
      placeholder="translated text"
      type="text"
      value={text}
      onChange={e =>
        onChangeButtonsText(e.target.value, buttonIndex, textIndex)
      }
    />
  );

  // "Delete" Button near last input of last row
  return textIndex == 2 &&
    buttonIndex > 1 &&
    buttonIndex == control.textMapping.valuesText.length - 1 ? (
    <div className="payment-grid-box">
      {input}
      <button
        className="payment-grid-item-remove-btn"
        type="button"
        onClick={() => onDeleteLastButton(buttonIndex + 1)}
      />
    </div>
  ) : (
    input
  );
}
