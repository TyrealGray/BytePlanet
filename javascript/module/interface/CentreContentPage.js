define(["require","underscore","backbone","module/component/StatusCodeManager","module/interface/kit/AlertBox"],function(e){"use strict";function s(){this._isDisable=!0,this._initEvent()}var t=e("underscore"),n=e("backbone"),r=e("module/component/StatusCodeManager"),i=e("module/interface/kit/AlertBox");return t.extend(s.prototype,n.Events),s.prototype.disable=function(e){this._isDisable=e},s.prototype.isDisable=function(){return this._isDisable},s.prototype.update=function(){},s.prototype.active=function(){},s.prototype.notifyErrorMessage=function(e){var t=new i(r.getErrorMessage(e));$("body").append(t.getDiv())},s.prototype._initEvent=function(){this.on("active",function(){this.active(),this.disable(!1)}),this.on("deactive",function(){this.disable(!0)}),this.on("update",function(){this.update()})},s});