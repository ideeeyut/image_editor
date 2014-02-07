;(function(window, document, Darkroom) {
    'use strict';
//    var CONTRAST_FILTER = 5;

    Darkroom.plugins['contrast'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomContrastPlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();

            this.hasFocus = false;

            this.button = buttonGroup.createButton({
                image: 'save'
            });

            this.slider = buttonGroup.createSlider({
                width: '150px',
                max: 200,
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
            //TODO this needs some work;
            var value = parseInt(this.slider.element.value, 10) / 100;

            console.log(value);
            this.darkroom.setActiveStyle('scaleX', value);
            this.darkroom.setActiveStyle('scaleY', value);
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
            this.slider.value = this.darkroom.getActiveStyle('scaleX') * 100;

            this.hasFocus = true;
            this.slider.hide(false);
            this.okButton.hide(false);
            this.cancelButton.hide(false);
        },

        // Remove the brighten filter
        releaseFocus: function() {
            this.darkroom.setActiveStyle('scaleX', 1);
            this.darkroom.setActiveStyle('scaleY', 1);

            this.hasFocus = false;
            this.button.active(false);
            this.slider.hide(true);
            this.okButton.hide(true);
            this.cancelButton.hide(true);
        },
    });
})(window, document, Darkroom);
