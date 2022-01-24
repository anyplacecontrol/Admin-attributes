
export const allControlTypes = [
    {
      name: "rangeButtons",
      description: [
          "This control presents set of buttons. Every button allows kiosk user to select range of attribute values.",
          "For example, first button allows user to select weight range 0.5 - 0.9 lbs, another button: 1 - 1.5 lbs, etc.",          
          "You should specify min and max values for every range (button).",
          "Ranges should not intersect. First button should present range with smallest values, last button - biggest values."
        ],
      img: require("../../assets/img/controls/rangeButtons.png")
    },
    {
      name: "valueButtons",
      description: [
        "This control presents set of buttons. Every button allows user to select single attribute value.",
        "For example, first button allows to select 'red' string value , another button: 'blue'.",        
      ],
      img: require("../../assets/img/controls/valueButton.png")
    },
    {
      name: "checkbox",
      description:
        ["This control presents checkbox and allows to choose bool value: true or false.", 
        "Selected value is assigned to attribute variable"],
      img: null
    }
  ];

  //---------------------------------------------------------------------------------------------

  export function getControlTypeInfo(name) {
    if (!name) return null;

    for (let i=0; i<allControlTypes.length; i++) {
      if (allControlTypes[i].name == name) {
        return allControlTypes[i];        
      }
    }
    return null;
  }