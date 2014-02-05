'use strict';

/* Controllers */

esm.controller('ImageEditor', ['$scope', function($scope) {
    $scope.canvas = canvas;

    var scaleX, scaleY;

    $scope.canvas.getElement().addEventListener('image:change', function() {
        console.log('image:change');
    });

    fabric.Image.fromURL('http://carinbondar.com/wp-content/uploads/2011/01/koala2.jpeg', function(image) {

        scaleY = canvas.height / image.height;
        scaleX = canvas.width / image.width;

        image.set({
            left: 0,
            top: 0,
            scaleY: scaleY,
            scaleX: scaleX
        });

        image.lockMovementX = true;
        image.lockMovementY = true;

        canvas.add(image);

    });


    console.log($scope.canvas.toDataURL());

    var pos = [0, 0];


    var el = new fabric.Rect({
        //left: 100,
        //top: 100,
        fill: 'transparent',
        originX: 'left',
        originY: 'top',
        stroke: '#ccc',
        strokeDashArray: [2, 2],
        opacity: 1,
        width: 1,
        height: 1
    });

    var crop = false;
    var disabled = false;
    var mousex = 0, mousey = 0;

    $scope.crop = function() {
        $scope.cropConfirmation = true;


        el.visible = false;
        canvas.add(el);

        canvas.on("mouse:down", function (event) {
            if (disabled) return;
            console.log(event);
            el.left = event.e.layerX;
            el.top = event.e.layerY;
            el.width = 5;
            el.height = 5;
            //el.selectable = false;
            el.visible = true;
            console.log(el);
            mousex = event.e.layerX;
            mousey = event.e.layerY;
            crop = true;
            canvas.bringToFront(el);
        });

        canvas.on("mouse:move", function (event) {
            if (crop && !disabled) {
                if (event.e.pageX - mousex > 0) {
                    el.width = event.e.pageX - mousex;
                }

                if (event.e.pageY - mousey > 0) {
                    el.height = event.e.pageY - mousey;
                }
            }
        });

        canvas.on("mouse:up", function (event) {
            crop = false;
        });

    };

    $scope.confirmCrop = function() {
        var object = canvas.item(0);

        canvas.clipTo = function(ctx) {
            ctx.rect(el.left, el.top, el.width, el.height);
        };

        disabled = true;
        el.visible = false;
        canvas.renderAll();
        $scope.cropConfirmation = false;
    };

    $scope.cancelCrop = function() {
        disabled = true;
        el.visible = false;
        $scope.cropConfirmation = false;
    };

    $scope.zoom = function() {
      $scope.zoomConfirmation = true;
    };

    $scope.rotate = function(angle) {
        var obj = canvas.getActiveObject();
        if(!obj) {
            obj = canvas.item(0);
        }

        angle = (obj.getAngle() + angle) % 360;

        var width, height;
        if (Math.abs(angle) % 180) {
            height = obj.getWidth();
            width = obj.getHeight();
        } else {
            width = obj.getWidth();
            height = obj.getHeight();
        }

        canvas.setWidth(width);
        canvas.setHeight(height);

        obj.rotate(angle);

        canvas.centerObject(obj);
        obj.setCoords();

        canvas.renderAll();
    };
}]);
