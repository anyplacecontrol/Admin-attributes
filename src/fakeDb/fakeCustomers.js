export const FAKE_CUSTOMERS = [
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    cognitoUserId: "tester",
    name: "John Smith",    
    email: "customer@domain1.com",
    secondaryEmails: ["a1@domain2.com", "a2@domain2.com"],
    phone: "+1 212-219-1222",
    secondaryPhones: ["+1 111-111-1111", "+2 222-222-2222"],
    lastOrderDate:  "2019-04-30T17:37:49.978Z",   
    status: {
      id: 1,
      name: "Enabled"
    },    
    platforms: ["mobile", "kiosk"],
    creditCards: [
      {
        id: 1,
        cardType: "Visa",
        hash: "2e4ff56",
        lastDigits: "2456",
        expires: "10/2023",
        IBAN: "12341234",
        token: "11111111-1111-1111-1111-d11111111111",
      },
      {
        id: 2,
        cardType: "MasterCard",
        hash: "3f21126",
        lastDigits: "2314",
        expires: "12/2022",
        IBAN: "12341234",
        token: "22222222-1111-1111-1111-d11111111111",
      }
    ],
    billingAddress: {                         
      id: 3,
      country: "United States of America",
      state: "NY", 
      zip: "10002",
      city: "New York",
      street: null,
      address: "avenue 235",
      address_2: "address2",
      phone: "+380938833445",
      firstName: "John",
      lastName: "Dir",
      company: "Apple",
      email: "john@apple.com"
    },
    shippingAddress: {                         
      id: 2,
      country: "United States of America",
      state: "CA", 
      zip: "20001",
      city: "San Francisco",
      street: null,
      address: "Squere 235",
      address_2: "address2",
      phone: "+380931111111",
      firstName: "Samantha",
      lastName: "Anderson",
      company: "IBM",
      email: "samantha@ibm.com"
    },
    loyaltyInfo: {
      loyaltyToken: "a1111111-6c54-4b01-90e6-d11111111111",
      couponsOffered: ["CAOL65517", "KAB585176", "CDNK10459"],
      couponsRedeemed: ["MAPK95517", "LFB585176"],
      loyaltyPoints: 10,
      LoyaltyOffersMade: 20
    },
    notes: {
      additionalInfo: "Some additional info",
      childrens: "Mark, John",
      pets: "Bob, Mery",
      partners: "Britny",
      allergies: "nuts, fish"
    },
    paymentInformation: {
      usedApplePay: true,
      usedAndroidPay: false,
      usedEBT: true,
    }
  }
];

export const FAKE_CUSTOMERS_RESPONSE = {
  items: FAKE_CUSTOMERS,
  maxItemsQty: FAKE_CUSTOMERS.length,
  topRowNumber: 0
};
