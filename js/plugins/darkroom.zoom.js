;(function(window, document, Darkroom) {
    'use strict';
//    var CONTRAST_FILTER = 5;

    Darkroom.plugins['zoom'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomZoomPlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();

            this.hasFocus = false;

            this.button = buttonGroup.createButton({
                image: 'save',
                title: 'Zoom'
            });

            this.slider = buttonGroup.createInput({
                type: 'range',
                hide: true
            });
            this.slider.element.width = '150px';
            this.slider.element.value = 100;
            this.slider.element.max = 200;
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
            //TODO this needs some work; unlock the image so they can move the image around
            var value = parseInt(this.slider.element.value, 10) / 100;

            this.darkroom.setActiveStyle('scaleX', value);
            this.darkroom.setActiveStyle('scaleY', value);
        },
        brightenImage: function() {
            this.darkroom.canvas.lockMovementX = false;
            this.darkroom.canvas.lockMovementY = false;
            this.hasFocus = false;
            this.button.active(false);
            this.slider.hide(true);
            this.okButton.hide(true);
            this.cancelButton.hide(true);

            this.darkroom.dispatchEvent(new Event('image:change'));
        },

        requireFocus: function() {
            this.slider.value = this.darkroom.getActiveStyle('scaleX') * 100;

            //TODO ytf this won't work
            this.darkroom.image.selectable = true;
            this.darkroom.image.lockMovementX = false;
            this.darkroom.image.lockMovementY = false;
            this.darkroom.image.lockRotation = false;
            this.darkroom.image.lockScalingX = false;
            this.darkroom.image.lockScalingY = false;
            this.darkroom.image.lockUniScaling = false;
            this.darkroom.image.hasControls = true;
            this.darkroom.image.hasBorders = true;
            this.darkroom.canvas.renderAll();

            this.hasFocus = true;
            this.button.active(true);
            this.slider.hide(false);
            this.okButton.hide(false);
            this.cancelButton.hide(false);
        },

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
