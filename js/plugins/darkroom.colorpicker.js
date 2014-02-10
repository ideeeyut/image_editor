;(function(window, document, Darkroom) {
    'use strict';
    Darkroom.plugins['colorpicker'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomColorPickerPlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();

            this.hasFocus = false;

            this.colorPicker = buttonGroup.createInput({
                type: 'color',
                hide: true
            });

            this.colorPicker.addEventListener('change', this.changeValue.bind(this));

            this.darkroom.canvas.on('object:selected', this.objectSelected.bind(this));
            this.darkroom.canvas.on('selection:cleared', this.selectionCleared.bind(this));
        },
        objectSelected: function() {
            this.colorPicker.hide(false);
            this.colorPicker.element.value = this.darkroom.canvas.getActiveObject().fill;
        },
        selectionCleared: function() {
            this.colorPicker.hide(true);
        },
        changeValue: function() {
            var color = this.colorPicker.element.value;

            var activeObject = this.darkroom.canvas.getActiveObject(),
                activeGroup = this.darkroom.canvas.getActiveGroup();
            if (!activeObject && !activeGroup) return;

            if(activeGroup) {
                activeGroup.forEachObject(function(obj) {
                    this.changeObjectColor(obj, color);
                })
            }
            else {
                this.changeObjectColor(activeObject, color);
            }

            this.darkroom.canvas.renderAll();

            this.darkroom.dispatchEvent(new Event('image:change'));
        },
        changeObjectColor: function(obj, color) {
            if(obj.stroke != null)
            {
                obj.stroke = color;
            }
            else if(obj.fill != null)
            {
                obj.fill = color;
            }
        },
    });
})(window, document, Darkroom);
