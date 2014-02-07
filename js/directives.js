'use strict';

/* Directives */
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

angular.module('esm')
    .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

esm.directive('bindValueTo', function () {
    return {
        restrict: 'A',

        link: function ($scope, $element, $attrs) {

            var prop = capitalize($attrs.bindValueTo),
                getter = 'get' + prop,
                setter = 'set' + prop;

            $element.on('change keyup select', function () {
                $scope[setter] && $scope[setter](this.value);
            });

            $scope.$watch($scope[getter], function (newVal) {
                if ($element[0].type === 'radio') {
                    var radioGroup = document.getElementsByName($element[0].name);
                    for (var i = 0, len = radioGroup.length; i < len; i++) {
                        radioGroup[i].checked = radioGroup[i].value === newVal;
                    }
                }
                else {
                    $element.val(newVal);
                }
            });
        }
    };
});

esm.directive('objectButtonsEnabled', function () {
    return {
        restrict: 'A',

        link: function ($scope, $element, $attrs) {
            $scope.$watch($attrs.objectButtonsEnabled, function (newVal) {

                $($element).find('.btn-object-action')
                    .prop('disabled', !newVal);
            });
        }
    };
});
