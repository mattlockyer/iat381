

"use-strict";

var APP = {};



Polymer("main-screen", {
  /*******************************
  * Properties
  *******************************/
  isMobile:false,
  currentPage:null,
  resizePage:null,
  /*******************************
  * Events
  *******************************/
  created:function() {
    //console.log('main screen created');
    this.isMobile = (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))return true;else return false})(navigator.userAgent||navigator.vendor||window.opera);
  },

  ready:function() {
  //console.log('main screen ready');
  var self = this;
  var scaffold = this.scaffold = this.$.scaffold;
  var toolbar = this.toolbar = this.$.toolbar;
  var menu = this.menu = this.$.menu;
  var pages = this.pages = this.$.pages;
  this.sectionTitle = this.$.sectionTitle;
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
    //rewrite links to target blank
    var links = wrap.querySelectorAll('a');
    for (var j = 0; j < links.length; j++)
      links[j].setAttribute('target', '_blank');
    //resize elements
    var elements = wrap.querySelectorAll('.resize');
    for (var j = 0; j < elements.length; j++)
      elements[j].setAttribute('height', window.innerHeight - 136 + 'px');

    //forward back pages
    var goBack = function() {
      if (pages.selected - 1 !== -1) self.changePage(sections[pages.selected - 1].name);
    }
    var goForward = function() {
      if (pages.selected + 1 !== sections.length) self.changePage(sections[pages.selected + 1].name);
    }

    //add forward back buttons
    var buttonWrap = document.createElement('div');
    buttonWrap.classList.add('button-wrap');
    if (i > 0) {
       //back button
       var button = this.$.menuPrev.cloneNode(true);
       button.classList.remove('hidden');
       button.onclick = goBack;
      buttonWrap.appendChild(button);
    }
    if (i < children.length - 1) {
       //forward button
       var button = this.$.menuNext.cloneNode(true);
       button.classList.remove('hidden');
       button.onclick = goForward;
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
    if (window.location.hash) self.changePage(window.location.hash.substring(1));
    else self.changePage(sections[sections[0].name === 'Home' ? 1 : 0].name, false, true);
  };
  setFirstPage();
  //attach window history event listener
  window.onpopstate = function(event) {
    self.changePage(window.location.hash.substring(1), true);
  };
  //keydown
  window.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37: goBack(); break;
      case 39: goForward(); break;
    }
  }
  //touch
  if (this.isMobile) {
    var mc = new Hammer(document.body);
    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    // listen to events...
    var swipeTime = 0;
    mc.on("panleft panright panup pandown", function(e) {
      switch (e.type) {
        case 'panleft': if (Date.now() - swipeTime > 250) { swipeTime = Date.now(); goForward(); } break;
        case 'panright': if (Date.now() - swipeTime > 250) { swipeTime = Date.now(); goBack(); } break;
      }
    });
  }

  //show
  this.classList.remove('hidden');

},

attached:function() {
    //console.log('main screen attached');
    var self = this;
    window.onresize = function() {
      self.resize(self.resizePage);
    }
  },

  /*******************************
  * Methods
  *******************************/
  resize:function(page) {
    var self = this;
    setTimeout(function() {
      //majorly hacky but works...
      var ph = page.children[0].getBoundingClientRect().height;
      var h = self.scaffold.scroller.getBoundingClientRect().height;
      page.style.height = h + 'px';
      page.style.overflow = ph > h ? 'scroll' : 'hidden';
      page.style.overflowX = 'hidden';
    }, 1);
  },

  changePage:function(name, back, replace) {
    if (name === this.currentPage) return;
    this.currentPage = name;
    name = decodeURIComponent(name);
    for (var i = 0; i < this.sections.length; i++) {
      this.menu.children[i+1].classList.remove('core-selected');
      if (this.sections[i].name === name) {
        this.pages.selected = i;
        this.menu.children[i+1].classList.add('core-selected');
        this.sectionTitle.innerHTML = name;
        //resize page hack for polymer container
        this.resize(this.resizePage = this.pages.children[i]);
      }
    }
    if (back) return;
    //update history
    if (!replace) history.pushState({}, 'iat381 - ' + name, window.location.href.split('#')[0] + '#' + encodeURIComponent(name));
    else history.replaceState({}, 'iat381 - ' + name, window.location.href.split('#')[0] + '#' + encodeURIComponent(name));
    //close drawer
    this.scaffold.closeDrawer();
  },

  onMenuClose:function() {
    this.scaffold.closeDrawer();
  },

  onMenuOpen:function() {
    this.scaffold.openDrawer();
  },

  onMenuClick:function(e, detail) {
    this.changePage(this.sections[parseInt(detail.item.attributes.num.value)].name);
  }

  //end of component
});