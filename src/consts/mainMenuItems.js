import {ROUTE_NAMES} from "./routeNames";

export const MAIN_MENU_ITEMS = [
  {
    name: "Dashboard",
    cssCls: "dashboard",
    path: ROUTE_NAMES.dashboard
  },

  {
    name: "Reports",
    cssCls: "reports",
    path: ROUTE_NAMES.reportOrders,
    items: [
      {
        name: "Orders Report",
        path: ROUTE_NAMES.reportOrders,
      },
      {
        name: "Sales By Store",
        path: ROUTE_NAMES.reportOrdersByStore,
      },
      {
        name: "Inventory By Product",
        path: ROUTE_NAMES.reportInventoryByProduct,
      },
      {
        name: "Inventory By Store",
        path: ROUTE_NAMES.reportInventoryByStore,
      },
      {
        name: "Products By Popularity",
        path: ROUTE_NAMES.reportProductsByPopularity,
      },
      {
        name: "Machines Temperatures",
        path: ROUTE_NAMES.reportTemperaturesByStore,
      },
    ]
  },

  {
    name: "Orders",
    cssCls: "orders",
    path: ROUTE_NAMES.orders,
    comment: "Kiosk Orders",
    items: [
      {
        name: "Kiosk Orders",
        path: ROUTE_NAMES.orders,
      },
      {
        name: "Mobile Orders",
        path: ROUTE_NAMES.mobileOrders,
      },
      {
        name: "Kiosk Orders",
        path: ROUTE_NAMES.orderView,
        isHidden: true
      },
      {
        name: "Mobile Orders",
        path: ROUTE_NAMES.mobileOrderView,
        isHidden: true
      }
    ]
  },



  // ---Inventory menu ---

  {
    name: "Products",
    cssCls: "inventory",
    path: ROUTE_NAMES.productItems,
    items: [
      {
        name: "All Inventory",
        path: ROUTE_NAMES.productItems,
        comment: "",
      },
      {
        name: "All Inventory",
        path: ROUTE_NAMES.productItemView,
        isHidden: true
      },

      {
        name: "Define/Edit Products",
        path: ROUTE_NAMES.products
      },
      {
        name: "Define/Edit Products",
        path: ROUTE_NAMES.productView,
        isHidden: true
      },

      {
        name: "Categories",
        path: ROUTE_NAMES.categories
      },
      {
        name: "Categories",
        path: ROUTE_NAMES.categoryView,
        isHidden: true
      },
      {
        name: "Variations",
        path: ROUTE_NAMES.metrics,
      },
      {
        name: "Variations",
        path: ROUTE_NAMES.metricView,
        isHidden: true,
      },
      {
        name: "Attribute Controls",
        path: ROUTE_NAMES.controls,
      },
      {
        name: "Attribute Controls",
        path: ROUTE_NAMES.controlView,
        isHidden: true,
      },
      // {
      //   name: "Tags",
      //   path: ROUTE_NAMES.tags,
      //   comment: "API for  Delete, Add and Update does not work"
      // },
      // {
      //   name: "Tags",
      //   path: ROUTE_NAMES.tagView,
      //   isHidden: true,
      //   comment: "API for Add and Update does not work"
      // },
      {
        name: "Taxes",
        path: ROUTE_NAMES.taxes,
        isHidden: true, //TODO: change to false
        comment: "Emulated"
      },
      {
        name: "Taxes",
        path: ROUTE_NAMES.taxView,
        isHidden: false, //TODO: change to true
        comment: "Hardcoded"
      },
      {
        name: "Bundles",
        path: ROUTE_NAMES.bundleView,
        isHidden: false,
        comment: "Hardcoded"
      },
    ]
  },

  {
    name: "Customers",
    cssCls: "customers",
    path: ROUTE_NAMES.mobileUsers,
    items: [
      // {
      //   name: "Kiosk Customers",
      //   path: ROUTE_NAMES.customers
      // },
      // {
      //   name: "Kiosk Customers",
      //   path: ROUTE_NAMES.customerView,
      //   isHidden: true
      // },
      {
        name: "Mobile Customers",
        path: ROUTE_NAMES.mobileUsers,
      },
      {
        name: "Mobile Customers",
        path: ROUTE_NAMES.mobileUserView,
        isHidden: true
      },
    ]
  },

  {
    name: "Kiosks",
    cssCls: "kiosk",
    path: ROUTE_NAMES.kiosks,
    comment: "",
    items: [
      {
        name: "Kiosks",
        path: ROUTE_NAMES.kioskView,
        isHidden: true,
        comment: "Some fields are missed in API",
      }
    ]
  },

  {
    name: "Machines",
    cssCls: "machines",
    path: ROUTE_NAMES.machines,
    items: [
      {
        name: "Machines",
        path: ROUTE_NAMES.machineView,
        isHidden: true,
        comment: "missed api to update model, manufacturer and address",
      },
      {
        name: "Temperature History",
        path: ROUTE_NAMES.reportsTemperature,
        isHidden: true,
      },
      {
        name: "Sensors History",
        path: ROUTE_NAMES.reportsSensor,
        isHidden: true,
      }
    ]
  },

  {
    name: "Store Setup",
    cssCls: "stores",
    path: ROUTE_NAMES.stores,
    items: [
      {
        name: "Store Setup",
        path: ROUTE_NAMES.storeView,
        isHidden: true,
        comment: ""
      }
    ]
  },

  {
    name: "Admin Users",
    cssCls: "users",
    path: ROUTE_NAMES.users,
    items: [
      {
        name: "Admin Users",
        path: ROUTE_NAMES.users,
      },
      {
        name: "Admin Users",
        path: ROUTE_NAMES.userView,
        isHidden: true,
      },
      {
        name: "Admin User Types",
        path: ROUTE_NAMES.usersTypesView,
        comment: "Hardcoded",
      }
    ]
  },

  {
    name: "Static Content",
    cssCls: "static-content",
    path: ROUTE_NAMES.cookingTips,
    items: [
      {
        name: "Cooking Tips",
        path: ROUTE_NAMES.cookingTips,
      },
      {
        name: "Cooking Tips",
        path: ROUTE_NAMES.cookingTipsView,
        isHidden: true,
      },
      {
        name: "Help View",
        path: ROUTE_NAMES.helpView,
        isHidden: false,
        comment: "Hardcoded",
      },
    ]
  },

  {
    name: "DB Settings",
    cssCls: "static-content",
    path: ROUTE_NAMES.statusesProducts,
    items: [
      {
        name: "Product Status",
        path: ROUTE_NAMES.statusesProducts
      },
      {
        name: "Product Status",
        path: ROUTE_NAMES.statusesProductsView,
        isHidden: true
      },

      {
        name: "Item Status",
        path: ROUTE_NAMES.statusesProductItems
      },
      {
        name: "Item Status",
        path: ROUTE_NAMES.statusesProductItemsView,
        isHidden: true
      },

      {
        name: "Order Status",
        path: ROUTE_NAMES.statusesOrders
      },
      {
        name: "Order Status",
        path: ROUTE_NAMES.statusesOrdersView,
        isHidden: true
      },

      {
        name: "Store Status",
        path: ROUTE_NAMES.statusesStores
      },
      {
        name: "Store Status",
        path: ROUTE_NAMES.statusesStoresView,
        isHidden: true
      },

      {
        name: "Machine Status",
        path: ROUTE_NAMES.statusesMachines
      },
      {
        name: "Machine Status",
        path: ROUTE_NAMES.statusesMachinesView,
        isHidden: true
      },

      {
        name: "Kiosk Status",
        path: ROUTE_NAMES.statusesKiosks
      },
      {
        name: "Kiosk Status",
        path: ROUTE_NAMES.statusesKiosksView,
        isHidden: true
      },

      {
        name: "Customer Status",
        path: ROUTE_NAMES.statusesCustomers,
        comment: "Emulated"
      },
      {
        name: "Customer Status",
        path: ROUTE_NAMES.statusesCustomersView,
        isHidden: true,
        comment: "Emulated"
      },
    ]
  },

  {
    name: "Emails",
    cssCls: "static-content",
    path: ROUTE_NAMES.emails,
    items: [
      {
        name: "Email View",
        path: ROUTE_NAMES.emailView,
        isHidden: false,
        comment: "Hardcoded",
      }
    ]
  },

  {
    name: "Tools",
    cssCls: "static-content",
    path: ROUTE_NAMES.carousel,
    items: [          
      {
        name: "Carousel",
        path: ROUTE_NAMES.carousel,
        isHidden: false,
      },
       // {
      //   name: "Coupons generator",
      //   path: ROUTE_NAMES.couponsGenerator,
      //   isHidden: false,
      // },
      {
        name: "Alarms",
        path: ROUTE_NAMES.alarms,
      },
      {
        name: "Alarms",
        path: ROUTE_NAMES.alarmsView,
        isHidden: true,
      },
      {
        name: "Logs",
        path: ROUTE_NAMES.logs,
      },
      {
        name: "Logs",
        path: ROUTE_NAMES.logsView,
        isHidden: true,
      },
    ]
  },

  {
    name: "Branding",
    cssCls: "static-content",
    path: ROUTE_NAMES.visualIdentityView,
    items: [
      {
        name: "Visual Identity",
        path: ROUTE_NAMES.visualIdentityView,
        isHidden: false,
        comment: "Hardcoded",
      },
      {
        name: "Sleep screen",
        path: ROUTE_NAMES.sleepScreenView,
        isHidden: false,
        comment: "Hardcoded",
      },      
    ]
  },

  {
    name: "Promotions",
    cssCls: "static-content",
    path: ROUTE_NAMES.promotions,
    items: [
      {
        name: "Promotions",
        path: ROUTE_NAMES.promotions,
        isHidden: false,
        comment: "Hardcoded",
      },
      {
        name: "Promotion",
        path: ROUTE_NAMES.promotionView,
        isHidden: true,
        comment: "Hardcoded",
      },
      {
        name: "Coupons generator",
        path: ROUTE_NAMES.couponsGenerator,
        isHidden: false,
      },     
    ]
  },

];
