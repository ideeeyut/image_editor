;(function(window, document, Darkroom, fabric) {
  'use strict';

  Darkroom.plugins['history'] = Darkroom.Plugin.extend({
    initialize: function InitDarkroomHistoryPlugin() {
      this._initButtons();

      this.backHistoryStack = [];
      this.forwardHistoryStack = [];

      this._snapshotImage();

      this.darkroom.addEventListener('image:change', this._onImageChange.bind(this));
    },

    goBack: function() {
      if (this.backHistoryStack.length === 0) {
        this._updateButtons();
        return;
      }

      this._snapshotImage();
      this.forwardHistoryStack.push({
          json: this.currentJson,
          image: this.currentImage
      });

      var back = this.backHistoryStack.pop();
      this._applyImage(back);
      this._updateButtons();

//      console.log('back');
//        for(var i=0; i < this.backHistoryStack.length; i++)
//        {
//            console.log('back  ' + this.backHistoryStack[i].image.src);
//        }
//        for(var i=0; i < this.forwardHistoryStack.length; i++)
//        {
//            console.log('forw  ' + this.forwardHistoryStack[i].image.src);
//        }
    },

    goForward: function() {
      if (this.forwardHistoryStack.length === 0) {
        this._updateButtons();
        return;
      }

      this._snapshotImage();
      this.backHistoryStack.push({
          json: this.currentJson,
          image: this.currentImage
      });

      var forward = this.forwardHistoryStack.pop();
      //this.currentImage = forward.image;
      this._applyImage(forward);
      this._updateButtons();

//      console.log('forward');
//      for(var i=0; i < this.backHistoryStack.length; i++)
//      {
//        console.log('back  ' + this.backHistoryStack[i].image.src);
//      }
//      for(var i=0; i < this.forwardHistoryStack.length; i++)
//      {
//        console.log('forw  ' + this.forwardHistoryStack[i].image.src);
//      }
    },

    _initButtons: function() {
      var buttonGroup = this.darkroom.toolbar.createButtonGroup();

      this.backButton = buttonGroup.createButton({
        image: 'back',
        disabled: true,
        title: 'Undo'
      });

      this.forwardButton = buttonGroup.createButton({
        image: 'forward',
        disabled: true,
        title: 'Redo'
      });

      this.backButton.addEventListener('click', this.goBack.bind(this));
      this.forwardButton.addEventListener('click', this.goForward.bind(this));

      return this;
    },

    _updateButtons: function() {
      this.backButton.disable((this.backHistoryStack.length === 0))
      this.forwardButton.disable((this.forwardHistoryStack.length === 0))
    },

    _snapshotImage: function() {
      var image = new Image();
      image.src = this.darkroom.snapshotImage();

      this.currentJson = this.darkroom.snapShotJson();
      this.currentImage = image;
    },

    _onImageChange: function() {
      console.log('push back image change');
      this.backHistoryStack.push({
          json: this.currentJson,
          image: this.currentImage
      });

      this._snapshotImage();

      this.forwardHistoryStack.length = 0;
      this._updateButtons();
    },

    // Apply image to the canvas
    _applyImage: function(snapshot) {
      console.log('apply image');
      var canvas = this.darkroom.canvas;

      var imgInstance = new fabric.Image(snapshot.image, {
        // options to make the image static
        selectable: false,
        evented: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        hasControls: false,
        hasBorders: false
      });

      // Update canvas size
      canvas.setWidth(snapshot.image.width);
      canvas.setHeight(snapshot.image.height);

      // Add image
      this.darkroom.image.remove();
      this.darkroom.image = imgInstance;
      canvas.add(imgInstance);
      canvas.loadFromJSON(snapshot.json);
      console.log('appl ' + snapshot.image.src);
    }
  });
})(window, document, Darkroom, fabric);
