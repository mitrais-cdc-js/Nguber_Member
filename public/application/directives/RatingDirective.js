'use strict';

NguberMember.directive('nguberRating', function () {
  return {
    scope: {
      value: '=ngModel'
    },    
    templateUrl: 'application/views/Directives/Rating.html',
    link: function (scope, element) {
      var input = element.find('input');
      
      $(input).rating({        
      });
      
      $(input).on('change', function () {
        scope.$apply(function () {
          scope.value = $(input).val();        
        });
      });      
    }
  };
});