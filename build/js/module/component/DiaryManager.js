define(["require","exports","module"],function(e,t){"use strict";function i(e){return-1!=e.indexOf("zh")?r:n}function s(e){var t=null;return-1!=language.indexOf("zh")?t=o(e):t=u(e),t}function o(e){return a(r)}function u(e){return a(n)}function a(e){var t=[];return e.forEach(function(e){-1!==diray.keyword.indexOf(keyword)&&t.push(e)},this),t}var n=[{index:1,title:"export 3dmax model to UE4",keyword:"3dmax model ue4",date:"2015.05.10"},{index:3,title:"module programming in UE4",keyword:"module ue4",date:"2015.05.22"},{index:5,title:"using jasmine in requirejs",keyword:"unit test requirejs jasmine javascript",date:"2016.06.09"}],r=[{index:0,title:"關於遊戲建模導入虛幻4",keyword:"3dmax model ue4",date:"2015.05.10"},{index:2,title:"虛幻4在開發中的模塊化編程",keyword:"模块化 ue4",date:"2015.05.22"},{index:4,title:"在requirejs中使用jasmine",keyword:"单元测试 requirejs jasmine javascript",date:"2016.06.09"}];t.getList=i,t.searchDiary=s});