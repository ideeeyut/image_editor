;(function(window, document, Darkroom) {
    'use strict';
    Darkroom.plugins['test'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomTestPlugin() {
            this.darkroom.canvas.add(new fabric.Circle({
                left: 100,
                top: 100,
                fill: '#ff0000',
                radius: 50,
                opacity: 0.5
            }));
            this.darkroom.canvas.add(new fabric.Circle({
                left: 250,
                top: 100,
                fill: '#2200ff',
                radius: 50,
                opacity: 0.5
            }));

            this.darkroom.dispatchEvent(new Event('image:change'));

            this.darkroom.canvas.renderAll();
        },
    });
})(window, document, Darkroom);
