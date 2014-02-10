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
                disabled: true,
                title: 'Bring Forward'
            });
            this.sendBackwardButton = buttonGroup.createButton({
                image: 'cancel',
                disabled: true,
                title: 'Send Backward'
            });

            this.bringForwardButton.addEventListener('click', this.bringForward.bind(this));
            this.sendBackwardButton.addEventListener('click', this.sendBackward.bind(this));

            this.darkroom.canvas.on('object:selected', this.objectSelected.bind(this));
            this.darkroom.canvas.on('selection:cleared', this.selectionCleared.bind(this));

        },
        objectSelected: function() {
            this.bringForwardButton.disable(this.darkroom.canvas.items.length > 1);
            this.sendBackwardButton.disable(this.darkroom.canvas.items.length > 1);
        },
        selectionCleared: function() {
            this.bringForwardButton.disable(true);
            this.sendBackwardButton.disable(true);
        },
        bringForward: function() {
            //TODO don't allow send behind background image
            var activeObject = this.darkroom.canvas.getActiveObject();
            if (activeObject) {
                this.darkroom.canvas.bringForward(activeObject);
            }
        },
        sendBackward: function() {
            //TODO don't allow send behind background image
            var activeObject = this.darkroom.canvas.getActiveObject();
            if (activeObject) {
                this.darkroom.canvas.sendBackwards(activeObject);
            }
        }
    });
})(window, document, Darkroom);