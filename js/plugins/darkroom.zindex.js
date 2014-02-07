/**
 * Created by dscott on 2/7/14.
 */
;(function(window, document, Darkroom) {
    'use strict';
    Darkroom.plugins['zindex'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomZIndexPlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();

            this.bringForwardButton = buttonGroup.createButton({
                image: 'cancel',
                disabled: true
            });
            this.sendBackwardButton = buttonGroup.createButton({
                image: 'cancel',
                disabled: true
            });

            this.bringForwardButton.addEventListener('click', this.bringForward.bind(this));
            this.sendBackwardButton.addEventListener('click', this.sendBackward.bind(this));

            this.darkroom.canvas.on('object:selected', this.objectSelected.bind(this));
            this.darkroom.canvas.on('selection:cleared', this.selectionCleared.bind(this));

        },
        objectSelected: function() {
            this.bringForwardButton.disable(false);
            this.sendBackwardButton.disable(false);
        },
        selectionCleared: function() {
            this.bringForwardButton.disable(true);
            this.sendBackwardButton.disable(true);
        },
        bringForward: function() {
            var activeObject = this.darkroom.canvas.getActiveObject();
            if (activeObject) {
                this.darkroom.canvas.bringForward(activeObject);
            }
        },
        sendBackward: function() {
            var activeObject = this.darkroom.canvas.getActiveObject();
            if (activeObject) {
                this.darkroom.canvas.sendBackwards(activeObject);
            }
        }
    });
})(window, document, Darkroom);