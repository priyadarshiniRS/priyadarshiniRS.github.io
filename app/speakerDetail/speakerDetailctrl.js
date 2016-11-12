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
    this.services.getEventDetail(this.ls.eventId).success((res)=>{
      this.scope.speaker=res.speaker;
      console.log(res.speaker);
  })
}

}
