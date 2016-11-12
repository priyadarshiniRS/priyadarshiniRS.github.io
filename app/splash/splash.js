import splashCtrl from './splashCtrl';


function Config($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider.state({
        name: 'splash',
        url: '/splash',
        templateUrl:'./splash/splash.html',
        controller:'splashCtrl',
        controllerAs:'lc'
    });
}
angular.module('myApp.splash', ['ui.router','ngStorage'])
    .config(Config)
    .controller('splashCtrl', splashCtrl);
