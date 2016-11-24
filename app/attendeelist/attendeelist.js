import attendeelistCtrl from './attendeelistCtrl';


function Config($stateProvider, $urlRouterProvider) {
    'ngInject';
    $stateProvider.state({
        name: 'attendeelist',
        url: '/attendeelist',
        templateUrl:'./attendeelist/attendeelist.html',
        controller:'attendeelistCtrl',
        controllerAs:'alc'
    });
}

angular.module('myApp.attendeelist', ['ui.router','ngStorage','slickCarousel'])
    .config(Config)

.controller('attendeelistCtrl' , attendeelistCtrl);
