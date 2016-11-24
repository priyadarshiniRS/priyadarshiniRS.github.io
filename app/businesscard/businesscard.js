import businesscardCtrl from './businesscardCtrl';


function Config($stateProvider, $urlRouterProvider) {
    'ngInject';
    $stateProvider.state({
        name: 'businesscard',
        url: '/businesscard',
        templateUrl:'./businesscard/businesscard.html',
        controller:'businesscardCtrl',
        controllerAs:'bcc'
    })
    .state({
        name: 'editbusiness',
        url: '/editbusiness',
        templateUrl:'./businesscard/editbusiness.html',
        controller:'businesscardCtrl',
        controllerAs:'bcc'
    });
}

angular.module('myApp.businesscard', ['ui.router','ngStorage','slickCarousel'])
    .config(Config)

.controller('businesscardCtrl' , businesscardCtrl);
