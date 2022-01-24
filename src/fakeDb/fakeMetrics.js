export const FAKE_METRICS = [
  {
    id: 1,
    name: "Type A, B",
    description: "weight = set of diapasons, quantity = pieces",
    metricUi: {
      priceMeasure: "Lb",
      weight: {
        title: "Cut Weight",
        buttons: [
          { id: 1, text: ["0.5-1 lbs", "text 1", "1 serving"] },
          { id: 2, text: ["1-1.5 lbs", "text 2", "2 servings"] },
          { id: 3, text: ["1.5-2 lbs", "text 3", "3 servings"] }
        ]
      }
    },
    translations: {
      es: {
        metricUi: {
          priceMeasure: "Libra",
          weight: {
            title: "Cortar peso",
            buttons: [
              { id: 1, text: ["0.5-1 lbs", "Texto 1", "1 porcion"] },
              { id: 2, text: ["1-1.5 lbs", "Texto 2", "2 porciones"] },
              { id: 3, text: ["1.5-2 lbs", "Texto 3", "3 porciones"] }
            ]
          }
        }
      }
    }
  },

  {
    id: 3,
    name: "Type C, H",
    description: "thickness = set of diapasons, quantity = pieces",
    metricUi: {
      priceMeasure: "Lb",
      thickness: {
        title: "Cut Thickness",
        buttons: [
          { id: 1, text: ["1 in", "0.5-1 lbs", "1 serving"] },
          { id: 2, text: ["1.5 in", "1-1.5 lbs", "2 servings"] },
          { id: 3, text: ["2 in", "1.5-2 lbs", "3 servings"] }
        ]
      }
    }
  },

  {
    id: 4,
    name: "Type D",
    description:
      "thickness = set of diapasons, marbling = set of diapasons, quantity = pieces",
    metricUi: {
      priceMeasure: "Lb",
      thickness: {
        title: "Cut Thickness",
        buttons: [
          { id: 1, text: ["1 in", "0.5-1 lbs", "1 serving"] },
          { id: 2, text: ["1.5 in", "1-1.5 lbs", "2 servings"] },
          { id: 3, text: ["2 in", "1.5-2 lbs", "3 servings"] }
        ]
      },
      marbling: {
        title: "Fat level",
        buttons: [
          { id: 1, text: ["Lean"] },
          { id: 2, text: ["Medium"] },
          { id: 3, text: ["Heavy"] }
        ]
      }
    }
  },

  {
    id: 5,
    name: "Type E",
    description:
      "weight = set of diapasons, marbling = set of diapasons, quantity = pieces",
    metricUi: {
      priceMeasure: "Lb",
      weight: {
        title: "Cut Weight",
        buttons: [
          { id: 1, text: ["0.5-1 lbs", null, "1 serving"] },
          { id: 2, text: ["1-1.5 lbs", null, "2 servings"] },
          { id: 3, text: ["1.5-2 lbs", null, "3 servings"] }
        ]
      },
      marbling: {
        title: "Fat level",
        buttons: [
          { id: 1, text: ["Lean"] },
          { id: 2, text: ["Medium"] },
          { id: 3, text: ["Heavy"] }
        ]
      }
    }
  },

  {
    id: 6,
    name: "Type F",
    description:
      "weight = different packages weight, quantity = packages. needs totalWeight",
    metricUi: {
      priceMeasure: "Lb",
      weight: {
        title: "Package Weight",
        buttons: [
          { id: 1, text: ["1 lb"] },
          { id: 2, text: ["2 lbs"] }
        ]
      },
      totalWeight: ["Total Weight", "lbs"]
    },
    translations: {
      es: {
        metricUi: {
          priceMeasure: "libra",
          weight: {
            title: "peso del paquete",
            buttons: [
              { id: 1, text: ["1 libra"] },
              { id: 2, text: ["2 libras"] }
            ]
          },
          totalWeight: ["Peso total", "libras"]
        }
      }
    }
  },

  {
    id: 7,
    name: "Type I",
    metricUi: {
      priceMeasure: "Pack."
    }
  }
];

export const FAKE_METRICS_RESPONSE = {
  data: FAKE_METRICS,
  count: FAKE_METRICS.length
};
