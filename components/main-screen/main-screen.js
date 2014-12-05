

"use-strict";

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
 var scaffold = this.scaffold = this.$.scaffold;
 var menu = this.menu = this.$.menu;
 var pages = this.pages = this.$.pages;

    //build sections array
    var sections = this.children;
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
      var page = document.createElement('section');
      var wrap = document.createElement('div');
      wrap.innerHTML = sections[i].innerHTML;

      var buttonWrap = document.createElement('div');

      if (i > 0) {
         //back button
         var button = document.createElement('core-icon-button');
         button.setAttribute('icon', 'arrow-back');
         button.onclick = function() {
          pages.selected = pages.selected - 1;
          menu.children[pages.selected + 2].classList.remove('core-selected');
          menu.children[pages.selected + 1].classList.add('core-selected');
        };
        buttonWrap.appendChild(button);
      }
      if (i < sections.length - 1) {
         //forward button
         var button = document.createElement('core-icon-button');
         button.setAttribute('icon', 'arrow-forward');
         button.onclick = function() {
          pages.selected = pages.selected + 1;
          menu.children[pages.selected].classList.remove('core-selected');
          menu.children[pages.selected + 1].classList.add('core-selected');
        };
        button.style.float = 'right';
        buttonWrap.appendChild(button);
      }

      wrap.appendChild(buttonWrap);
      page.appendChild(wrap);
      this.pages.appendChild(page);
    }
    //activate first menu item
    var menu = this.menu;
    setTimeout(function() {
      menu.children[1].classList.add('core-selected');
    }, 250);
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
  onMenuClose:function() {
    this.scaffold.closeDrawer();
  },
  onMenuClick:function(e, detail) {
    for (var i = 1; i < this.sections.length + 1; i++)
      this.menu.children[i].classList.remove('core-selected');
    this.pages.selected = parseInt(detail.item.attributes.num.value);
    detail.item.classList.add('core-selected');
    //untested don't know how to rig properly
    //history.pushState({foo: "bar"}, "page 2", window.location.href.split('#')[0] + '#' + this.sections[this.pages.selected].name);
  }
});