

"use-strict";

Polymer("main-screen", {
  ready: function() {
    this.pages = this.$.pages;
    var sections = this.querySelector('#content').children;
    //build sections array
    this.sections = [];
    for (var i = 0; i < sections.length; i++) {
      //build section object for template
      var section = {};
      var attributes = sections[i].attributes;
      for (var j = 0; j < attributes.length; j++) {
        var attr = attributes[j];
        section[attr.name] = attr.value;
      }
      this.sections.push(section);
      //add a page for this section to core-pages template
      var page = document.createElement('div');
      page.innerHTML = sections[i].innerHTML;
      this.pages.appendChild(page);
    }
  },
  onMenuClick:function(e, detail) {
    if (detail.isSelected) {
      var selectedItem = detail.item;
      this.pages.selected = selectedItem.attributes.num.value;
    }
  }
});