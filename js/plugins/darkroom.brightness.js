;(function(window, document, Darkroom) {
    'use strict';
    var BRIGHTNESS_FILTER = 5;

    Darkroom.plugins['brightness'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomBrightnessPlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();

            this.hasFocus = false;

            this.button = buttonGroup.createButton({
                image: 'save',
                title: 'Brightness'
            });

            this.slider = buttonGroup.createInput({
                type: 'range',
                hide: true
            });
            this.slider.element.width = '150px';
            this.slider.element.value = 30;
            this.slider.element.max = '150';
            this.slider.element.min = '0';

            this.okButton = buttonGroup.createButton({
                image: 'accept',
                type: 'success',
                hide: true
            });
            this.cancelButton = buttonGroup.createButton({
                image: 'cancel',
                type: 'danger',
                hide: true
            });

            // Buttons click
            this.button.addEventListener('click', this.toggleButton.bind(this));
            this.slider.addEventListener('change', this.changeValue.bind(this));
            this.okButton.addEventListener('click', this.brightenImage.bind(this));
            this.cancelButton.addEventListener('click', this.releaseFocus.bind(this));
        },
        toggleButton: function() {
            if (!this.hasFocus)
                this.requireFocus();
            else
                this.releaseFocus();
        },
        changeValue: function() {
            var canvas = this.darkroom.canvas;

            var obj = canvas.item(0);
            if (obj.filters[BRIGHTNESS_FILTER]) {
                obj.filters[BRIGHTNESS_FILTER].brightness = parseInt(this.slider.element.value, 10);
                obj.applyFilters(canvas.renderAll.bind(canvas));
            }

        },
        brightenImage: function() {
            this.hasFocus = false;
            this.button.active(false);
            this.slider.hide(true);
            this.okButton.hide(true);
            this.cancelButton.hide(true);

            this.darkroom.dispatchEvent(new Event('image:change'));
        },

        // brighten the image
        requireFocus: function() {
            this.hasFocus = true;
            this.button.active(true);
            this.slider.hide(false);
            this.okButton.hide(false);
            this.cancelButton.hide(false);

            var canvas = this.darkroom.canvas;

            var obj = canvas.item(0);
            if(obj.filters[BRIGHTNESS_FILTER]) return;

            obj.filters[BRIGHTNESS_FILTER] = new fabric.Image.filters.Brightness(
                {
                    brightness: 100
                }
            );

            obj.applyFilters(canvas.renderAll.bind(canvas));
        },

        releaseFocus: function() {
            var canvas = this.darkroom.canvas;

            var obj = canvas.item(0);

            obj.filters[BRIGHTNESS_FILTER] = null;

            obj.applyFilters(canvas.renderAll.bind(canvas));

            this.hasFocus = false;
            this.button.active(false);
            this.slider.hide(true);
            this.okButton.hide(true);
            this.cancelButton.hide(true);
        },
    });
})(window, document, Darkroom);
