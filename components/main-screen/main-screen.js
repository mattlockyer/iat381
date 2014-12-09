

"use-strict";

var APP = {};



Polymer("main-screen", {
  /*******************************
  * Events
  *******************************/
  created:function() {
    //console.log('main screen created');
  },
  ready:function() {

  //setTimeout(function() {


  //console.log('main screen ready');
  var self = this;
  var scaffold = this.scaffold = this.$.scaffold;
  var menu = this.menu = this.$.menu;
  var pages = this.pages = this.$.pages;
  //build sections array
  var children = this.children;
  var sections = this.sections = [];

  for (var i = 0; i < children.length; i++) {
    //build section object for template
    var section = {};
    var attributes = children[i].attributes;
    for (var j = 0; j < attributes.length; j++) {
      var attr = attributes[j];
      section[attr.name] = attr.value;
    }
    sections.push(section);
    //add a page for this section to core-pages template
    var page = document.createElement('section');
    var wrap = document.createElement('div');
    wrap.innerHTML = children[i].innerHTML;

    var buttonWrap = document.createElement('div');

    if (i > 0) {
       //back button
       var button = document.createElement('core-icon-button');
       button.setAttribute('icon', 'arrow-back');
       button.onclick = function() {
        self.changePage(sections[pages.selected - 1].name);
      };
      buttonWrap.appendChild(button);
    }
    if (i < children.length - 1) {
       //forward button
       var button = document.createElement('core-icon-button');
       button.setAttribute('icon', 'arrow-forward');
       button.onclick = function() {
        self.changePage(sections[pages.selected + 1].name);
      };
      button.style.float = 'right';
      buttonWrap.appendChild(button);
    }

    wrap.appendChild(buttonWrap);
    page.appendChild(wrap);
    this.pages.appendChild(page);
  }
  //switch to the right page
  var setFirstPage = function() {
    if (!menu.children[1]) {
      setTimeout(setFirstPage, 25);
      return;
    }
    console.log(window.location.hash);
    if (window.location.hash) {
      self.changePage(window.location.hash.substring(1));
    } else {
      self.changePage(sections[0].name, false, true);
    }
  };
  setFirstPage();
  //attach window history event listener
  window.onpopstate = function(event) {
    self.changePage(window.location.hash.substring(1), true);
  };
  //show
  this.classList.remove('hidden');


  //}, 2000);

},
attached:function() {
    //console.log('main screen attached');
  },
  /*******************************
  * Methods
  *******************************/
  currentPage:null,
  changePage:function(name, back, replace) {
    //console.log('currentPage: ' + this.currentPage);
    //console.log('name: ' + name);
    //console.log('');
    if (name === this.currentPage) {
      return;
    }
    this.currentPage = name;
    for (var i = 0; i < this.sections.length; i++) {
      this.menu.children[i+1].classList.remove('core-selected');
      if (this.sections[i].name === name) {
        this.pages.selected = i;
        this.menu.children[i+1].classList.add('core-selected');
      }
    }
    console.log('history pushed: ' + name);
    if (back) return;
    if (!replace) {
      history.pushState({}, 'iat381 - ' + name, window.location.href.split('#')[0] + '#' + name);
    } else {
      history.replaceState({}, 'iat381 - ' + name, window.location.href.split('#')[0] + '#' + name);
    }
  },
  onMenuClose:function() {
    this.scaffold.closeDrawer();
  },
  onMenuClick:function(e, detail) {
    this.changePage(this.sections[parseInt(detail.item.attributes.num.value)].name);
  }
});