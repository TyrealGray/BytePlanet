define(["require","exports","module","module/interface/MainContent","module/interface/LeftCanvas"],function(e,t){"use strict";function i(e){$(".centreContent").each(function(){$(this).hide()});switch(e){case"":case"#/home":$("#homePage").show();break;case"#/meInfo":$("#meInfoPage").show();break;case"#/cloudModel":$("#cloudModelPage").show();break;case"#/setting":$("#settingPage").show();break;default:}}var n=e("module/interface/MainContent"),r=e("module/interface/LeftCanvas");t.routeHash=i});