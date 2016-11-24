export default class businesscardCtrl{
  /*@ngInject;*/
  constructor($scope , $location,$http, detailfact,$stateParams, $localStorage,$window){
    this.location=$location;
    this.rp=$stateParams;
    this.window=$window;
    this.scope=$scope;
    this.http=$http;
    this.scope.attendeelist={};
    this.ls=$localStorage;
    this.detailfact=detailfact;
    this.scope.yespic=false;
    console.log(this.ls.phone);
    if(!this.ls.phone){
      console.log("irotp");
    // this.ls.person[0].pnumber=0;
  }
    this.scope.person=this.ls.person[0];
    console.log(this.ls.person[0]);
  }
  updateprofile(){
  console.log("this.scope.person");
  if(this.scope.yespic){
    this.scope.person.pictureUrl=JSON.parse(this.window.localStorage.pic);
  }
  this.ls.person[0]=this.scope.person;
  this.location.path("businesscard");
  console.log("phonenumber" , this.scope.person.pnumber);
  if(this.scope.person.pnumber){
    this.ls.phone=true;
  }
  }
  goback(){
    this.location.path("eventlist");
  }
  shareLinkedin(){
    if(this.scope.show){
      this.scope.fab="Web/ic_floating_button.png";
    }
    else{
      this.scope.fab="Web/ic_floating_button_closed.png";
    }
    this.scope.show=!this.scope.show;
  var payload = {
    "comment": this.location.absUrl().split('?')[0],
    "visibility": {
      "code": "anyone"
    }
  };

  IN.API.Raw("/people/~/shares?format=json")
    .method("POST")
    .body(JSON.stringify(payload))
    .result((data)=>{
      console.log(data);
      window.open(data.updateUrl, '_blank');
    })
  }
}
