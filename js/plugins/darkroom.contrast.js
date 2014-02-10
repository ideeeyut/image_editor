;(function(window, document, Darkroom) {
    'use strict';
    var CONTRAST_FILTER = 5;

    Darkroom.plugins['contrast'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomContrastPlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();

            this.hasFocus = false;

            this.button = buttonGroup.createButton({
                image: 'save',
                title: 'Contrast'
            });

            this.slider = buttonGroup.createInput({
                type: 'range',
                hide: true
            });
            this.slider.element.width = '150px';
            this.slider.element.value = 100;
            this.slider.element.max = 255;
            this.slider.element.min = 0;

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
            this.okButton.addEventListener('click', this.contrastImage.bind(this));
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

            console.log(this.slider.element.value);

            var obj = canvas.item(0);
            if (obj.filters[CONTRAST_FILTER]) {
                obj.filters[CONTRAST_FILTER].brightness = parseInt(this.slider.element.value, 10);
                obj.applyFilters(canvas.renderAll.bind(canvas));
            }
        },
        contrastImage: function() {
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
            if(obj.filters[CONTRAST_FILTER]) return;

            obj.filters[CONTRAST_FILTER] = new fabric.Image.filters.BrightnessContrast({
                contrast: 0
            });

            obj.applyFilters(canvas.renderAll.bind(canvas));
        },

        // Remove the brighten filter
        releaseFocus: function() {
            var canvas = this.darkroom.canvas;

            var obj = canvas.item(0);

            obj.filters[CONTRAST_FILTER] = null;

            obj.applyFilters(canvas.renderAll.bind(canvas));

            this.hasFocus = false;
            this.button.active(false);
            this.slider.hide(true);
            this.okButton.hide(true);
            this.cancelButton.hide(true);
        },
    });
})(window, document, Darkroom);
