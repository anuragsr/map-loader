var app = angular.module('nearchit', ['ngAnimate']);
var tl = new TimelineMax();
/*app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/main');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('main', {
            url: '/main',
            views: {

                // the main template will be placed here (relatively named)
                '': {   templateUrl: 'views.html' },

                // for column two, we'll define a separate controller 
                'loading-page@main': { 
                    templateUrl: 'loader.html',
                    controller: function(){
                        angular.element(document).ready(function () {
                            $(".loading-text").blast({ delimiter: "letter" });                    
                            tl.insert(TweenMax.to(".needle-container", 2, {rotationZ:"180deg", ease: Back.easeInOut, repeat:-1, repeatDelay:1, yoyo:true}));
                            tl.insert(TweenMax.staggerTo(".blast", 0.2, {
                                opacity:0, 
                                repeat:-1, 
                                repeatDelay:1, 
                                yoyo:true
                            }, 0.2));
                        });
                    }
                },

                'main-page@main': { 
                    template: 'loader.html',
                    controller: 'scotchController'
                }
            }
        })
       
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url:'/about',
            template: 'hello'
            // we'll get to this in a bit       
        });
        
}]);*/

app.directive('pageOne', function() {
    return {
        restrict : 'E',
        templateUrl: 'loader.html',
        controller:function(){
            $(".loading-text").blast({ delimiter: "letter" });                    
            tl.insert(TweenMax.to(".needle-container", 2, {rotationZ:"180deg", ease: Back.easeInOut, repeat:-1, repeatDelay:1, yoyo:true}));
            tl.insert(TweenMax.staggerTo(".blast", 0.2, {
                opacity:0, 
                repeat:-1, 
                repeatDelay:1, 
                yoyo:true
            }, 0.2));
        }
    };
}); 

app.directive('pageTwo', function() {
    return {
        restrict : 'E',
        templateUrl: 'main.html',
        controller:function(){
            var leftOne = $(".page").width();
            TweenMax.set(".page-two",{ css:{left:leftOne} });
        }
    };
}); 

app.directive('pageThree', function() {
    return {
        restrict : 'E',
        templateUrl: 'results.html',        
        controller:function(){            
            var leftTwo = $(".page").width() * 2;
            TweenMax.set(".page-three",{ css:{left:leftTwo} });                        
        }
    };
}); 

app.controller('mainController',['$scope', function($scope){
    $scope.currentPage = 1;
    $scope.pageId = 1;
    
    /*$scope.pages = { "pages" : [
        {
            "id" : "1",
            "class" : "page-one"
        },{
            "id" : "2",
            "class" : "page-two"
        },{
            "id" : "3",
            "class" : "page-three"
        }]
    };    */
    /*
    $scope.pageId = $scope.pages.pages;*/
    // Redirect to our default view
    /*$state.go('main');       */                  

    /*$scope.showLoader = true;
    $scope.showMain = false;
    $scope.showMap = false;*/

    /*
    var changePage = function(){
        $scope.showLoader = false;
        $scope.showMain = true;        
    }*/

    // and fire it after definition
    
   /* setTimeout(function(){
        var width = $(".page").width() * -1;        
        tl.pause();
        TweenMax.to(".loading-text", 1, {delay:1, opacity:0});
        TweenMax.to(".compass-container", 1, {delay:1, position:"relative", right:"-350px"});
        TweenMax.to(".compass-container", 0.1, {delay:2, display:"none"});
        TweenMax.to(".loading-page", 1, {delay:2.2, left:width, onComplete:changePage});
    }, 6000);*/

}]);

app.animation('.page', function() {
    var animateUp = function(element, className, done) {
        if(className != 'active') {
          return;
        }
        element.css({
          position: 'absolute',
          top: 500,
          left: 0,
          display: 'block'
        });

        jQuery(element).animate({
          top: 0
        }, done);

        return function(cancel) {
          if(cancel) {
            element.stop();
          }
        };
    }

    var animateDown = function(element, className, done) {
        if(className != 'active') {
          return;
        }
        element.css({
          position: 'absolute',
          left: 0,
          top: 0
        });

        jQuery(element).animate({
          top: -500
        }, done);

        return function(cancel) {
          if(cancel) {
            element.stop();
          }
        };
    }

    return {
        addClass: animateUp,
        removeClass: animateDown
    };
});