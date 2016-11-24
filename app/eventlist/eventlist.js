import eventlistctrl from './eventlistctrl';

function Config($stateProvider, $urlRouterProvider) {
    'ngInject';
    $stateProvider.state({
        name: 'eventlist',
        url: '/eventlist',
        templateUrl:'./eventlist/eventlist.html',
        controller:'eventlistctrl',
        controllerAs:'elc'
    });
}
angular.module('myApp.eventlist', ['ui.router','ngStorage','slickCarousel'])
    .config(Config)

.controller('eventlistctrl' , eventlistctrl)
