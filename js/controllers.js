'use strict';

/* Controllers */

angular.module('esm')
    .controller('ImageEditor', ['$scope', function($scope) {
    var BRIGHTNESS_FILTER = 5;
    var SHARPEN_FILTER = 6;
    var CONTRAST_FILTER = 7;

    $scope.canvas = canvas;
    $scope.isObjectSelected = false;

    var scaleX, scaleY;

    fabric.Image.fromURL('img/koala.jpg', function(image) {

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

        image.on('event:modified', function() {
            console.log('event modified')
        });

        canvas.add(image);

    });

    canvas
        .on("object:selected", function(event) {
            $scope.$apply(function() {
                $scope.isObjectSelected = true;
            });
        })
        .on('selection:cleared', function(event) {
            $scope.$apply(function() {
                $scope.isObjectSelected = false;
            });
        });

    $scope.canvas.on('object:modified', function() {
       console.log('object modified')
    });
    $scope.canvas.on('object:added', function() {
       console.log('object added')
    });
    $scope.canvas.on('object:removed', function() {
       console.log('object removed')
    });

    console.log($scope.canvas.toDataURL());

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

    $scope.text = function() {
        $scope.showText = !$scope.showText;
    };

    $scope.addText = function(text) {
        console.log(text);
        var textSample = new fabric.Text(text, {
            left: getRandomInt(350, 400),
            top: getRandomInt(350, 400),
            fontFamily: 'helvetica',
            angle: 0,
            fill: '#' + getRandomColor(),
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: '',
            originX: 'left',
            hasRotatingPoint: true,
            centerTransform: true
        });

        canvas.add(textSample);
    };

    $scope.draw = function() {
        $scope.showDraw = !$scope.showDraw;

        $scope.canvas.isDrawingMode = $scope.showDraw;
    };

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

    $scope.brightness = function() {
        $scope.showBrightness = true;

        var obj = canvas.item(0);
        if(obj.filters[BRIGHTNESS_FILTER]) return;

        obj.filters[BRIGHTNESS_FILTER] = new fabric.Image.filters.Brightness();

        obj.applyFilters(canvas.renderAll.bind(canvas));
    };

    $scope.acceptBrightness = function() {
        $scope.showBrightness = false;
    };

    $scope.cancelBrightness = function() {
        $scope.showBrightness = false;

        var obj = canvas.item(0);
        obj.filters[BRIGHTNESS_FILTER] = null;
        obj.applyFilters(canvas.renderAll.bind(canvas));
    };

    $scope.contrast = function() {
        $scope.showContrast = true;

        var obj = canvas.item(0);
        if(obj.filters[CONTRAST_FILTER]) return;

        obj.filters[CONTRAST_FILTER] = new fabric.Image.filters.BrightnessContrast({
            contrast: 0
        });

        obj.applyFilters(canvas.renderAll.bind(canvas));
    };

    $scope.acceptContrast = function() {
        $scope.showContrast = false;
    };

    $scope.cancelContrast = function() {
        $scope.showContrast = false;

        var obj = canvas.item(0);
        obj.filters[CONTRAST_FILTER] = null;
        obj.applyFilters(canvas.renderAll.bind(canvas));
    };

    $scope.sharpen = function() {
        $scope.showSharpen = true;

        var obj = canvas.item(0);
        if(obj.filters[SHARPEN_FILTER]) return;

        obj.filters[SHARPEN_FILTER] = new fabric.Image.filters.Convolute({
            matrix: [  0, -1,  0,
                -1,  5, -1,
                0, -1,  0 ]
        });

        obj.applyFilters(canvas.renderAll.bind(canvas));
    };

    $scope.acceptSharpen = function() {
        $scope.showSharpen = false;
    };

    $scope.cancelSharpen = function() {
        $scope.showSharpen = false;

        var obj = canvas.item(0);
        obj.filters[SHARPEN_FILTER] = null;
        obj.applyFilters(canvas.renderAll.bind(canvas));
    };

    $scope.zoom = function() {
      $scope.zoomConfirmation = true;
    };

    $scope.rotate = function(angle) {
        var obj = canvas.getActiveGroup();

        if(!obj) {
            obj = canvas.getActiveObject();
        }

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

        obj.rotate(angle);

        console.log(obj);
        if(obj._element) {
            canvas.setWidth(width);
            canvas.setHeight(height);

            canvas.centerObject(obj);
            obj.setCoords();
        }
        canvas.renderAll();
    };

    $scope.removeSelected = function() {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();

        if (activeGroup) {
            activeGroup.forEachObject(function(object) {
                canvas.remove(object);
            })
            //TODO figure out what the error getting thrown here is about
            canvas.discardActiveGroup().renderAll();
        }
        else if (activeObject) {
            canvas.remove(activeObject);
        }
    };

    $scope.drawRect = function() {
        var coord = getRandomLeftTop();

        canvas.add(new fabric.Rect({
            left: coord.left,
            top: coord.top,
            fill: '#' + getRandomColor(),
            width: 50,
            height: 50,
            opacity: 0.8
        }));
    };

    $scope.drawCircle = function() {
        var coord = getRandomLeftTop();

        canvas.add(new fabric.Circle({
            left: coord.left,
            top: coord.top,
            fill: '#' + getRandomColor(),
            radius: 50,
            opacity: 0.8
        }));
    };

    $scope.drawTriangle = function() {
        var coord = getRandomLeftTop();

        canvas.add(new fabric.Triangle({
            left: coord.left,
            top: coord.top,
            fill: '#' + getRandomColor(),
            width: 50,
            height: 50,
            opacity: 0.8
        }));
    };

    $scope.drawLine = function() {
        var coord = getRandomLeftTop();

        canvas.add(new fabric.Line([ 50, 100, 200, 200], {
            left: coord.left,
            top: coord.top,
            stroke: '#' + getRandomColor()
        }));
    };

    //accessors
    $scope.getOpacity = function() {
        return getActiveStyle('opacity') * 100;
    };
    $scope.setOpacity = function(value) {
        setActiveStyle('opacity', parseInt(value, 10) / 100);
    };

    $scope.getBrightness = function() {
        getFilterValue(BRIGHTNESS_FILTER, 'brightness') * 10;
    };
    $scope.setBrightness = function(value) {
        setFilterValue(BRIGHTNESS_FILTER, 'brightness', parseInt(value, 10));
    };

    $scope.getContrast = function() {
        getFilterValue(CONTRAST_FILTER, 'contrast');
    };
    $scope.setContrast = function(value) {
        setFilterValue(CONTRAST_FILTER, 'contrast', parseInt(value, 10) / 10);
    };

    $scope.getZoom = function() {
        return getActiveStyle('scaleX') * 100;
    };
    $scope.setZoom = function(value) {
        setActiveStyle('scaleX', parseInt(value, 10) / 100);
        setActiveStyle('scaleY', parseInt(value, 10) / 100);
    };

    $scope.getDrawingLineWidth = function() {
        if (canvas.freeDrawingBrush) {
            return canvas.freeDrawingBrush.width;
        }
    };
    $scope.setDrawingLineWidth = function(value) {
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.width = parseInt(value, 10) || 1;
        }
    };

    $scope.getDrawingLineColor = function() {
        if (canvas.freeDrawingBrush) {
            return canvas.freeDrawingBrush.color;
        }
    };

    $scope.setDrawingLineColor = function(value) {
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = value;
        }
    };

    function getActiveStyle(styleName, object) {
        object = object || canvas.getActiveObject();
        if (!object) return '';

        return (object.getSelectionStyles && object.isEditing)
            ? (object.getSelectionStyles()[styleName] || '')
            : (object[styleName] || '');
    };

    function setFilterValue(index, prop, value) {
        var obj = canvas.item(0);
        if (obj.filters[index]) {
            obj.filters[index][prop] = value;

            console.log(index + ' ' + prop + obj.filters[index][prop]);

            obj.applyFilters(canvas.renderAll.bind(canvas));
        }
    }

    function getFilterValue(index, prop) {
        var obj = canvas.item(0);
        if(!obj) return '';

        if (obj.filters[index]) {
            console.log(obj.filters[index]);

            console.log(index + ' ' + prop + obj.filters[index][prop]);
            return obj.filters[index][prop];
        }
        return '';
    }

    function setActiveStyle(styleName, value, object) {
        var activeObject = object || canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();
        if (!activeObject && !activeGroup) return;

        if(activeGroup) {
            activeGroup.forEachObject(function(obj) {
                if (obj.setSelectionStyles && obj.isEditing) {
                    var style = { };
                    style[styleName] = value;
                    obj.setSelectionStyles(style);
                    obj.setCoords();
                }
                else {
                    obj[styleName] = value;
                }
            })
        }
        else {
            if (activeObject.setSelectionStyles && activeObject.isEditing) {
                var style = { };
                style[styleName] = value;
                activeObject.setSelectionStyles(style);
                activeObject.setCoords();
            }
            else {
                activeObject[styleName] = value;
            }

            activeObject.setCoords();
        }

        canvas.renderAll();
    };

    function pad(str, length) {
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }

    var getRandomInt = fabric.util.getRandomInt;
    function getRandomColor() {
        return (
            pad(getRandomInt(0, 255).toString(16), 2) +
                pad(getRandomInt(0, 255).toString(16), 2) +
                pad(getRandomInt(0, 255).toString(16), 2)
            );
    }

    function getRandomNum(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getRandomLeftTop() {
        var offset = 50;
        return {
            left: getRandomInt(0 + offset, 700 - offset),
            top: getRandomInt(0 + offset, 500 - offset)
        };
    }}]);
