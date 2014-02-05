;(function(window, document, Darkroom) {
  'use strict';

  ImageEditor.plugins['save'] = ImageEditor.Plugin.extend({
    initialize: function InitDarkroomSavePlugin() {
      var buttonGroup = this.imageEditor.toolbar.createButtonGroup();

      this.destroyButton = buttonGroup.createButton({
        image: 'save'
      });

      this.destroyButton.addEventListener('click', this.imageEditor.selfDestroy.bind(this.imageEditor));
    },
  });
})(window, document, ImageEditor);
