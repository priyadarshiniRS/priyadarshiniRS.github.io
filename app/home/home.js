import homeCtrl from './homeCtrl';

   function Config($stateProvider, $urlRouterProvider) {
       'ngInject';
       $stateProvider.state({
           name: 'about',
           url: '/about',
           templateUrl:'./home/about.html',
           controller:'homeCtrl',
           controllerAs:'hc'
       });
     }

       angular.module('myApp.home', ['ui.router','ngStorage'])
           .config(Config)

   .controller('homeCtrl', homeCtrl);
