jQuery.Draggable=function(e,n){var a=jQuery,r=!1;(e=this.ele=a(e))[0]._draggable&&e[0]._draggable.destroy(),e[0]._draggable=this;var o,u,t=this.options=a.extend({handle:"",cursor:"move",axis:"",onDrag:function(){return!0},beforeDrag:function(){},afterDrag:function(){}},n||{});function s(e){return r=!1,a(document).bind("mousemove",d).bind("mouseup",i),o=e.pageX,u=e.pageY,!1}function d(n){if(r||t.beforeDrag(n),!n.undraggable){r=!0;var a=parseInt(e.css("left")),s=parseInt(e.css("top")),d=n.pageX-o,i=n.pageY-u;return"y"==t.axis?d=0:"x"==t.axis&&(i=0),e.css({left:a+d,top:s+i}),t.onDrag(a,s,d,i),o=n.pageX,u=n.pageY,!1}}function i(e){return a(document).unbind("mousemove",d).unbind("mouseup",i),!r||(t.afterDrag(e),!1)}t.handle=t.handle?a(t.handle,e):e,t.handle.css({cursor:t.cursor}),this.destroy=function(){t.handle.unbind("mousedown",s)},t.handle.bind("mousedown",s)};