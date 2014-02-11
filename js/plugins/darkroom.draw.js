/**
 * Created by dscott on 2/7/14.
 */
;(function(window, document, Darkroom) {
    'use strict';
    Darkroom.plugins['draw'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomDrawPlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();

            this.darkroom.canvas.isDrawingMode = false;

            this.drawButton = buttonGroup.createButton({
                image: 'cancel',
                title: 'Draw'
            });

            this.lineWidth = buttonGroup.createInput({
                type: 'range',
                hide: true
            });
            this.lineWidth.element.value = 30;
            this.lineWidth.element.max = '150';
            this.lineWidth.element.min = '0';

            this.drawButton.addEventListener('click', this.toggleDraw.bind(this));
            this.lineWidth.addEventListener('change', this.changeLineWidth.bind(this));
            this.darkroom.canvas.on('mouse:up', this.mouseUp.bind(this));

        },
        toggleDraw: function() {
            var lineWidth = this.lineWidth.element.value;
            this.darkroom.canvas.freeDrawingBrush.width = parseInt(lineWidth, 10) || 1;

            this.darkroom.canvas.isDrawingMode = !this.darkroom.canvas.isDrawingMode;

            this.drawButton.active(this.darkroom.canvas.isDrawingMode);
            this.lineWidth.hide(!this.darkroom.canvas.isDrawingMode);
        },
        changeLineWidth: function() {
            var lineWidth = this.lineWidth.element.value;
            this.darkroom.canvas.freeDrawingBrush.width = parseInt(lineWidth, 10) || 1;
        },
        mouseUp: function() {
            if(this.darkroom.canvas.isDrawingMode){
                this.darkroom.dispatchEvent(new Event('image:change'));
            }
        },
    });
})(window, document, Darkroom);
