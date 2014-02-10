/**
 * Created by dscott on 2/7/14.
 */
;(function(window, document, Darkroom) {
    'use strict';
    Darkroom.plugins['text'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomTextPlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();

            this.hasFocus = false;

            this.button = buttonGroup.createButton({
                image: 'cancel',
                title: 'Text'
            })

            var options = ['Arial', 'Helvetica', 'Verdana', 'Courier'];

            this.fontFamily = buttonGroup.createSelect({
                options: options,
                hide: true
            })

            this.fontFamily.element.width = '150px';

            this.textArea = buttonGroup.createTextArea({
                hide: true
            });

            this.addTextButton = buttonGroup.createButton({
                image: 'cancel',
                title: 'Add Text',
                hide: true
            });

            this.button.addEventListener('click', this.toggle.bind(this));
            this.addTextButton.addEventListener('click', this.addText.bind(this));
        },
        toggle: function() {
            this.hasFocus = !this.hasFocus;

            this.button.active(this.hasFocus);
            this.fontFamily.hide(!this.hasFocus);
            this.textArea.hide(!this.hasFocus);
            this.addTextButton.hide(!this.hasFocus);
        },
        addText: function() {
            var textSample = new fabric.Text(this.textArea.element.value, {
                left: getRandomInt(350, 400),
                top: getRandomInt(350, 400),
                fontFamily: this.fontFamily.element.value,
            });

            this.darkroom.canvas.add(textSample);

            this.darkroom.dispatchEvent(new Event('image:change'));
        },
        changeLineWidth: function() {
            var lineWidth = this.lineWidth.element.value;
            this.darkroom.canvas.freeDrawingBrush.width = parseInt(lineWidth, 10) || 1;
        },
    });

    var getRandomInt = fabric.util.getRandomInt;

})(window, document, Darkroom);
