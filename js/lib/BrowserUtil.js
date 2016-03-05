/* global define, window */
define(function (require, exports) {
    'use strict';

    /**
     * 判定事件是否为右键
     * @param {MouseEvent} event
     */
    function isRightClick(event) {
        if (!event) {
            event = window.event;
        }
        if (event.which) {
            return event.which === 3;
        } else if (event.button) {
            return event.button === 2;
        } else {
            return false;
        }
    }

    /**
     * 阻止事件传递
     * @param {MouseEvent} event
     */
    function stopPropagation(event) {
        if (event) {
            event.cancelBubble = true;
            if (event.stopPropagation) {
                event.stopPropagation();
            }
        }
    }

    function isMobile() {

        var system = {
            win: false,
            mac: false,
            xll: false,
            ipad: false
        };

        var p = navigator.platform;
        system.win = p.indexOf("Win") === 0;
        system.mac = p.indexOf("Mac") === 0;
        system.x11 = (p === "X11") || (p.indexOf("Linux") === 0);
        system.ipad = (navigator.userAgent.match(/iPad/i) !== null) ? true : false;

        return !(system.win || system.mac || system.xll || system.ipad);
    }

    // export
    exports.isRightClick = isRightClick;
    exports.stopPropagation = stopPropagation;
    exports.isMobile = isMobile;
});