define(["require","exports","module"],function(e,t){"use strict";function n(e,t,n){var r="/html/diary/"+e+".html";$.ajax({type:"GET",async:!0,url:r,contentType:"application/x-www-form-urlencoded;charset=utf-8",success:function(e){t(e)},error:function(e){n(e)}})}t.queryDiary=n});