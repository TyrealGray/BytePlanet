define(["require","exports","module"],function(e,t){"use strict";function n(e,t,n){var r="/device/"+e;$.ajax({type:"GET",async:!0,timeout:2e4,url:r,contentType:"application/x-www-form-urlencoded;charset=utf-8",success:function(e){t(e)},error:function(e){console.error("查询打印机数据失败"),n(e)}})}function r(e,t,n){var r="/send/"+e;$.ajax({type:"GET",async:!1,url:r,contentType:"application/x-www-form-urlencoded;charset=utf-8",success:function(e){t(e)},error:function(e){console.error("查询打印机数据失败"),n(e)}})}function i(e,t,n){$.ajax({type:"GET",async:!0,url:e,contentType:"application/x-www-form-urlencoded;charset=utf-8",success:function(e){t(e)},error:function(e){console.error("操作打印机失败"),n(e)}})}function s(e,t){$.ajax({type:"GET",async:!0,url:"/cmd_msg",contentType:"application/x-www-form-urlencoded;charset=utf-8",success:function(t){e(t)},error:function(e){console.error("获取GCode返回值失败"),t(e)}})}t.queryGCodeLog=s,t.queryPrint=n,t.sendCmd=r,t.operatePrint=i});