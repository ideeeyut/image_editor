;(function(window, document, Darkroom) {
    'use strict';
    var SHARPEN_FILTER = 6;

    Darkroom.plugins['sharpen'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomSharpenPlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();

            this.hasFocus = false;

            this.sharpenButton = buttonGroup.createButton({
                image: 'save'
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
            this.sharpenButton.addEventListener('click', this.toggleSharpen.bind(this));
            this.okButton.addEventListener('click', this.sharpenImage.bind(this));
            this.cancelButton.addEventListener('click', this.releaseFocus.bind(this));
        },
        toggleSharpen: function() {
            if (!this.hasFocus)
                this.requireFocus();
            else
                this.releaseFocus();
        },
        sharpenImage: function() {
            this.hasFocus = false;
            this.sharpenButton.active(false);
            this.okButton.hide(true);
            this.cancelButton.hide(true);

            this.darkroom.dispatchEvent(new Event('image:change'));
        },

        // Sharpen the image
        requireFocus: function() {
            this.hasFocus = true;
            this.okButton.hide(false);
            this.cancelButton.hide(false);

            var canvas = this.darkroom.canvas;

            var obj = canvas.item(0);
            if(obj.filters[SHARPEN_FILTER]) return;

            obj.filters[SHARPEN_FILTER] = new fabric.Image.filters.Convolute({
                matrix: [  0, -1,  0,
                    -1,  5, -1,
                    0, -1,  0 ]
            });

            obj.applyFilters(canvas.renderAll.bind(canvas));
        },

        // Remove the sharpen filter
        releaseFocus: function() {
            var canvas = this.darkroom.canvas;

            var obj = canvas.item(0);

            obj.filters[SHARPEN_FILTER] = null;

            obj.applyFilters(canvas.renderAll.bind(canvas));

            this.hasFocus = false;
            this.sharpenButton.active(false);
            this.okButton.hide(true);
            this.cancelButton.hide(true);
        },
    });
})(window, document, Darkroom);
