export const FAKE_KIOSKS = [
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    inventoryNumber: "KSN-00001",
    manufacturerId:"ae124c20-4719-11e9-9c3a-a97229a21eb9",
    manufacturer: {      
      name: "KIOSK Information Systems",        
      addressId:null,
      homePage:null,
      id:"ae124c20-4719-11e9-9c3a-a97229a21eb9",
      phone:null,
    },
    modelId:"ae297da0-4719-11e9-9c3a-a97229a21eb9",
    model: {    
      id: "ae297da0-4719-11e9-9c3a-a97229a21eb9",  
      name: "Windfall Model",  
      description: null,    
    },    
    addressId:1,
    address: {
      id: 3,
      zip: "10002",
      country: "United States of America",
      city: "New York",
      state: "NY",
      region: "None",
      street: "Bowery",
      address: "avenue 235",
      phone: "+1 212-219-1222",
      contactPerson: "Greg",
      addInfo: "New Museum",
      coordinates: null,
      address_2:null,
      info:null,
    },
    machineId: "d290f1ee-6c54-4b01-90e6-d701748f0851",        
    statusId:1,
    status: {
      id: 1,   
      name: "Online"  
    },
    details: "Default kiosk",
    hideSleepScreen: true
  }
];

export const FAKE_KIOSKS_RESPONSE = {
    items: FAKE_KIOSKS,
    maxItemsQty: FAKE_KIOSKS.length,
    topRowNumber: 0
  };
  