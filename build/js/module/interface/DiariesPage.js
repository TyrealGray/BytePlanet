define(["require","mustache","lib/InheritHelper","module/agent/DiaryAgent","module/GlobalVar","module/component/DiaryManager","module/interface/CentreContentPage","text!../../../html/DiariesPage.html","text!../../../html/diariesTable/tableBody.html"],function(e){"use strict";function f(){this.superClass(),this._bindEvent()}var t=e("mustache"),n=e("lib/InheritHelper"),r=e("module/agent/DiaryAgent"),i=e("module/GlobalVar"),s=e("module/component/DiaryManager"),o=e("module/interface/CentreContentPage"),u=e("text!../../../html/DiariesPage.html"),a=e("text!../../../html/diariesTable/tableBody.html");return n.inheritPrototype(f,o),f.prototype.INDEX=2,f.prototype._bindEvent=function(){var e=this;$(".diaryTitle").click(function(t){var n=$(this).data("index");r.queryDiary(n,function(e){$("#mainModalContent").html(e),$("#mainModal").foundation("open")},function(t){e.notifyErrorMessage(t)})})},f.prototype.getContent=function(){var e=i.language.DiariesPage,n=s.getList(locale);return t.render(u,{TitleText:e.Title,DateText:e.Date,tableBody:t.render(a,{tableItems:n})})},f});