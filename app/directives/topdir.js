import homeCtrl from '../home/homeCtrl'
export default class topdir{
  //this is the directive function for Header
  constructor(){
    this.restrict="EA";
    this.transclude=true;
    this.templateUrl="home/home.html";
    this.controller='homeCtrl';
    this.controllerAs='hc';
  }
}
