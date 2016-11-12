import speakerDetailctrl from './speakerDetailctrl';


function Config($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider.state({
        name: 'speakerdetails',
        url: '/speakerdetails/:id',
        templateUrl:'./speakerDetail/speakerDetail.html',
        controller:'speakerDetailctrl',
        controllerAs:'edc'
    });
}

angular.module('myApp.speakerDetail', ['ui.router','ngStorage','slickCarousel'])
    .config(Config)

.controller('speakerDetailctrl' , speakerDetailctrl);
