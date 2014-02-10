;(function(window, document, Darkroom) {
    'use strict';
    Darkroom.plugins['remove'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomRemovePlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();

            this.darkroom.canvas.on('object:selected', this.objectSelected.bind(this));
            this.darkroom.canvas.on('selection:cleared', this.selectionCleared.bind(this));

            this.removeButton = buttonGroup.createButton({
                image: 'cancel',
                disabled: true,
                title: 'Remove'
            });
            this.removeButton.addEventListener('click', this.remove.bind(this));
        },
        objectSelected: function() {
            this.removeButton.disable(false);
        },
        selectionCleared: function() {
            this.removeButton.disable(true);
        },
        remove: function() {
            var canvas = this.darkroom.canvas;
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

            this.darkroom.dispatchEvent(new Event('image:change'));
        }
    });
})(window, document, Darkroom);
