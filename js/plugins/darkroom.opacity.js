;(function(window, document, Darkroom) {
    'use strict';
    Darkroom.plugins['opacity'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomOpacityPlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();

            this.hasFocus = false;

            this.slider = buttonGroup.createSlider({
                width: '150px',
                max: 100,
                min: 0,
                value: 50,
                hide: true
            });

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
          console.log('mouse up');
        },
        changeValue: function() {
            console.log(this.slider.element.value);

            this.darkroom.setActiveStyle('opacity', parseInt(this.slider.element.value, 10) / 100);
        }
    });
})(window, document, Darkroom);
