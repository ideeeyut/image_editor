/**
 * Created by dscott on 2/7/14.
 */
;(function(window, document, Darkroom) {
    'use strict';
    Darkroom.plugins['draw'] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomDrawPlugin() {
            var html = '<label>Line:</label><input id="lineColor" type="color" value="#005E7A" /><input id="lineWeight" type="range" value="30" min="0" max="150"><br/>' +
                '<button id="square">Square</button>' +
                '<button id="circle">Circle</button>' +
                '<button id="triangle">Triangle</button>' +
                '<button id="line">Line</button>';

            var panel = this.darkroom.toolbar.createPanel(html);

            debugger;
            this.squareButton = document.getElementById('#square');
            this.squareButton.addEventListener('click', function() { console.log('square')});


//            var subMenu = document.createElement('div');
//            subMenu.style = "width:200px; height:80px";
//            subMenu.className = 'darkroom-menu';// darkroom-menu-' + options.type;
//            subMenu.innerHTML = '<label>Line:</label><input type="color" value="#005E7A" /><input type="range" value="30" min="0" max="150">';

            //this.darkroom.toolbar.element.appendChild(subMenu);


//            var buttonGroup = this.darkroom.toolbar.createButtonGroup();
//            this.menu = buttonGroup.createMenu(
//            );
//            <!--Line <input type="color" value="#005E7A" bind-value-to="drawingLineColor"> Width dfsaf   {{ getDrawingLineWidth() }} <input type="range" value="30" min="0" max="150" bind-value-to="drawingLineWidth"><br/>-->
//            <!--<button ng-click="drawRect()">Square</button>-->
//                <!--<button ng-click="drawCircle()">Circle</button>-->
//                <!--<button ng-click="drawTriangle()">Triangle</button>-->
//                <!--<button ng-click="drawLine()">Line</button>-->

//            this.hasFocus = false;

//            this.slider.addEventListener('change', this.changeValue.bind(this));
//            this.slider.addEventListener('mouseup', this.mouseUp.bind(this));
//
//            this.darkroom.canvas.on('object:selected', this.objectSelected.bind(this));
//            this.darkroom.canvas.on('selection:cleared', this.selectionCleared.bind(this));
        },
//        objectSelected: function() {
//            this.slider.element.value = this.darkroom.getActiveStyle('opacity') * 100;
//            this.slider.hide(false);
//        },
//        selectionCleared: function() {
//            this.slider.hide(true);
//        },
//        mouseUp: function() {
//            console.log('mouse up');
//        },
//        changeValue: function() {
//            console.log(this.slider.element.value);
//
//            this.darkroom.setActiveStyle('opacity', parseInt(this.slider.element.value, 10) / 100);
//        }
    });
})(window, document, Darkroom);
