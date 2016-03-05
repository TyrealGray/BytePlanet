define(function (require, exports) {
    'use strict';

    function formatDateToTime(date) {

        var hour = formatTimeNumber(date.getHours()),
            minute = formatTimeNumber(date.getMinutes()),
            second = formatTimeNumber(date.getSeconds());

        return hour + ':' + minute + ':' + second;
    }

    function formatTimeNumber(time) {
        return (2 <= time.toString().length) ? time : ('0' + time);
    }

    // param "yyyy/MM/dd HH:mm"
    function getTimeZoneDate(date) {

        var minuteOffset = new Date().getTimezoneOffset();

        var dateInfo = date.split(" ");

        var ymdDate = dateInfo[0].split("/"),
            hmDate = dateInfo[1].split(":");

        var time = new Date();

        time.setFullYear(parseInt(ymdDate[0]));
        time.setMonth(parseInt(ymdDate[1]) - 1);
        time.setDate(parseInt(ymdDate[2]));

        time.setHours(parseInt(hmDate[0]));
        time.setMinutes(parseInt(hmDate[1]));

        var TimeZoneDate = new Date();
        TimeZoneDate.setTime(time.getTime() - (minuteOffset * 60000));

        return TimeZoneDate.toLocaleString();
    }

    exports.formatDateToTime = formatDateToTime;
    exports.getTimeZoneDate = getTimeZoneDate;
});