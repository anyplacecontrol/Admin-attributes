export const FAKE_CONTROLS = [
  // "Weight" range Buttons
  {
    id: 1,
    name: "Meat Weight buttons",
    attribute: "weight",
    displayInCart: true,
    controlType: "rangeButtons",
    description: "weight = set of diapasons, quantity = pieces",
    textMapping: {
      title: "Cut Weight",
      valuesText: [
        { attributeValue: 1, text: ["0.5-1 lbs", "text 1", "1 serving"] },
        { attributeValue: 2, text: ["1-1.5 lbs", "text 2", "2 servings"] },
        { attributeValue: 3, text: ["1.5-2 lbs", "text 3", "3 servings"] }
      ]
    },
    translations: {
      es: {
        textMapping: {
          title: "Cortar peso",
          valuesText: [
            { attributeValue: 1, text: ["0.5-1 lbs", "Texto 1", "1 porcion"] },
            {
              attributeValue: 2,
              text: ["1-1.5 lbs", "Texto 2", "2 porciones"]
            },
            { attributeValue: 3, text: ["1.5-2 lbs", "Texto 3", "3 porciones"] }
          ]
        }
      }
    },
    rules: {
      type: "range",
      valuesText_transformed: [
        { rangeCode: 1, min: "0", max: "1" }, //Gateway transforms to attributeValue=1
        { rangeCode: 2, min: "1", max: "1.5" }, //Gateway transforms to attributeValue=2
        { rangeCode: 3, min: "1.5", max: "5" } //Gateway transforms to attributeValue=3
      ]
    }
  },
  // "Fat level" value Buttons
  {
    id: 2,
    name: "Fat level buttons for meat",
    attribute: "marbling",
    displayInCart: true,
    controlType: "valueButtons",
    description: "",
    textMapping: {
      title: "Fat level",
      valuesText: [
        { attributeValue: 1, text: ["Lean"] },
        { attributeValue: 2, text: ["Medium"] },
        { attributeValue: 3, text: ["Heavy"] }
      ]
    },
    rules: {
      type: "value"
    }
  },
 // "Tied" value Buttons
 {
    id: 3,
    name: "Tied buttons for meat",
    attribute: "tied",
    displayInCart: true,
    controlType: "valueButtons",
    description: "thickness = set of diapasons, quantity = pieces",
    textMapping: {
      title: "Would you like it Tied?",
      valuesText: [
        { attributeValue: true, text: ["Tied", null, null] },
        { attributeValue: false, text: ["Not Tied", "", ""] },        
      ]
    },
    translations: {
        es: {
          textMapping: {
            title: "¿Te gustaría atado?"
          },
          valuesText: [
            { attributeValue: true, text: ["Atado", null, null] },
            { attributeValue: false, text: ["No atado", null, null] }
          ]
        }
      },
    rules: {
      type: "value"
    }
  },

  //  "Package" checkbox
  {
    id: 4,
    name: "Checkbox to use Package",
    attribute: "package",
    displayInCart: false,
    controlType: "checkbox", 
    description: "",
    textMapping: {
      title: "Would you like packed product?",      
      valuesText: [
        { attributeValue: true, text: ["Yes"] },
        { attributeValue: false, text: ["No"] }
      ]
    },
    rules: {
      type: "value"
    }
  }
];

export const FAKE_CONTROLS_RESPONSE = {
  items: FAKE_CONTROLS,
  maxItemsQty: FAKE_CONTROLS.length,
  topRowNumber: 0
};
