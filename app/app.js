import footerCtrl from './directives/footerCtrl';
import detailfact from './services/detailfact';
import dir1 from './directives/dir1';
import dir2 from './directives/dir2';
import dir3 from './directives/dir3';
import topdir from './directives/topdir';
import menuCtrl from './home/menuCtrl.js';
import './splash/splash.js';
import './home/home.js';
import './eventlist/eventlist.js';
import './eventDetail/eventDetail.js';
import './speakerDetail/speakerDetail.js';
import './myschedule/mc.js';
import './attendeelist/attendeelist.js';
import './businesscard/businesscard.js';
angular.module('myApp',
['ui.router',
'ngStorage',
'myApp.splash',
'myApp.home',
'myApp.eventlist',
'myApp.eventDetail',
'myApp.speakerDetail',
'ui.bootstrap',
'myApp.mc',
'myApp.attendeelist',
'myApp.businesscard',
'slickCarousel',
'angularMoment'
])

  .config(function($urlRouterProvider){
      $urlRouterProvider.otherwise('splash')
     console.log("This is route config")
	})

  .service('detailfact',detailfact)
  .controller('footerCtrl',footerCtrl)
  .controller('menuCtrl',menuCtrl)
  .directive('d1', () => new dir1)
  .directive('d2', () => new dir2)
  .directive('d3', () => new dir3)
  .directive('d4', () => new topdir)
