export const FAKE_CATEGORIES = 
[
  {
      "id": 9,
      "name": "Beef",
      "slug": "beef",
      translations: {
        es: {
          name: "Carne de vaca",          
        }
      },
      "menuOrder": null,
      "description": null,
      "color": "#FF0000",
      "priority": 0,
      "createdAt": "2019-03-06T12:05:12.774Z",
      "updatedAt": "2019-03-06T12:05:12.774Z",
      "imageId": "3420bd40-4c7b-11e9-8892-a509189f5d34",
      "parentCategoryId": null,
      "image": {
        "id": "3420bd40-4c7b-11e9-8892-a509189f5d34",
        "src": "https://applestone-images.s3.us-east-2.amazonaws.com/test/beef.jpeg",
        "key": "test/beef.jpeg",
        "type": "category",
        "isDefault": null,
        "createdAt": "2019-03-06T12:05:12.774Z",
        "updatedAt": "2019-03-06T12:05:12.774Z"
    }
  },
  {
      "id": 10,
      "name": "Pork",
      "slug": "pork",
      "menuOrder": null,
      "description": null,
      "color": "#FFC0CB",
      "priority": 0,
      "createdAt": "2019-03-06T12:05:12.774Z",
      "updatedAt": "2019-03-06T12:05:12.774Z",
      "imageId": null,
      "parentCategoryId": null
  },
  {
      "id": 11,
      "name": "Lamb",
      "slug": "lamb",
      "menuOrder": null,
      "description": null,
      "color": "#f0e68c",
      "priority": 0,
      "createdAt": "2019-03-06T12:05:12.774Z",
      "updatedAt": "2019-03-06T12:05:12.774Z",
      "imageId": null,
      "parentCategoryId": null
  },
  {
      "id": 12,
      "name": "Sausage",
      "slug": "sausage",
      "menuOrder": null,
      "description": null,
      "color": "#FFD700",
      "priority": 0,
      "createdAt": "2019-03-06T12:05:12.774Z",
      "updatedAt": "2019-03-06T12:05:12.774Z",
      "imageId": null,
      "parentCategoryId": null
  },
  {
      "id": 13,
      "name": "Cold Cuts",
      "slug": "Cold-Cuts",
      "menuOrder": null,
      "description": null,
      "color": "#0000FF",
      "priority": 0,
      "createdAt": "2019-03-06T12:05:12.774Z",
      "updatedAt": "2019-03-06T12:05:12.774Z",
      "imageId": null,
      "parentCategoryId": null
  },
  {
      "id": 14,
      "name": "Poultry",
      "slug": "poultry",
      "menuOrder": null,
      "description": null,
      "color": "#A52A2A",
      "priority": 0,
      "createdAt": "2019-03-06T12:05:12.774Z",
      "updatedAt": "2019-03-06T12:05:12.774Z",
      "imageId": null,
      "parentCategoryId": null
  },
  {
      "id": 15,
      "name": "Pet Food",
      "slug": "pet-food",
      "menuOrder": null,
      "description": null,
      "color": "#800080",
      "priority": 0,
      "createdAt": "2019-03-06T12:05:12.774Z",
      "updatedAt": "2019-03-06T12:05:12.774Z",
      "imageId": null,
      "parentCategoryId": null
  },
  {
      "id": 16,
      "name": "Seasonal",
      "slug": "Seasonal",
      "menuOrder": null,
      "description": null,
      "color": "#40E0D0",
      "priority": 0,
      "createdAt": "2019-03-06T12:05:12.774Z",
      "updatedAt": "2019-03-06T12:05:12.774Z",
      "imageId": null,
      "parentCategoryId": null
  }
];

export const FAKE_CATEGORIES_RESPONSE = {
      items: FAKE_CATEGORIES,
      maxItemsQty: FAKE_CATEGORIES.length,
      topRowNumber: 0    
  }