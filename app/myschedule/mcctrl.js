export default class mcctrl{
  /*@ngInject;*/
  constructor($scope , $location,$http, detailfact,$stateParams, $localStorage){
    this.location=$location;
    this.sp=$stateParams;
    this.scope=$scope;
    this.http=$http;
    this.ls=$localStorage;
    this.detailfact=detailfact;
    this.scope.count=0;
    this.ls.seflag=0;
    this.detailfact.checkload();
    this.scope.single_event=[];
    console.log(this.sp);
        // if(this.services.checkuser()){
        //   this.scope.detail="detail";
        // }
      //   else{
      //     $(".IN-widget a")[0].click();
      // }
}
}
