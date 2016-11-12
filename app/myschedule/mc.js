import mcctrl from './mcctrl';


function Config($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider.state({
        name: 'mc',
        url: '/mc',
        templateUrl:'./myschedule/mc.html',
        controller:'mcctrl',
        controllerAs:'mc'
    });
}

angular.module('myApp.mc', ['ui.router','ngStorage','slickCarousel'])
    .config(Config)

.controller('mcctrl' , mcctrl);
