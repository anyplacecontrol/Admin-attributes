export const FAKE_MACHINES = [
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    inboundQueue:"https://sqs.us-east-2.amazonaws.com/715767152844/test-Kiosk-inbound",
    outboundQueue:"https://sqs.us-east-2.amazonaws.com/715767152844/test-Kiosk-outbound",
    inventoryNumber: "MSN-00005",  
    manufacturerId: "0b3bd170-891c-11e9-abb1-41b27b3e60f1",
    manufacturer: {      
      address:null,
      addressId:null,     
      homePage:null,
      id: "0b3bd170-891c-11e9-abb1-41b27b3e60f1",
      name:"company1",
      phone:null      
    },    
    modelId:"0b51ca70-891c-11e9-abb1-41b27b3e60f1",
    model: {              
      description:null,
      id:"0b51ca70-891c-11e9-abb1-41b27b3e60f1",
      name:"machineModel1"    
    },    
    status: {      
      id: 3,
      name: "some status",      
    },  
    addressId: 3,      
    address: {
      id: 3,
      ZIP: "10002",
      country: "United States of America",
      city: "New York",
      state: "NY",
      region: "None",
      street: "Bowery",
      address: "235",
      phone: "+1 212-219-1222",
      contactPerson: "Greg",
      addInfo: "New Museum",
      coordinates: null
    },
    details: "Test Machine Kit",

    //not in DB yet
    temperature: {
      measuring_date: "2019-03-06T12:05:12.774Z",
      value: 8
    },    
  }
];

export const FAKE_MACHINES_RESPONSE = {
  items: FAKE_MACHINES,
  maxItemsQty: FAKE_MACHINES.length,
  topRowNumber: 0
};
