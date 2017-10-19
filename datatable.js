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
    return m('div', [
      m('a', {onclick: listing.goToFirstPage,style:"background-color:deepskyblue;"}, [m('i',{class:"fa fa-caret-square-o-left fa-2x"})]),
      m('a', {onclick: listing.moveBehindOnePage,style:"background-color:deepskyblue;"}, [m('i',{class:"fa fa-angle-double-left fa-2x"})]),
      m('a', {onclick: listing.moveBehindOneRow,style:"background-color:deepskyblue;"}, [m('i',{class:"fa fa-angle-left fa-2x"})]),
      'Showing ',
      m('input',{type:'number' ,oninput :m.withAttr("value",listing.onShowingChange),value:showing}),
      'rows out of ',
      m('input',{type:'text',disabled:true,value:totalRows}),
      'starting at row ',
      m('input',{type:'number',oninput:m.withAttr("value",listing.onStartingAtChange),value:startingAt}),   
      m('a', {onclick: listing.moveAheadOneRow,style:"background-color:deepskyblue;"}, [m('i',{class:"fa fa-angle-right fa-2x"})]),
      m('a', {onclick: listing.moveAheadOnePage,style:"background-color:deepskyblue;"}, [m('i',{class:"fa fa-angle-double-right fa-2x"})]),
      m('a', {onclick: listing.goToLastPage,style:"background-color:deepskyblue;"}, [m('i',{class:"fa fa-caret-square-o-right fa-2x"})]),
    ]);
  }
}

// Object for handling model
listing = {
  list: data,
  originalList : data,
  moveAheadOneRow: function(){
    startingAt = parseInt(startingAt) + 1;
    listing.listFilter();
  },
  moveAheadOnePage: function(){
    startingAt = parseInt(startingAt) + parseInt(showing);
    listing.listFilter();
  },
  moveBehindOnePage: function(){
    startingAt = parseInt(startingAt) - parseInt(showing);
    listing.listFilter();
  },
  moveBehindOneRow: function(){
    startingAt = parseInt(startingAt) - 1;
    listing.listFilter();
  },
  goToLastPage: function(){
    startingAt = listing.originalList.length - showing + 1;
    listing.listFilter();
  },
  goToFirstPage: function(){
    startingAt = 1;
    listing.listFilter();
  },
  listFilter : function(){
    listing.list = listing.originalList.slice(startingAt-1,startingAt-1+showing*currentPageIndex);
  },
  onShowingChange: function(inputValue){
    showing = inputValue;
    listing.listFilter();
  },
  onStartingAtChange: function(inputValue){
    startingAt = inputValue;
    listing.listFilter();
  },
};

// Table Component with it's own controller and view defined
table = {
  controller: function(options) {
    this.listing = options.listing;
    this.originalList = options.originalList;
  },
  view: function(ctrl) {
    return m("table", [
      m("thead", [m("tr", [
        m("th", {class:"i"},"Locn_Nbr"),
        m("th", "Online_ord_Id"),
        m("th", "KSN_Id"),
        m("th", "SKU_Prc_Type_Cd")
      ])]),
      m("tbody", [
        ctrl.listing.list.map(function(row,index) {
          
          if(index<showing ){
          return m("tr", [
            m("td", row.locnNo),
            m("td",  row.OoId),
            m("td",  row.KsnId),
            m("td",  row.Sku)
          ])
          }
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