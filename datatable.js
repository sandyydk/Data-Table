var table, listing, app;

var showing = 10;
var totalRows = 10;
var startingAt = 1;

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
      m('input',{type:'number', min:1, class:"w-7-l mh3" , oninput :m.withAttr("value",listing.onShowingChange),value:showing}),
      'rows out of ',
      m('input',{type:'number', min:1, class:"w-7-l mh3", max:1000000,onchange:m.withAttr("value",listing.manageData),value:totalRows}),
      'starting at row ',
      m('input',{type:'number', min:1, class:"w-7-l mh3", oninput:m.withAttr("value",listing.onStartingAtChange),value:startingAt}),
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
    if((parseInt(startingAt)) < listing.originalList.length){
      startingAt = parseInt(startingAt) + 1;
      table.rowCount = startingAt - 1;
      listing.listFilter();
    }
    else
    {
      m.redraw.strategy("none");
    }
    
  },
  generateRandom: function(){
    // Here 2345 is just a random cap used to generate random values.
    return Math.floor(Math.random()* 2345);
  },
  manageData: function(inputValue){
    table.rowCount = 0;
    totalRows = inputValue;
    if (listing.originalList.length > totalRows ){
      listing.originalList.splice(totalRows-1,(listing.originalList.length - totalRows));   
    } 
    else 
    {
      // Generate upto a million random values
     var newArray = Array(totalRows-listing.originalList.length).fill(0).map(listing.generateRandom);
     // This lets you generate 1 million rows with browser crashing as DOM updation and looping don't conflict. 
     // Tested this one out. 
     setTimeout(() => {
      newArray.forEach(
        x => {
          listing.originalList.push({locnNo: x,
            OoId: 0,
            KsnId: 0,
            Sku:0});
        }
      );

      listing.list = listing.originalList.slice(11,18);
    },10); 
    
    }
    

  },
  moveAheadOnePage: function(){
    if((parseInt(startingAt) + parseInt(showing)) < listing.originalList.length){
      startingAt = parseInt(startingAt) + parseInt(showing);
      table.rowCount = startingAt - 1;
      listing.listFilter();
    }
    else
    {
      m.redraw.strategy("none");
    }
    
  },
  moveBehindOnePage: function(){
    if((startingAt - showing) >= 1){
      startingAt = parseInt(startingAt) - parseInt(showing);
      table.rowCount = startingAt - 1;
      listing.listFilter();
  } 
  else
  {
    // To stop the redraw which causes index to jump
     m.redraw.strategy("none");
  }
  },
  moveBehindOneRow: function(){
    if((startingAt - showing) > 1){
      startingAt = parseInt(startingAt) - 1;
      table.rowCount = startingAt - 1;
      listing.listFilter();
    }
    else
    {
      m.redraw.strategy("none");
    }
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
    listing.list = listing.originalList.slice(startingAt-1,startingAt-1+showing);
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