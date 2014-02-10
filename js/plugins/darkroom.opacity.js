;(function(window, document, Darkroom) {
    'use strict';
    Darkroom.plugins['opacity'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomOpacityPlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();

            this.slider = buttonGroup.createInput({
                type: 'range',
                hide: true
            });
            this.slider.element.width = '150px';
            this.slider.element.value = 50;
            this.slider.element.max = 100;
            this.slider.element.min = 0;

            this.slider.addEventListener('change', this.changeValue.bind(this));
            this.slider.addEventListener('mouseup', this.mouseUp.bind(this));

            this.darkroom.canvas.on('object:selected', this.objectSelected.bind(this));
            this.darkroom.canvas.on('selection:cleared', this.selectionCleared.bind(this));
        },
        objectSelected: function() {
            this.slider.element.value = this.darkroom.getActiveStyle('opacity') * 100;
            this.slider.hide(false);
        },
        selectionCleared: function() {
            this.slider.hide(true);
        },
        mouseUp: function() {
          this.darkroom.dispatchEvent(new Event('image:change'));
        },
        changeValue: function() {
            this.darkroom.setActiveStyle('opacity', parseInt(this.slider.element.value, 10) / 100);
        },
    });
})(window, document, Darkroom);
