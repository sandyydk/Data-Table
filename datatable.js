var table, listing, app;

var showing = 10;
var totalRows = 10;
var startingAt = 1;
var currentPageIndex = 1;

actionKeys = {
  controller:function(options){
    totalRows = data.length;
  },
  view: function(ctrl) {
    return m('div',{class:"tc mb4-ns mt3-ns"}, [
      m('div',{class:"di mr3-l bg-purple pt2 pr2 btn-border pl2"},[
      m('a', {class:"pr1 pointer", onclick: listing.goToFirstPage}, [m('i',{class:"fa fa-step-backward fa-2x white-antique"})]),
      m('a', {class:"pr1 pointer", onclick: listing.moveBehindOnePage}, [m('i',{class:"fa fa-angle-double-left fa-2x white-antique"})]),
      m('a', {class:"pointer", onclick: listing.moveBehindOneRow}, [m('i',{class:"fa fa-angle-left fa-2x white-antique"})])]),
      'Showing ',
      m('input',{type:'number', min:0, class:"w-7-l mh3" , oninput :m.withAttr("value",listing.onShowingChange),value:showing}),
      'rows out of ',
      m('input',{type:'text', min:0, class:"w-7-l mh3", disabled:true, value:totalRows}),
      'starting at row ',
      m('input',{type:'number', min:0, class:"w-7-l mh3", oninput:m.withAttr("value",listing.onStartingAtChange),value:startingAt}),
      m('div',{class:"di mr3-l bg-purple pt2 pr2 r-btn-border pl2"},[
      m('a', {class:"pr1 pointer", onclick: listing.moveAheadOneRow}, [m('i',{class:"fa fa-angle-right fa-2x white-antique"})]),
      m('a', {class:"pr1 pointer", onclick: listing.moveAheadOnePage}, [m('i',{class:"fa fa-angle-double-right fa-2x white-antique"})]),
      m('a', {class:"pointer", onclick: listing.goToLastPage}, [m('i',{class:"fa fa-step-forward fa-2x white-antique"})])]),
    ]);
  }
}

// Object for handling model
listing = {
  list: data,
  originalList : data,
  moveAheadOneRow: function(){
    startingAt = parseInt(startingAt) + 1;
    table.rowCount = startingAt - 1;
    listing.listFilter();
  },
  moveAheadOnePage: function(){
    startingAt = parseInt(startingAt) + parseInt(showing);
    table.rowCount = startingAt - 1;
    listing.listFilter();
  },
  moveBehindOnePage: function(){
    startingAt = parseInt(startingAt) - parseInt(showing);
    table.rowCount = startingAt - 1;
    listing.listFilter();
  },
  moveBehindOneRow: function(){
    startingAt = parseInt(startingAt) - 1;
    table.rowCount = startingAt - 1;
    listing.listFilter();
  },
  goToLastPage: function(){
    startingAt = listing.originalList.length - showing + 1;
    table.rowCount = startingAt - 1;
    listing.listFilter();
  },
  goToFirstPage: function(){
    startingAt = 1;
    table.rowCount = startingAt - 1;
    listing.listFilter();
  },
  listFilter : function(){
    listing.list = listing.originalList.slice(startingAt-1,startingAt-1+showing*currentPageIndex);
  },
  onShowingChange: function(inputValue){
    showing = inputValue;
    table.rowCount = 0;
    listing.listFilter();
  },
  onStartingAtChange: function(inputValue){
    startingAt = inputValue;
    table.rowCount = 0;
    listing.listFilter();
  },
};

// Table Component with it's own controller and view defined
table = {
  rowCount: 0,
  incrementRowCount: function(){
    table.rowCount = table.rowCount + 1;
    return table.rowCount;
  },
  controller: function(options) {
    this.listing = options.listing;
    this.originalList = options.originalList;
  }, // Working tachyns now
  view: function(ctrl) {
    return m("div",{class:"overflow-auto-l m-h-500"},[m("table",{class:"near-black dt--fixed tc w-96-ns b-solid ml35-ns"}, [
      m("thead", [m("tr", [
        m("th", {class:"border-bottom bg-grey-light w-10"},""),
        m("th", {class:"border-bottom bg-grey-light w-20"},"Locn_Nbr"),
        m("th", {class:"border-bottom bg-grey-light w-20"}, "Online_ord_Id"),
        m("th", {class:"border-bottom bg-grey-light w-20"}, "KSN_Id"),
        m("th", {class:"border-bottom bg-grey-light w-30"}, "SKU_Prc_Type_Cd")
      ])]),
      m("tbody", [
        ctrl.listing.list.map(function(row,index) {
          
          if(index<showing ){
          return m("tr", [
            m("td", {class:"border-bottom"}, table.incrementRowCount()),
            m("td", {class:"border-bottom"}, row.locnNo),
            m("td", {class:"border-bottom"}, row.OoId),
            m("td", {class:"border-bottom"}, row.KsnId),
            m("td", {class:"border-bottom"}, row.Sku)
          ])
          }
        })
      ])
    ])]);
  }
};

// Main Component -- TODO -- Define CSS -- Tachyons for that purpose
// The main app passes the model to the Sub Components
app = {
  controller: function() {
    this.listing = listing;
    this.originalList = listing;
  },
  view: function(ctrl) {
    return m('div', [
      m.component(actionKeys),
      m.component(table, {
        listing: ctrl.listing,
        originalList: ctrl.originalList
      })
    ]);
  }
};

m.mount(document.body, app);