import eventDetailctrl from './eventDetailctrl';


function Config($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider.state({
        name: 'details',
        url: '/details/:id',
        templateUrl:'./eventDetail/eventDetail.html',
        controller:'eventDetailctrl',
        controllerAs:'edc'
    });



}

angular.module('myApp.eventDetail', ['ui.router','ngStorage','slickCarousel'])
    .config(Config)

.controller('eventDetailctrl' , eventDetailctrl);
