var table, listing, app;
var data = [{
  locnNo: 7034,
  OoId: 0,
  KsnId: 0,
  Sku:0
}, {
  locnNo: 3155,
  OoId: 0,
  KsnId: 0,
  Sku:0
}, {
  locnNo: 3155,
  OoId: 0,
  KsnId: 0,
  Sku:0
}, {
  locnNo: 4809,
  OoId: 0,
  KsnId: 0,
  Sku:0
}, {
  locnNo: 7623,
  OoId: 0,
  KsnId: 0,
  Sku:0
}, {
  locnNo: 3044,
  OoId: 0,
  KsnId: 0,
  Sku:0
}, {
  locnNo: 4205,
  OoId: 0,
  KsnId: 0,
  Sku:0
}, {
  locnNo: 9582,
  OoId: 0,
  KsnId: 0,
  Sku:0
},{
  locnNo: 3044,
  OoId: 0,
  KsnId: 0,
  Sku:0
}, {
  locnNo: 4739,
  OoId: 0,
  KsnId: 0,
  Sku:0
}];

// Object for handling model
listing = {
  list: data
  // Define function which will operate on this data -- TODO
};

// Table Component with it's own controller and view defined
table = {
  controller: function(options) {
    this.listing = options.listing;
   // this.tableState = options.tableState;
  },
  view: function(ctrl) {
    return m("table", [
      m("thead", [m("tr", [
        m("th", "Locn_Nbr"),
        m("th", "Online_ord_Id"),
        m("th", "KSN_Id"),
        m("th", "SKU_Prc_Type_Cd")
      ])]),
      m("tbody", [
        ctrl.listing.list.map(function(row) {
          return m("tr", [
            m("td", row.locnNo),
            m("td",  row.OoId),
            m("td",  row.KsnId),
            m("td",  row.Sku)
          ])
        })
      ])
    ]);
  }
};

// Main Component -- TODO -- Define CSS -- Tachyons for that purpose
// The main app passes the model to the Sub Components
app = {
  controller: function() {
    this.listing = listing;
  },
  view: function(ctrl) {
    return m('div', [
      m.component(table, {
        listing: ctrl.listing
      })
    ]);
  }
};

m.mount(document.body, app);