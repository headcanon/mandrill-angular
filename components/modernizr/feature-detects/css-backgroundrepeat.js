// developer.mozilla.org/en/CSS/background-repeat

// test page: jsbin.com/uzesun/
// http://jsfiddle.net/ryanseddon/yMLTQ/6/    

((() => {


function getBgRepeatValue(elem){
    return (window.getComputedStyle ?
             getComputedStyle(elem, null).getPropertyValue('background') :
             elem.currentStyle['background']);
}
  

Modernizr.testStyles(' #modernizr { background-repeat: round; } ', (elem, rule) => { 

  Modernizr.addTest('bgrepeatround', getBgRepeatValue(elem) == 'round');

});



Modernizr.testStyles(' #modernizr { background-repeat: space; } ', (elem, rule) => { 

  Modernizr.addTest('bgrepeatspace', getBgRepeatValue(elem) == 'space');

});


}))();
