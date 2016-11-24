export default class attendeelistCtrl{
  /*@ngInject;*/
  constructor($scope , $location,$http, detailfact,$stateParams, $localStorage){
    this.loc=$location;
    this.rp=$stateParams;
    this.scope=$scope;
    this.http=$http;
    this.scope.attendeelist={};
    this.ls=$localStorage;
    this.scope.search="";
    this.scope.showbox=false;
    this.detailfact=detailfact;
    this.detailfact.getattendeelist().success((res)=>{
      this.scope.attendeelist=res;
      console.log(this.scope.attendeelist);
    })
  }
  search(){
    this.scope.showbox=!this.scope.showbox;
  }
}
