det.Box = (function () {

    'use strict';

    /**
     * 给定两个 box ，每一个 box 包含 x,y,width,height
     * 计算两个 box 之间的距离
     */
    function getDistance(box1, box2){
        var c1 = {
                x : box1.x + box1.width / 2,
                y : box1.y + box1.height / 2
            },
            c2 = {
                x : box2.x + box2.width / 2,
                y : box2.y + box2.height / 2
            }
        return Math.sqrt(Math.pow(c1.x - c2.x, 2) +
            Math.pow(c1.y - c2.y, 2));
    }

    /**
     * 给定两个 box ，每一个 box 包含 x,y,width,height
     * 计算两个 box 之间的连线
     */
    function getConnection(box1, box2){
        if (box1.y + box1.height < box2.y) {
            return {
                x1 : box1.x + box1.width / 2,
                y1 : box1.y + box1.height,
                x2 : box2.x + box2.width / 2,
                y2 : box2.y - 5
            };
        } else if (box2.y + box2.height < box1.y) {
            return {
                x1 : box1.x + box1.width / 2,
                y1 : box1.y,
                x2 : box2.x + box2.width / 2,
                y2 : box2.y + box2.height + 5
            };
        }else {
            if (box1.x > box2.x + box2.width) {
                return {
                    x1 : box1.x,
                    y1 : box1.y + box1.height /2,
                    x2 : box2.x + box2.width + 5,
                    y2 : box2.y + box2.height / 2
                };
            } else if (box1.x + box1.width < box2.x) {
                return {
                    x1 : box1.x + box1.width,
                    y1 : box1.y + box1.height /2,
                    x2 : box2.x - 5,
                    y2 : box2.y + box2.height / 2
                };
            } else {
                return null;
            }
        }
    }

    return {
        distance : getDistance,
        connect : getConnection
    }


}());