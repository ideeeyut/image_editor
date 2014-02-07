;(function(window, document, Darkroom) {
    'use strict';
    var BRIGHTNESS_FILTER = 5;

    Darkroom.plugins['brightness'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomBrightnessPlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();

            this.hasFocus = false;

            this.brightnessButton = buttonGroup.createButton({
                image: 'save'
            });

            this.brightnessSlider = buttonGroup.createSlider({
                width: '150px',
                max: 255,
                min: 0,
                value: 100,
                hide: true
            });

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
            this.brightnessButton.addEventListener('click', this.toggleBrightness.bind(this));
            this.brightnessSlider.addEventListener('change', this.changeBrightness.bind(this));
            this.okButton.addEventListener('click', this.brightenImage.bind(this));
            this.cancelButton.addEventListener('click', this.releaseFocus.bind(this));
        },
        toggleBrightness: function() {
            if (!this.hasFocus)
                this.requireFocus();
            else
                this.releaseFocus();
        },
        changeBrightness: function() {
            var canvas = this.darkroom.canvas;

            console.log(this.brightnessSlider.element.value);

            var obj = canvas.item(0);
            if (obj.filters[BRIGHTNESS_FILTER]) {
                obj.filters[BRIGHTNESS_FILTER].brightness = parseInt(this.brightnessSlider.element.value, 10);
                obj.applyFilters(canvas.renderAll.bind(canvas));
            }

        },
        brightenImage: function() {
            this.hasFocus = false;
            this.brightnessButton.active(false);
            this.brightnessSlider.hide(true);
            this.okButton.hide(true);
            this.cancelButton.hide(true);

            this.darkroom.dispatchEvent(new Event('image:change'));
        },

        // brighten the image
        requireFocus: function() {
            this.hasFocus = true;
            this.brightnessSlider.hide(false);
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

        // Remove the brighten filter
        releaseFocus: function() {
            var canvas = this.darkroom.canvas;

            var obj = canvas.item(0);

            obj.filters[BRIGHTNESS_FILTER] = null;

            obj.applyFilters(canvas.renderAll.bind(canvas));

            this.hasFocus = false;
            this.brightnessButton.active(false);
            this.brightnessSlider.hide(true);
            this.okButton.hide(true);
            this.cancelButton.hide(true);
        },
    });
})(window, document, Darkroom);
