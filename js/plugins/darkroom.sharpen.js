;(function(window, document, Darkroom) {
    'use strict';
    var SHARPEN_FILTER = 6;

    Darkroom.plugins['sharpen'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomSharpenPlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();

            this.hasFocus = false;

            this.sharpenButton = buttonGroup.createButton({
                image: 'save',
                title: 'Sharpen'
            });

            // Buttons click
            this.sharpenButton.addEventListener('click', this.toggleSharpen.bind(this));
        },
        toggleSharpen: function() {
            var canvas = this.darkroom.canvas;
            var obj = canvas.item(0);

            var hasFilter = obj.filters[SHARPEN_FILTER] != null;

            this.sharpenButton.active(!hasFilter);

            if(hasFilter)
            {
                obj.filters[SHARPEN_FILTER] = null;
            }
            else
            {
                obj.filters[SHARPEN_FILTER] = new fabric.Image.filters.Convolute({
                    matrix: [  0, -1,  0,
                        -1,  5, -1,
                        0, -1,  0 ]
                });
            }

            obj.applyFilters(canvas.renderAll.bind(canvas));
//            if (!this.hasFocus)
//                this.requireFocus();
//            else
//                this.releaseFocus();
        },
        sharpenImage: function() {
            this.hasFocus = false;
            this.sharpenButton.active(false);

            this.darkroom.dispatchEvent(new Event('image:change'));
        },

        // Sharpen the image
        requireFocus: function() {
            this.hasFocus = true;
            this.sharpenButton.active(true);
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
