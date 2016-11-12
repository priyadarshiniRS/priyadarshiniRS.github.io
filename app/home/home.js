import homeCtrl from './homeCtrl';
angular.module('myApp.home', ['ui.router','ngStorage'])
  // .config(function($routeProvider){
  //   $routeProvider.when('/home',{
	// 		 templateUrl:'./home/home.html',
  //      controller:'homeCtrl',
  //      controllerAs:'hc'
	// 	 })
  //  })

   .controller('homeCtrl', homeCtrl);
