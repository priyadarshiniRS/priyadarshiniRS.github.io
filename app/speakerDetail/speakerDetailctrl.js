export default class speakerDetailctrl{
  /*@ngInject;*/
  constructor($scope , $location,$http, detailfact,$stateParams, $localStorage){
    this.loc=$location;
    this.rp=$stateParams;
    this.scope=$scope;
    this.http=$http;
    this.ls=$localStorage;
    this.scope.rate=0;
    this.scope.rateflag=false;
    this.scope.count=0;
    this.scope.starflag=false;
    this.scope.single_event=[];
    this.services=detailfact;
    this.services.getSpeakerDetail(this.ls.eventId).success((res)=>{
      this.scope.speaker=res;
      console.log(res,this.ls.eventId,"speakerrrrrrrrrrrrr");
  })
}

}
