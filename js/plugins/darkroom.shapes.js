/**
 * Created by dscott on 2/7/14.
 */
;(function(window, document, Darkroom) {
    'use strict';
    Darkroom.plugins['shapes'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomShapesPlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();
            this.hasFocus = false;

            this.drawShapesButton = buttonGroup.createButton({
                image: 'crop',
                title: 'Draw shape'
            });
            this.squareButton = buttonGroup.createButton({
                image: 'accept',
                type: 'success',
                title: 'Square',
                hide: true
            });
            this.circleButton = buttonGroup.createButton({
                image: 'accept',
                type: 'success',
                title: 'Circle',
                hide: true
            });
            this.triangleButton = buttonGroup.createButton({
                image: 'accept',
                type: 'success',
                title: 'Triangle',
                hide: true
            });
            this.lineButton = buttonGroup.createButton({
                image: 'accept',
                type: 'success',
                title: 'Line',
                hide: true
            });

            this.drawShapesButton.addEventListener('click', this.toggleShapes.bind(this));
            this.squareButton.addEventListener('click', this.drawSquare.bind(this));
            this.triangleButton.addEventListener('click', this.drawTriangle.bind(this));
            this.circleButton.addEventListener('click', this.drawCircle.bind(this));
            this.lineButton.addEventListener('click', this.drawLine.bind(this));
        },

        toggleShapes: function() {
            this.hasFocus = !this.hasFocus;

            this.drawShapesButton.active(this.hasFocus);
            this.squareButton.hide(!this.hasFocus);
            this.triangleButton.hide(!this.hasFocus);
            this.circleButton.hide(!this.hasFocus);
            this.lineButton.hide(!this.hasFocus);
        },
        drawSquare: function() {
            var coord = getRandomLeftTop();

            this.darkroom.canvas.add(new fabric.Rect({
                left: coord.left,
                top: coord.top,
                fill: getRandomColor(),
                width: 50,
                height: 50,
                opacity: 0.8
            }));

            this.darkroom.dispatchEvent(new Event('image:change'));
        },
        drawTriangle: function() {
            var coord = getRandomLeftTop();

            this.darkroom.canvas.add(new fabric.Triangle({
                left: coord.left,
                top: coord.top,
                fill: getRandomColor(),
                width: 50,
                height: 50,
                opacity: 0.8
            }));

            this.darkroom.dispatchEvent(new Event('image:change'));
        },
        drawCircle: function() {
            var coord = getRandomLeftTop();

            this.darkroom.canvas.add(new fabric.Circle({
                left: coord.left,
                top: coord.top,
                fill: getRandomColor(),
                radius: 50,
                opacity: 0.8
            }));

            this.darkroom.dispatchEvent(new Event('image:change'));
        },
        drawLine: function() {
            var coord = getRandomLeftTop();

            this.darkroom.canvas.add(new fabric.Line([ 50, 100, 200, 200], {
                left: coord.left,
                top: coord.top,
                stroke: getRandomColor()
            }));

            this.darkroom.dispatchEvent(new Event('image:change'));
        },
        objectSelected: function() {
            var activeObject = this.darkroom.canvas.getActiveObject();
            if(!activeObject) return;

            if(activeObject.stroke != null)
            {
                this.lineWidth.value = activeObject.lineWeight;
                this.colorPicker.value = activeObject.stroke;
            }
            else if(activeObject.fill != null)
            {
                this.colorPicker.value = activeObject.fill;
            }
        },
        selectionCleared: function() {
        },
        mouseUp: function() {
            console.log('mouse up');
        },
    });

    var getRandomInt = fabric.util.getRandomInt;
    function getRandomColor() {
        return (
            pad(getRandomInt(0, 255).toString(16), 2) +
                pad(getRandomInt(0, 255).toString(16), 2) +
                pad(getRandomInt(0, 255).toString(16), 2)
            );
    }

    function getRandomLeftTop() {
        var offset = 50;
        return {
            left: getRandomInt(0 + offset, 700 - offset),
            top: getRandomInt(0 + offset, 500 - offset)
        };
    }

    function pad(str, length) {
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }
})(window, document, Darkroom);


